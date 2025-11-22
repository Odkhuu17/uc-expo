import { useState } from 'react';

import {
  Container,
  Content,
  CustomKeyboardAvoidingView,
  LogoHeader,
} from '@/components';
import { Box } from '@/components/Theme';
import Step1 from './Step1';
import Step2 from './Step2';

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');

  const renderContent = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} setPhoneNumber={setPhoneNumber} />;
      case 2:
        return <Step2 phoneNumber={phoneNumber} />;
      default:
        return null;
    }
  };

  return (
    <Container bg="light-car">
      <CustomKeyboardAvoidingView>
        <LogoHeader variant="logo-dark" hasBack />
        <Content edges={['bottom']} scrollable>
          <Box flex={2} gap="s" alignItems="center" justifyContent="center">
            {renderContent()}
          </Box>
          <Box flex={1} />
        </Content>
      </CustomKeyboardAvoidingView>
    </Container>
  );
};

export default RegisterScreen;
