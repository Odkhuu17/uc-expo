import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Delete03Icon,
  Mic01FreeIcons,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from '@hugeicons/core-free-icons';
import {
  AudioContext,
  AudioManager,
  AudioRecorder,
} from 'react-native-audio-api';

import { BoxContainer, ButtonIcon, Loader } from '@/components';
import InputLabel from '@/components/InputLabel';
import { Box, Text, useTheme } from '@/components/Theme';
import { useAttachOrderAudioMutation } from '@/gql/mutations/attachOrderAudio.generated';
import { useDestroyOrderAudioMutation } from '@/gql/mutations/destroyOrderAudio.generated';
import { formatDuration } from '@/utils/helpers';

interface Props {
  audio: string | null;
  setAudio: Dispatch<SetStateAction<string | null>>;
  label: string;
  isRequired?: boolean;
  number: string;
}

const InputAudio = ({ audio, setAudio, label, isRequired, number }: Props) => {
  const recorder = new AudioRecorder({
    sampleRate: 16000,
    bufferLengthInSamples: 16000,
  });

  const onPressRecord = () => {
    recorder.onAudioReady(event => {
      const { buffer, numFrames, when } = event;

      console.log(
        'Audio recorder buffer ready:',
        buffer.duration,
        numFrames,
        when,
      );
    });

    recorder.start();
  };

  return (
    <Box>
      <InputLabel label={label} isRequired={isRequired} />
      <BoxContainer
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="m"
        p="m"
        gap="m"
      >
        <Box flexDirection="row" alignItems="center" gap="s">
          <ButtonIcon icon={Mic01FreeIcons} onPress={onPressRecord} />
          <Text variant="body2" color="grey4">
            Дуу бичлэг нэмэх
          </Text>
        </Box>
      </BoxContainer>
    </Box>
  );
};

export default InputAudio;
