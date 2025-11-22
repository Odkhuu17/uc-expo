import { Location } from 'iconsax-react-nativejs';

import { Box, useTheme } from '../Theme';
import SingleLocation from './SingleLocation';

interface Props {
  selected?: 'origin' | 'destination';
  origin?: string;
  destination?: string;
  onPressOrigin: () => void;
  onPressDestination: () => void;
  loading?: boolean;
}

const OrderLocation = ({
  selected,
  origin,
  destination,
  onPressOrigin,
  onPressDestination,
  loading,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      borderWidth={2}
      backgroundColor="white"
      borderColor="baseBlue"
      px="m"
      py="m"
      borderRadius="m"
    >
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box flex={1}>
          <SingleLocation
            loading={loading}
            onPress={onPressOrigin}
            location={origin}
            selected={selected === 'origin'}
            title="Очиж авах хаяг"
          />
          <Box width="100%" height={1} backgroundColor="border" my="s" />
          <SingleLocation
            loading={loading}
            onPress={onPressDestination}
            location={destination}
            selected={selected === 'destination'}
            title="Хүргэх хаяг"
          />
        </Box>
        <Box alignItems="center" gap="xs" py="m">
          <Box
            height={15}
            width={15}
            borderRadius="full"
            borderWidth={2}
            borderColor="baseBlue"
          />
          <Box width={1} flex={1} backgroundColor="border" />
          <Location size={theme.icon.m} />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderLocation;
