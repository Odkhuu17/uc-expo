import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Button, Container, Content, NormalHeader } from '@/components';
import { Box } from '@/components/Theme';
import { useVerifyDriverMutation } from '@/gql/mutations/verifyDriverMutation.generated';
import { imageToFile } from '@/utils/fileHelpers';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const VerifyScreen = () => {
  const [step, setStep] = useState(1);
  const [driverLicense, setDriverLicense] = useState<string | null>(null);
  const [passportFront, setPassportFront] = useState<string | null>(null);
  const [passportBack, setPassportBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const router = useRouter();

  const [verifyDriver, { loading }] = useVerifyDriverMutation();

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <AnimatedBox entering={FadeIn} exiting={FadeOut} key={2} flex={1}>
            <Step2
              passportFront={passportFront}
              setPassportFront={setPassportFront}
              passportBack={passportBack}
              setPassportBack={setPassportBack}
            />
          </AnimatedBox>
        );
      case 3:
        return (
          <AnimatedBox entering={FadeIn} exiting={FadeOut} key={3} flex={1}>
            <Step3 selfie={selfie} setSelfie={setSelfie} />
          </AnimatedBox>
        );
      default:
        return (
          <AnimatedBox entering={FadeIn} exiting={FadeOut} key={1} flex={1}>
            <Step1
              driverLicense={driverLicense}
              setDriverLicense={setDriverLicense}
            />
          </AnimatedBox>
        );
    }
  };

  const onPressNext = () => {
    if (step === 1) {
      if (!driverLicense) {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Та жолооны үнэмлэхний зургаа оруулна уу',
          },
        });
      }

      setStep(2);
    } else if (step === 2) {
      if (!passportFront || !passportBack) {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Та иргэний үнэмлэхний зургаа оруулна уу',
          },
        });
      }

      setStep(3);
    } else {
      if (!selfie) {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Та өөрийн зургаа оруулна уу',
          },
        });
      }
      const driverLicenseImage = imageToFile(driverLicense!);
      const passportFrontImage = imageToFile(passportFront!);
      const passportBackImage = imageToFile(passportBack!);
      const selfieImage = imageToFile(selfie!);

      verifyDriver({
        variables: {
          driverLicense: driverLicenseImage,
          passport: passportFrontImage,
          passportBack: passportBackImage,
          selfie: selfieImage,
        },
      });
    }
  };

  const onPressBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Container>
      <NormalHeader
        title="Баталгаажуулалт"
        noMenu
        hasBack
        onPressBack={step === 1 ? undefined : onPressBack}
      />
      <Content edges={['bottom']}>
        <Box flex={1}>{renderStep()}</Box>
        <Button title="Үргэлжлүүлэх" onPress={onPressNext} loading={loading} />
      </Content>
    </Container>
  );
};

export default VerifyScreen;
