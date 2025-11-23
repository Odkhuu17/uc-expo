import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import { Box, Text, useTheme } from '@/components/Theme';
import { carTypes } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSlice from '@/redux/slices/order';

const TOGGLE_BUTTON_WIDTH = 220;
const TOGGLE_BUTTON_HEIGHT = 20;

const CAR_IMAGE_SIZE = 55;

const CarTypes = () => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const dispatch = useAppDispatch();
  const { carType } = useAppSelector(state => state.order);

  const onToggle = () => {
    translateX.value = withSpring(
      translateX.value === 0
        ? -CAR_IMAGE_SIZE - theme.spacing.s * 2 - theme.spacing.m
        : 0
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Box
        py="m"
        px="s"
        backgroundColor="lightBlue"
        borderWidth={1}
        borderColor="baseBlue"
        borderTopRightRadius="l"
        borderBottomRightRadius="l"
        flexDirection="row"
        alignItems="center"
      >
        <Box gap="xs">
          {carTypes.map((car, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  dispatch(orderSlice.actions.changeCarType(car.name))
                }
              >
                <Box alignItems="center">
                  <Box
                    p="xs"
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="baseBlue"
                    width={CAR_IMAGE_SIZE}
                    height={CAR_IMAGE_SIZE}
                    backgroundColor={carType === car.name ? 'green' : 'white'}
                  >
                    <Image
                      source={car.image}
                      contentFit="contain"
                      style={css.carImage}
                    />
                  </Box>
                  <Box
                    px="xs"
                    backgroundColor="baseBlue"
                    borderRadius="m"
                    justifyContent="center"
                    style={css.carName}
                    alignItems="center"
                    minWidth={CAR_IMAGE_SIZE}
                  >
                    <Text variant="body4" color="white">
                      {car.name}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          height={TOGGLE_BUTTON_WIDTH}
        >
          <Box
            backgroundColor="baseBlue"
            borderRadius="m"
            position="absolute"
            top={0}
            left={TOGGLE_BUTTON_HEIGHT / 2 + theme.spacing.s / 2}
            right={0}
            height={TOGGLE_BUTTON_HEIGHT}
            width={TOGGLE_BUTTON_WIDTH}
            style={css.toggleButtonContainer}
          >
            <TouchableOpacity style={css.toggleButton} onPress={onToggle}>
              <Text color="white" variant="label">
                Ачааны машины төрөл сонгох
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Animated.View>
  );
};

const css = StyleSheet.create({
  carImage: {
    flex: 1,
  },
  carName: {
    height: 20,
    marginTop: -10,
  },
  toggleButtonContainer: {
    transform: [{ rotate: '90deg' }, { translateX: -TOGGLE_BUTTON_HEIGHT }],
    transformOrigin: 'left bottom',
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default CarTypes;
