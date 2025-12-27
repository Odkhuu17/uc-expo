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
}

const InputAudio = ({ audio, setAudio, label, isRequired, number }: Props) => {
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
          <Recorder setAudio={setAudio} number={number} />
        )}
      </BoxContainer>
    </Box>
  );
};

export default InputAudio;
