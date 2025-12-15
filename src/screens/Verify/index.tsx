import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import {
  Button,
  Container,
  Content,
  MessageModal,
  NormalHeader,
} from '@/components';
import { Box } from '@/components/Theme';
import { useVerifyDriverMutation } from '@/gql/mutations/verifyDriverMutation.generated';
import { imageToFile } from '@/utils/fileHelpers';
import Step1 from './Step1';
import Step2 from './Step2';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const VerifyScreen = () => {
  const [step, setStep] = useState(1);
  const [passportFront, setPassportFront] = useState<string | null>(null);
  const [passportBack, setPassportBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const [verifyDriver, { loading }] = useVerifyDriverMutation();

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <AnimatedBox entering={FadeIn} exiting={FadeOut} key={3} flex={1}>
            <Step2 selfie={selfie} setSelfie={setSelfie} />
          </AnimatedBox>
        );
      default:
        return (
          <AnimatedBox entering={FadeIn} exiting={FadeOut} key={2} flex={1}>
            <Step1
              passportFront={passportFront}
              setPassportFront={setPassportFront}
              passportBack={passportBack}
              setPassportBack={setPassportBack}
            />
          </AnimatedBox>
        );
    }
  };

  const onPressNext = async () => {
    if (step === 1) {
      if (!passportFront || !passportBack) {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Та иргэний үнэмлэхний зургаа оруулна уу',
          },
        });
      }

      setStep(2);
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
      const passportFrontImage = imageToFile(passportFront!);
      const passportBackImage = imageToFile(passportBack!);
      const selfieImage = imageToFile(selfie!);

      const { data } = await verifyDriver({
        variables: {
          passport: passportFrontImage,
          passportBack: passportBackImage,
          selfie: selfieImage,
        },
      });

      if (data?.verifyDriver?.status === 'rejected') {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message:
              data.verifyDriver.field5 || 'Баталгаажуулалт амжилтгүй боллоо',
          },
        });
      } else {
        dispatch(
          authSlice.actions.changeUser({ ...user!, verifyStatus: 'pending' })
        );
        router.push('/waiting');
      }
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
