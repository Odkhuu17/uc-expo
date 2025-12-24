import { Dispatch, SetStateAction } from 'react';

interface Props {
  audio: string | null;
  setAudio: Dispatch<SetStateAction<string | null>>;
  label: string;
  isRequired?: boolean;
  number: string;
}

const InputAudio = ({ audio, setAudio, label, isRequired, number }: Props) => {
  return <></>;
};

export default InputAudio;