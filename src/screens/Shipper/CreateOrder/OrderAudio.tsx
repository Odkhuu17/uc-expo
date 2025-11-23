import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { Microphone2 } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Alert } from 'react-native';

import { formatDuration } from '@/utils/helpers';
import OrderIconButton from './components/OrderIconButton';
import useOnRemoveAudio from './hooks/useOnRemoveAudio';

interface Props {
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
}

const OrderAudio = ({ setAudio, audio }: Props) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const { onRemoveAudio } = useOnRemoveAudio({ setAudio });

  const init = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();

    if (!status.granted) {
      Alert.alert('Permission to access microphone was denied');
    }

    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onRecord = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const onToggleRecord = async () => {
    if (!recorderState.isRecording) {
      if (audio) {
        onRemoveAudio({
          onConfirm: onRecord,
        });
      } else {
        onRecord();
      }
    } else {
      await audioRecorder.stop();
      setAudio(recorderState.url!);
    }
  };

  return (
    <OrderIconButton
      icon={Microphone2}
      title={
        recorderState.isRecording
          ? formatDuration(recorderState.durationMillis)
          : 'Дуу хоолой нэмэх'
      }
      onPress={onToggleRecord}
    />
  );
};

export default OrderAudio;
