import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';

import { Container, Content, NormalHeader } from '@/components';
import { useGetTrackTruckQuery } from '@/gql/query/getTrackTruck.generated';
import { isRentOrder } from '@/utils/helpers';
import { MapPin } from '../OrderCreateOrEdit/Step2/components';

const TrackTruck = () => {
  const { number } = useLocalSearchParams<{ number: string }>();

  const { data } = useGetTrackTruckQuery({
    variables: {
      number,
    },
  });

  const isRent = isRentOrder(data?.order?.carType);

  return (
    <Container>
      <NormalHeader hasBack title={number} />
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
                    ?.latitude
                ) || 0,
              longitude:
                Number(
                  data?.order?.acceptedDeliveryRequest?.truck?.currentTrack
                    ?.longitude
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
              <MapPin isMarker />
            </Marker>
          )}
          {!isRent && data?.order?.destination && (
            <Marker
              coordinate={{
                latitude: Number(data?.order?.destination?.latitude) || 0,
                longitude: Number(data?.order?.destination?.longitude) || 0,
              }}
            >
              <MapPin isMarker />
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
