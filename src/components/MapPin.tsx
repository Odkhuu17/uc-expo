import { Platform } from 'react-native';

import { FitImage } from '@/components';
import { Box, Text } from '@/components/Theme';

const PIN_HEIGHT = 60;
const TITLE_HEIGHT = 25;

interface Props {
  title?: string;
}

const MapPin = ({ title }: Props) => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      pointerEvents={Platform.OS === 'ios' ? 'none' : 'auto'}
    >
      {title ? (
        <Box
          height={TITLE_HEIGHT}
          backgroundColor="primary"
          borderRadius="m"
          px="s"
          justifyContent="center"
        >
          <Text variant="body3" color="white">
            {title}
          </Text>
        </Box>
      ) : (
        <Box height={TITLE_HEIGHT} />
      )}
      <FitImage
        source={require('assets/images/map_pin.png')}
        height={PIN_HEIGHT}
      />
      <Box height={PIN_HEIGHT / 2} />
    </Box>
  );
};

export default MapPin;
