import { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import {
  Container,
  ContentScrollable,
  CustomKeyboardAvoidingView,
  HeaderLogo,
} from '@/components';
import { Box } from '@/components/Theme';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const AuthForgot = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState('');

  const renderContent = () => {
    switch (step) {
      case 2:
        return (
          <AnimatedBox
            entering={FadeIn}
            exiting={FadeOut}
            key={2}
            flex={2}
            gap="m"
            alignItems="center"
            justifyContent="center"
          >
            <Step2
              phoneNumber={phoneNumber}
              setToken={setToken}
              token={token}
              setStep={setStep}
            />
          </AnimatedBox>
        );
      case 3:
        return (
          <AnimatedBox
            entering={FadeIn}
            exiting={FadeOut}
            key={3}
            flex={2}
            gap="m"
            alignItems="center"
            justifyContent="center"
          >
            <Step3 phoneNumber={phoneNumber} token={token} />
          </AnimatedBox>
        );
      default:
        return (
          <AnimatedBox
            entering={FadeIn}
            exiting={FadeOut}
            key={1}
            flex={2}
            gap="m"
            alignItems="center"
            justifyContent="center"
          >
            <Step1 setStep={setStep} setPhoneNumber={setPhoneNumber} />
          </AnimatedBox>
        );
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <Container bg="light-car">
        <HeaderLogo variant="logo-dark" hasBack />
        <ContentScrollable edges={['bottom']}>
          {renderContent()}
          <Box flex={1} />
        </ContentScrollable>
      </Container>
    </CustomKeyboardAvoidingView>
  );
};

export default AuthForgot;
