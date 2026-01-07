import { Dispatch, SetStateAction, useState } from 'react';
import Sound from 'react-native-nitro-sound';
import { Alert } from 'react-native';
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
  const isRecordingRef = useState(false)[0]; // Ref to track recording state synchronously

  const onStartRecord = async () => {
    try {
      // Check current permission status
      const result = await check(PERMISSIONS.IOS.MICROPHONE);

      if (result === RESULTS.GRANTED) {
        // Permission already granted, start recording
        await startRecording();
      } else if (result === RESULTS.DENIED) {
        // Permission not yet requested or denied, ask for it
        const requestResult = await request(PERMISSIONS.IOS.MICROPHONE);

        if (requestResult === RESULTS.GRANTED) {
          await startRecording();
        } else if (requestResult === RESULTS.BLOCKED) {
          showSettingsAlert();
        }
      } else if (result === RESULTS.BLOCKED) {
        // Permission permanently denied, guide user to settings
        showSettingsAlert();
      }
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
    // Prevent multiple simultaneous recording attempts
    if (isLoading || isRecording) {
      console.log('Recording already in progress or starting');
      return;
    }

    setIsLoading(true);
    try {
      // Clean up any existing recording session first
      try {
        await Sound.stopRecorder();
        Sound.removeRecordBackListener();
        // Add a small delay to ensure cleanup is complete
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (cleanupError) {
        // Ignore cleanup errors - recorder might not be running
      }

      // Start fresh recording
      await Sound.startRecorder();
      Sound.addRecordBackListener(e => {
        setRecordTime(Sound.mmssss(Math.floor(e.currentPosition)));
      });
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Алдаа', 'Дуу бичих эхлүүлэхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };

  const onStopRecord = async () => {
    if (!isRecording) {
      console.log('No recording in progress to stop');
      return;
    }

    setIsLoading(true);
    try {
      const result = await Sound.stopRecorder();
      Sound.removeRecordBackListener();
      const { data } = await attachOrderAudio({
        variables: {
          number,
          audio: audioToFile(result),
        },
      });
      setAudio(data?.attachOrderAudio?.audio || null);
      setIsRecording(false);
      setRecordTime('00:00:00');
    } catch (error) {
      console.error('Failed to stop recording:', error);
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
