import { HugeiconsIcon } from '@hugeicons/react-native';
import { Location05Icon } from '@hugeicons/core-free-icons';

import { Box, useTheme } from '@/components/Theme';
import SingleLocation from './SingleLocation';
import { BoxContainer } from '@/components';

interface Props {
  isRent?: boolean;
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
  isRent,
}: Props) => {
  const theme = useTheme();

  return (
    <BoxContainer borderWidth={2} borderColor="primary">
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box flex={1}>
          <SingleLocation
            loading={loading}
            onPress={onPressOrigin}
            location={origin}
            selected={selected === 'origin'}
            title={isRent ? 'Ажиллах байршил' : 'Очиж авах хаяг'}
          />
          {!isRent && (
            <>
              <Box width="100%" height={1} backgroundColor="border" my="s" />
              <SingleLocation
                loading={loading}
                onPress={onPressDestination}
                location={destination}
                selected={selected === 'destination'}
                title="Хүргэх хаяг"
              />
            </>
          )}
        </Box>
        <Box alignItems="center" gap="xs" py="m">
          {!isRent && (
            <>
              <Box
                height={15}
                width={15}
                borderRadius="full"
                borderWidth={2}
                borderColor="primary"
              />
              <Box width={1} flex={1} backgroundColor="border" />
            </>
          )}
          <HugeiconsIcon icon={Location05Icon} size={theme.icon.m} />
        </Box>
      </Box>
    </BoxContainer>
  );
};

export default OrderLocation;
