import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Box } from '@/components/Theme';

interface Props {
  index: number;
  children: React.ReactNode;
  offset: SharedValue<number>;
  childrenWidth: number;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const TranslatedElement = ({
  index,
  children,
  offset,
  childrenWidth,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });

  return (
    <AnimatedBox style={animatedStyle} position="absolute">
      {children}
    </AnimatedBox>
  );
};

export default TranslatedElement;
