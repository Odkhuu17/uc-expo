import { Image, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useEffect, useRef } from 'react';

import {
  Container,
  Content,
  HeaderNormal,
  MapDirections,
  MapPin,
} from '@/components';
import { getMapRegion, isRentOrder } from '@/utils/helpers';
import { useGetTrackTruckQuery } from '@/gql/queries/trackTruck.generated';
import { INavigationProps } from '@/navigations';
import { deliveryCarTypes, rentCarTypes } from '@/constants/transportTypes';
import { Box } from '@/components/Theme';

interface Props {
  route: INavigationProps<'TrackTruck'>['route'];
}

const TrackTruck = ({ route }: Props) => {
  const { number } = route.params;
  const mapRef = useRef<MapView | null>(null);

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

  useEffect(() => {
    if (isRent) {
      if (origin && currentTrack) {
        const region = getMapRegion({
          origin: {
            latitude: origin?.latitude || 47.92123,
            longitude: origin?.longitude || 106.918556,
          },
          destination: {
            latitude: currentTrack?.latitude || 47.92123,
            longitude: currentTrack?.longitude || 106.918556,
          },
        });
        // mapRef?.current?.animateToRegion(region, 350);
      }
    } else {
      if (currentTrack && destination) {
        const region = getMapRegion({
          origin: {
            latitude: currentTrack?.latitude || 47.92123,
            longitude: currentTrack?.longitude || 106.918556,
          },
          destination: {
            latitude: destination?.latitude || 47.92123,
            longitude: destination?.longitude || 106.918556,
          },
        });

        console.log(region)

        // mapRef?.current?.animateToRegion(region, 350);
      } else if (origin && destination) {
        const region = getMapRegion({
          origin: {
            latitude: origin?.latitude || 47.92123,
            longitude: origin?.longitude || 106.918556,
          },
          destination: {
            latitude: destination?.latitude || 47.92123,
            longitude: destination?.longitude || 106.918556,
          },
        });

        // mapRef?.current?.animateToRegion(region, 350);
      }
    }
  }, [destination, origin, currentTrack, isRent]);

  return (
    <Container>
      <HeaderNormal hasBack title={`Ачаа хянах ${number}`} />
      <Content edges={[]} noHSpace noVSpace>
        <MapView
          style={css.map}
          ref={mapRef}
          initialRegion={{
            latitude: 47.92123,
            longitude: 106.918556,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentTrack?.latitude
                ? Number(currentTrack?.latitude)
                : 0,
              longitude: currentTrack?.longitude
                ? Number(currentTrack?.longitude)
                : 0,
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
                    : deliveryCarTypes?.find(
                        i => i.name === data?.order?.carType,
                      )?.image
                }
                resizeMode="contain"
                style={css.img}
              />
            </Box>
          </Marker>
          {data?.order?.origin && (
            <Marker
              coordinate={{
                latitude: data?.order?.origin?.latitude
                  ? Number(data?.order?.origin?.latitude)
                  : 0,
                longitude: data?.order?.origin?.longitude
                  ? Number(data?.order?.origin?.longitude)
                  : 0,
              }}
            >
              <MapPin title={isRent ? 'Ажиллах байршил' : 'Очиж авах хаяг'} />
            </Marker>
          )}
          {!isRent && data?.order?.destination && (
            <Marker
              coordinate={{
                latitude: data?.order?.destination?.latitude
                  ? Number(data?.order?.destination?.latitude)
                  : 0,
                longitude: data?.order?.destination?.longitude
                  ? Number(data?.order?.destination?.longitude)
                  : 0,
              }}
            >
              <MapPin title="Хүргэх хаяг" />
            </Marker>
          )}
          {isRent && currentTrack && origin && (
            <MapDirections
              origin={{
                latitude: currentTrack?.latitude
                  ? Number(currentTrack?.latitude)
                  : 0,
                longitude: currentTrack?.longitude
                  ? Number(currentTrack?.longitude)
                  : 0,
              }}
              destination={{
                latitude: origin?.latitude ? Number(origin?.latitude) : 0,
                longitude: origin?.longitude ? Number(origin?.longitude) : 0,
              }}
              color="primary"
            />
          )}
          {currentTrack && destination && !isRent && (
            <MapDirections
              origin={{
                latitude: currentTrack?.latitude
                  ? Number(currentTrack?.latitude)
                  : 0,
                longitude: currentTrack?.longitude
                  ? Number(currentTrack?.longitude)
                  : 0,
              }}
              destination={{
                latitude: destination?.latitude
                  ? Number(destination?.latitude)
                  : 0,
                longitude: destination?.longitude
                  ? Number(destination?.longitude)
                  : 0,
              }}
            />
          )}
          {currentTrack && origin && !isRent && (
            <MapDirections
              destination={{
                latitude: currentTrack?.latitude
                  ? Number(currentTrack?.latitude)
                  : 0,
                longitude: currentTrack?.longitude
                  ? Number(currentTrack?.longitude)
                  : 0,
              }}
              origin={{
                latitude: origin?.latitude ? Number(origin?.latitude) : 0,
                longitude: origin?.longitude ? Number(origin?.longitude) : 0,
              }}
              color="error"
            />
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
