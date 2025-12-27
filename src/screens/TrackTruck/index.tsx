import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Container, Content, HeaderNormal } from '@/components';
import { isRentOrder } from '@/utils/helpers';
import { useGetTrackTruckQuery } from '@/gql/queries/trackTruck.generated';
import { INavigationProps } from '@/navigations';
import MapPin from './MapPin';

interface Props {
  route: INavigationProps<'TrackTruck'>['route'];
}

const TrackTruck = ({ route }: Props) => {
  const { number } = route.params;

  const { data } = useGetTrackTruckQuery({
    variables: {
      number,
    },
  });

  const isRent = isRentOrder(data?.order?.carType);

  return (
    <Container>
      <HeaderNormal hasBack title={`Ачаа хянах ${number}`} />
      <Content edges={[]} noHSpace noVSpace>
        <MapView
          style={css.map}
          initialRegion={{
            latitude: 47.92123,
            longitude: 106.918556,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{
              latitude:
                Number(
                  data?.order?.acceptedDeliveryRequest?.truck?.currentTrack
                    ?.latitude,
                ) || 0,
              longitude:
                Number(
                  data?.order?.acceptedDeliveryRequest?.truck?.currentTrack
                    ?.longitude,
                ) || 0,
            }}
          />
          {!isRent && data?.order?.origin && (
            <Marker
              coordinate={{
                latitude: Number(data?.order?.origin?.latitude) || 0,
                longitude: Number(data?.order?.origin?.longitude) || 0,
              }}
            >
              <MapPin />
            </Marker>
          )}
          {!isRent && data?.order?.destination && (
            <Marker
              coordinate={{
                latitude: Number(data?.order?.destination?.latitude) || 0,
                longitude: Number(data?.order?.destination?.longitude) || 0,
              }}
            >
              <MapPin />
            </Marker>
          )}
        </MapView>
      </Content>
    </Container>
  );
};

const css = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default TrackTruck;
