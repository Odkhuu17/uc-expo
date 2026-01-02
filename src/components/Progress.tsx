import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { Box, Text, useTheme } from '@/components/Theme';
import BoxContainer from './BoxContainer';

interface Props {
  sec: number;
  onFinish: () => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Progress = ({ sec, onFinish }: Props) => {
  const width = useSharedValue(0);
  const theme = useTheme();

  useEffect(() => {
    width.value = withTiming(100, { duration: sec * 1000 }, finished => {
      if (finished) {
        console.log(finished)
        runOnJS(onFinish)();
      }
    });
  }, []);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  return (
    <BoxContainer gap="s" backgroundColor="amber1">
      <Box flexDirection="row" alignItems="center" gap="s">
        <ActivityIndicator color={theme.colors.black} />
        <Box flex={1}>
          <Text variant="body2">Таны бүртгэлийг баталгаажуулж байна!</Text>
        </Box>
      </Box>
      <Box
        width="100%"
        height={5}
        backgroundColor="white"
        borderRadius="m"
        overflow="hidden"
      >
        <AnimatedBox
          borderRadius="m"
          style={animatedProgressStyle}
          height="100%"
          backgroundColor="primary"
        />
      </Box>
    </BoxContainer>
  );
};

export default Progress;
