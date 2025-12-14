import { Dispatch, SetStateAction } from 'react';
import { ImageInput } from './components';

interface Props {
  selfie: string | null;
  setSelfie: Dispatch<SetStateAction<string | null>>;
}

const Step3 = ({ selfie, setSelfie }: Props) => {
  return (
    <ImageInput
      image={selfie}
      setImage={setSelfie}
      label="Өөрийн зураг"
      onlyCamera
    />
  );
};

export default Step3;
