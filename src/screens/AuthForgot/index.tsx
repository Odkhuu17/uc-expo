import { useState } from 'react';

import {
  Container,
  ContentScrollable,
  CustomKeyboardAvoidingView,
  HeaderLogo,
} from '@/components';
import { Box } from '@/components/Theme';
import Step1 from './Step1';
import Step2 from './Step2';

const AuthForgot = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');

  const renderContent = () => {
    switch (step) {
      case 2:
        return <Step2 phoneNumber={phoneNumber} />;
      default:
        return <Step1 setStep={setStep} setPhoneNumber={setPhoneNumber} />;
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <Container bg="light-car">
        <HeaderLogo variant="logo-dark" hasBack />
        <ContentScrollable edges={['bottom']}>
          <Box flex={2} gap="m" alignItems="center" justifyContent="center">
            {renderContent()}
          </Box>
          <Box flex={1} />
        </ContentScrollable>
      </Container>
    </CustomKeyboardAvoidingView>
  );
};

export default AuthForgot;
