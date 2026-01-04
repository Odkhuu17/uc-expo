import { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Box, Text, useTheme } from '@/components/Theme';

const TOGGLE_BUTTON_WIDTH = 250;
const TOGGLE_BUTTON_HEIGHT = 20;

const CAR_IMAGE_SIZE = 55;

interface Props {
  selectedCarTypes: string[];
  title: string;
  carTypes: { name: string; image: number }[];
  setSelectedCarTypes: Dispatch<SetStateAction<string[]>>;
}

const CarTypes = ({
  selectedCarTypes,
  title,
  carTypes,
  setSelectedCarTypes,
}: Props) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);

  const onToggle = () => {
    translateX.value = withSpring(
      translateX.value === 0
        ? -CAR_IMAGE_SIZE - theme.spacing.s - theme.spacing.m + theme.spacing.xs
        : 0,
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onToggleCarType = (carType: string) => {
    if (selectedCarTypes.includes(carType)) {
      setSelectedCarTypes(selectedCarTypes.filter(type => type !== carType));
    } else {
      setSelectedCarTypes([...selectedCarTypes, carType]);
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Box
        py="m"
        pl="s"
        pr="m"
        backgroundColor="primaryLight"
        borderWidth={1}
        borderColor="primary"
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
                onPress={() => onToggleCarType(car.name)}
              >
                <Box
                  alignItems="center"
                  opacity={selectedCarTypes.includes(car.name) ? 1 : 0.5}
                >
                  <Box
                    p="xs"
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="primary"
                    width={CAR_IMAGE_SIZE}
                    height={CAR_IMAGE_SIZE}
                    backgroundColor="white"
                  >
                    <Image
                      source={car.image}
                      resizeMode="contain"
                      style={css.carImage}
                    />
                  </Box>
                  <Box
                    px="xs"
                    backgroundColor="primary"
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
            backgroundColor="primary"
            borderRadius="m"
            position="absolute"
            top={0}
            left={-TOGGLE_BUTTON_HEIGHT / 2 + theme.spacing.m}
            height={TOGGLE_BUTTON_HEIGHT}
            width={TOGGLE_BUTTON_WIDTH}
            style={css.toggleButtonContainer}
          >
            <TouchableOpacity style={css.toggleButton} onPress={onToggle}>
              <Text color="white" variant="label">
                {title}
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
    width: '100%',
    height: '100%',
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
