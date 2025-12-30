import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import { Theme, useTheme } from './Theme';

interface Props {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  color?: keyof Theme['colors'];
}

const MapDirections = ({ origin, destination, color = 'primary' }: Props) => {
  const theme = useTheme();

  return (
    <MapViewDirections
      origin={{
        latitude: origin?.latitude,
        longitude: origin?.longitude,
      }}
      destination={{
        latitude: destination?.latitude,
        longitude: destination?.longitude,
      }}
      strokeWidth={4}
      strokeColor={theme.colors[color]}
      apikey={Config.GOOGLE_MAPS_API_KEY || ''}
    />
  );
};

export default MapDirections;
