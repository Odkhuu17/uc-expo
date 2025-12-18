import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
  BottomContainer,
  Button,
  Container,
  NormalHeader,
  ScrollableContent,
} from '@/components';
import { Box } from '@/components/Theme';
import { useVerifyDriverMutation } from '@/gql/mutations/verifyDriverMutation.generated';
import { imageToFile } from '@/utils/fileHelpers';
import { ImageInput } from './components';

const VerifyScreen = () => {
  const [passportFront, setPassportFront] = useState<string | null>(null);
  const [passportBack, setPassportBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const router = useRouter();

  const [verifyDriver, { loading }] = useVerifyDriverMutation();

  const onPressNext = async () => {
    if (!passportFront || !passportBack) {
      return router.navigate({
        pathname: '/modal',
        params: {
          type: 'error',
          message: 'Та иргэний үнэмлэхний зургаа оруулна уу',
        },
      });
    }

    if (!selfie) {
      return router.navigate({
        pathname: '/modal',
        params: {
          type: 'error',
          message: 'Та өөрийн зургаа оруулна уу',
        },
      });
    }

    const passportFrontImage = imageToFile(passportFront!);
    const passportBackImage = imageToFile(passportBack!);
    const selfieImage = imageToFile(selfie!);

    await verifyDriver({
      variables: {
        passport: passportFrontImage,
        passportBack: passportBackImage,
        selfie: selfieImage,
      },
    });

    router.back();
  };

  return (
    <Container>
      <NormalHeader title="Баталгаажуулалт" noMenu hasBack />
      <ScrollableContent edges={[]}>
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
          <ImageInput
            image={selfie}
            setImage={setSelfie}
            label="Өөрийн зураг"
            onlyCamera
          />
        </Box>
      </ScrollableContent>
      <BottomContainer>
        <Button title="Үргэлжлүүлэх" onPress={onPressNext} loading={loading} />
      </BottomContainer>
    </Container>
  );
};

export default VerifyScreen;
