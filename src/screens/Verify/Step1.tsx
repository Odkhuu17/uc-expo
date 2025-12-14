import { Dispatch, SetStateAction } from 'react';

import { ImageInput } from './components';

interface Props {
  driverLicense: string | null;
  setDriverLicense: Dispatch<SetStateAction<string | null>>;
}

const Step1 = ({ driverLicense, setDriverLicense }: Props) => {
  return (
    <ImageInput
      image={driverLicense}
      setImage={setDriverLicense}
      label="Жолооны үнэмлэхний зургаа оруулна уу!"
    />
  );
};

export default Step1;
