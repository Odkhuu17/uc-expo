import { Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {
  Container,
  Content,
  HeaderNormal,
  MapDirections,
  MapPin,
} from '@/components';
import { isRentOrder } from '@/utils/helpers';
import { useGetTrackTruckQuery } from '@/gql/queries/trackTruck.generated';
import { INavigationProps } from '@/navigations';
import { rentCarTypes } from '@/constants/transportTypes';
import { Box, useTheme } from '@/components/Theme';

interface Props {
  route: INavigationProps<'TrackTruck'>['route'];
}

const TrackTruck = ({ route }: Props) => {
  const { number } = route.params;
  const theme = useTheme();

  const { data } = useGetTrackTruckQuery({
    variables: {
      number,
    },
  });

  const isRent = isRentOrder(data?.order?.carType);
  const currentTrack =
    data?.order?.acceptedDeliveryRequest?.truck?.currentTrack;
  const destination = data?.order?.destination;
  const origin = data?.order?.origin;

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
              latitude: Number(currentTrack?.latitude) || 0,
              longitude: Number(currentTrack?.longitude) || 0,
            }}
          >
            <Box
              width={50}
              height={50}
              borderRadius="full"
              overflow="hidden"
              backgroundColor="white"
              borderWidth={2}
              borderColor="primary"
            >
              <Image
                source={
                  isRent
                    ? rentCarTypes?.find(i => i.name === data?.order?.carType)
                        ?.image
                    : undefined
                }
                resizeMode="contain"
                style={css.img}
              />
            </Box>
          </Marker>
          {isRent && currentTrack && origin && (
            <MapDirections
              origin={{
                latitude: Number(currentTrack?.latitude) || 0,
                longitude: Number(currentTrack?.longitude) || 0,
              }}
              destination={{
                latitude: Number(origin?.latitude) || 0,
                longitude: Number(origin?.longitude) || 0,
              }}
            />
          )}
          {currentTrack && destination && !isRent && (
            <MapDirections
              origin={{
                latitude: Number(currentTrack?.latitude) || 0,
                longitude: Number(currentTrack?.longitude) || 0,
              }}
              destination={{
                latitude: Number(destination?.latitude) || 0,
                longitude: Number(destination?.longitude) || 0,
              }}
            />
          )}
          {data?.order?.origin && (
            <Marker
              coordinate={{
                latitude: Number(data?.order?.origin?.latitude) || 0,
                longitude: Number(data?.order?.origin?.longitude) || 0,
              }}
            >
              <MapPin title={isRent ? 'Ажиллах байршил' : 'Очиж авах хаяг'} />
            </Marker>
          )}
          {!isRent && data?.order?.destination && (
            <Marker
              coordinate={{
                latitude: Number(data?.order?.destination?.latitude) || 0,
                longitude: Number(data?.order?.destination?.longitude) || 0,
              }}
            >
              <MapPin title="Хүргэх хаяг" />
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
  img: {
    width: '100%',
    height: '100%',
  },
});

export default TrackTruck;
