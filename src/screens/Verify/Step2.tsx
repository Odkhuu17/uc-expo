import { Dispatch, SetStateAction } from 'react';

import { Box } from '@/components/Theme';
import { ImageInput } from './components';

interface Props {
  passportFront: string | null;
  setPassportFront: Dispatch<SetStateAction<string | null>>;
  passportBack: string | null;
  setPassportBack: Dispatch<SetStateAction<string | null>>;
}

const Step2 = ({
  passportFront,
  setPassportFront,
  passportBack,
  setPassportBack,
}: Props) => {
  return (
    <Box gap="m">
      <ImageInput
        image={passportFront}
        setImage={setPassportFront}
        label="Иргэний үнэмлэхний зураг (Урд тал)"
      />
      <ImageInput
        image={passportBack}
        setImage={setPassportBack}
        label="Иргэний үнэмлэхний зураг (Ар тал)"
      />
    </Box>
  );
};

export default Step2;
