import { FitImage } from '@/components';
import { Box } from '@/components/Theme';

const PIN_HEIGHT = 60;

interface Props {
  isMarker?: boolean;
}

const MapPin = ({ isMarker }: Props) => {
  return (
    <Box
      position={isMarker ? undefined : 'absolute'}
      flex={1}
      height={PIN_HEIGHT}
      style={{
        transform: [{ translateY: -PIN_HEIGHT / 2 }],
      }}
      alignItems="center"
      justifyContent="center"
    >
      <FitImage
        source={require('assets/images/map_pin.png')}
        height={PIN_HEIGHT}
      />
    </Box>
  );
};

export default MapPin;
