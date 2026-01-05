import { Dispatch, SetStateAction } from 'react';

import { BoxContainer } from '@/components';
import InputLabel from '@/components/InputLabel';
import { Box } from '@/components/Theme';
import Player from './Player';
import Recorder from './Recorder';

interface Props {
  audio: string | null;
  setAudio: Dispatch<SetStateAction<string | null>>;
  label: string;
  isRequired?: boolean;
  number: string;
  isRecording: boolean;
  isLoading: boolean;
  recordTime: string;
  onToggleRecord: () => void;
  onStopRecord: () => void;
}

const InputAudio = ({
  audio,
  setAudio,
  label,
  isRequired,
  number,
  isRecording,
  isLoading,
  recordTime,
  onToggleRecord,
  onStopRecord,
}: Props) => {
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
        {audio ? (
          <Player audio={audio} number={number} setAudio={setAudio} />
        ) : (
          <Recorder
            isRecording={isRecording}
            isLoading={isLoading}
            recordTime={recordTime}
            onToggleRecord={onToggleRecord}
          />
        )}
      </BoxContainer>
    </Box>
  );
};

export default InputAudio;
