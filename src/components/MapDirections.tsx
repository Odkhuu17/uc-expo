import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import { useTheme } from './Theme';

interface Props {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
}

const MapDirections = ({ origin, destination }: Props) => {
  const theme = useTheme();

  console.log(Config.GOOGLE_MAPS_API_KEY, 'APIKEY');

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
      strokeColor={theme.colors.primary}
      apikey={Config.GOOGLE_MAPS_API_KEY || ''}
    />
  );
};

export default MapDirections;
