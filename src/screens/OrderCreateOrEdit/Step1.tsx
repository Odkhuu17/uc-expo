import { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button, ContentScrollable, FitImage } from '@/components';
import { Box, Text } from '@/components/Theme';

interface Props {
  setIsRent: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const Step1 = ({ setIsRent, setStep }: Props) => {
  const onPress1 = () => {
    setIsRent(false);
    setStep(2);
  };

  const onPress2 = () => {
    setIsRent(true);
    setStep(2);
  };

  return (
    <ContentScrollable edges={['bottom']}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Box gap="xl3" alignItems="center">
          <Text variant="title">Техникийн төрөл сонгох</Text>
          <Box gap="xl">
            <TouchableOpacity onPress={onPress1}>
              <Box alignItems="center">
                <FitImage
                  source={require('assets/images/trucks.png')}
                  width={300}
                />
                <Button title="Ачааны машин" onPress={onPress1} />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2}>
              <Box alignItems="center">
                <FitImage
                  source={require('assets/images/rents.png')}
                  width={300}
                />
                <Button title="Техник түрээс" onPress={onPress2} />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </ContentScrollable>
  );
};

export default Step1;
