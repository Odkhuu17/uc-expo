import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Box } from '@/components/Theme';
import { useEffect } from 'react';
import { scheduleOnRN } from 'react-native-worklets';

interface Props {
  sec: number;
  onFinish: () => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Progress = ({ sec, onFinish }: Props) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(100, { duration: sec * 1000 }, finished => {
      if (finished) {
        scheduleOnRN(onFinish);
      }
    });
  }, []);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  return (
    <Box
      width="100%"
      height={5}
      backgroundColor="grey"
      borderRadius="m"
      overflow="hidden"
    >
      <AnimatedBox
        borderRadius="m"
        style={[animatedProgressStyle, { width: '0%' }]}
        height="100%"
        backgroundColor="baseBlue"
      />
    </Box>
  );
};

export default Progress;
