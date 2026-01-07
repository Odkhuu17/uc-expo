import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-nitro-sound';
import { Alert, Platform } from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import { useAttachOrderAudioMutation } from '@/gql/mutations/attachOrderAudio.generated';
import { audioToFile } from '@/utils/fileHelpers';

interface Props {
  setAudio: Dispatch<SetStateAction<string | null>>;
  number: string;
}

const useSoundRecord = ({ setAudio, number }: Props) => {
  const [attachOrderAudio, { loading }] = useAttachOrderAudioMutation();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');

  // Avoid double-taps/races where state updates haven't landed yet.
  const isStartingRef = useRef(false);
  const isRecordingRef = useRef(false);
  const hasRecordListenerRef = useRef(false);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    return () => {
      try {
        if (hasRecordListenerRef.current) {
          Sound.removeRecordBackListener();
          hasRecordListenerRef.current = false;
        }
        if (isRecordingRef.current) {
          Sound.stopRecorder();
          isRecordingRef.current = false;
        }
      } catch {
        // ignore
      }
    };
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const ensureMicPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.MICROPHONE,
      android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    });

    if (!permission) {
      return true;
    }

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        return true;
      }
      if (requestResult === RESULTS.BLOCKED) {
        showSettingsAlert();
      }
      return false;
    }

    if (result === RESULTS.BLOCKED) {
      showSettingsAlert();
      return false;
    }

    // RESULTS.UNAVAILABLE / RESULTS.LIMITED
    return false;
  };

  const onStartRecord = async () => {
    try {
      const granted = await ensureMicPermission();
      if (!granted) return;
      await startRecording();
    } catch (error) {
      console.error('Permission check failed:', error);
    }
  };

  const showSettingsAlert = () => {
    Alert.alert(
      'Микрофоны зөвшөөрөл хэрэгтэй',
      'Дуу бичих боломжгүй байна. Та тохиргоо руу орж микрофоны зөвшөөрөл олгоно уу.',
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Тохиргоо руу очих',
          onPress: () => openSettings(),
        },
      ],
    );
  };

  const startRecording = async () => {
    if (isStartingRef.current || isRecordingRef.current) {
      return;
    }

    isStartingRef.current = true;
    setIsLoading(true);
    try {
      // Clean up any existing recording session first
      try {
        if (hasRecordListenerRef.current) {
          Sound.removeRecordBackListener();
          hasRecordListenerRef.current = false;
        }
        await Sound.stopRecorder();
      } catch {
        // ignore
      }

      // iOS sometimes needs a moment to release the underlying AVAudioRecorder.
      await sleep(200);

      const maxAttempts = 3;
      let lastError: unknown;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          await Sound.startRecorder();
          Sound.addRecordBackListener(e => {
            setRecordTime(Sound.mmssss(Math.floor(e.currentPosition)));
          });
          hasRecordListenerRef.current = true;
          isRecordingRef.current = true;
          setIsRecording(true);
          return;
        } catch (err: any) {
          lastError = err;

          // Retry only for the intermittent native setup failure.
          const message = String(err?.message ?? err);
          const shouldRetry =
            message.includes('Failed to prepare recorder') ||
            message.includes('prepare recorder') ||
            message.includes('Recording setup failed');

          if (!shouldRetry || attempt === maxAttempts) {
            throw err;
          }

          // Ensure we fully tear down before retry.
          try {
            if (hasRecordListenerRef.current) {
              Sound.removeRecordBackListener();
              hasRecordListenerRef.current = false;
            }
            await Sound.stopRecorder();
          } catch {
            // ignore
          }

          await sleep(300 * attempt);
        }
      }

      throw lastError;
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert(
        'Алдаа',
        'Дуу бичих эхлүүлэхэд алдаа гарлаа. Дахин оролдоно уу.',
      );
    } finally {
      isStartingRef.current = false;
      setIsLoading(false);
    }
  };

  const onStopRecord = async () => {
    if (!isRecordingRef.current) {
      return;
    }

    setIsLoading(true);
    try {
      // Mark stopped immediately to avoid rapid toggle races.
      isRecordingRef.current = false;
      setIsRecording(false);

      const result = await Sound.stopRecorder();
      if (hasRecordListenerRef.current) {
        Sound.removeRecordBackListener();
        hasRecordListenerRef.current = false;
      }
      const { data } = await attachOrderAudio({
        variables: {
          number,
          audio: audioToFile(result),
        },
      });
      setAudio(data?.attachOrderAudio?.audio || null);
      setRecordTime('00:00:00');
    } catch (error) {
      console.error('Failed to stop recording:', error);
      isRecordingRef.current = false;
      setIsRecording(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggleRecord = () => {
    if (isRecording) {
      onStopRecord();
    } else {
      onStartRecord();
    }
  };

  return {
    isRecording,
    isLoading: isLoading || loading,
    recordTime,
    onStopRecord,
    onToggleRecord,
  };
};

export default useSoundRecord;
