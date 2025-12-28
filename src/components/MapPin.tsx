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
      flex={1}
      height={PIN_HEIGHT}
      style={{
        transform: [{ translateY: -PIN_HEIGHT / 2 - TITLE_HEIGHT / 2 }],
      }}
      alignItems="center"
      justifyContent="center"
    >
      {title && (
        <Box
          height={25}
          backgroundColor="primary"
          borderRadius="m"
          px="m"
          justifyContent="center"
        >
          <Text variant="body3" color="white">
            {title}
          </Text>
        </Box>
      )}
      <FitImage
        source={require('assets/images/map_pin.png')}
        height={PIN_HEIGHT}
      />
    </Box>
  );
};

export default MapPin;
