import { useState } from 'react';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

import { Container, Content, NormalHeader } from '@/components';
import { Box } from '@/components/Theme';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const OrderCreateScreen = () => {
  const [step, setStep] = useState(1);
  const [isRent, setIsRent] = useState(false);

  const renderContent = () => {
    if (step === 1) {
      return (
        <AnimatedBox entering={SlideInLeft} exiting={SlideOutLeft}>
          <Step1 setIsRent={setIsRent} setStep={setStep} />
        </AnimatedBox>
      );
    } else if (step === 2) {
      return <Step2 />;
    } else {
      return <Step3 />;
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
        title="Захиалга үүсгэх"
        onPressBack={step === 1 ? undefined : onPressBack}
      />
      <Content edges={['bottom']} scrollable>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default OrderCreateScreen;
