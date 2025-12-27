import { Mic01FreeIcons, PauseIcon } from '@hugeicons/core-free-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Sound from 'react-native-nitro-sound';

import { ButtonIcon } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useAttachOrderAudioMutation } from '@/gql/mutations/attachOrderAudio.generated';
import { audioToFile } from '@/utils/fileHelpers';

interface Props {
  setAudio: Dispatch<SetStateAction<string | null>>;
  number: string;
}

const Recorder = ({ setAudio, number }: Props) => {
  const [attachOrderAudio, { loading }] = useAttachOrderAudioMutation();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');

  const onStartRecord = async () => {
    setIsLoading(true);
    try {
      await Sound.startRecorder();
      Sound.addRecordBackListener(e => {
        setRecordTime(Sound.mmssss(Math.floor(e.currentPosition)));
      });
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStopRecord = async () => {
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
    } catch (error) {
      console.error('Failed to stop recording:', error);
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

  return (
    <Box flexDirection="row" alignItems="center" gap="s">
      <ButtonIcon
        loading={isLoading || loading}
        icon={isRecording ? PauseIcon : Mic01FreeIcons}
        onPress={onToggleRecord}
      />
      <Text variant="body2" color="grey4">
        {isRecording ? recordTime : 'Дуу бичлэг нэмэх'}
      </Text>
    </Box>
  );
};

export default Recorder;
