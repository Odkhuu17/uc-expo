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
import { isRentOrder } from '@/utils/helpers';
import { useGetTrackTruckQuery } from '@/gql/queries/trackTruck.generated';
import { INavigationProps } from '@/navigations';
import { deliveryCarTypes, rentCarTypes } from '@/constants/transportTypes';
import { Box, useTheme } from '@/components/Theme';

interface Props {
  route: INavigationProps<'TrackTruck'>['route'];
}

const TrackTruck = ({ route }: Props) => {
  const { number } = route.params;
  const theme = useTheme();
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
  const location = origin;

  useEffect(() => {
    const toRegion = (
      points: Array<{ latitude: number; longitude: number }>,
    ) => {
      const lats = points.map(p => p.latitude);
      const lons = points.map(p => p.longitude);

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLon = Math.min(...lons);
      const maxLon = Math.max(...lons);

      const latitudeDelta = Math.max((maxLat - minLat) * 1.8, 0.05);
      const longitudeDelta = Math.max((maxLon - minLon) * 1.8, 0.05);

      const region: Region = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLon + maxLon) / 2,
        latitudeDelta,
        longitudeDelta,
      };

      return region;
    };

    const trackLat = Number(currentTrack?.latitude);
    const trackLon = Number(currentTrack?.longitude);
    const locationLat = Number(location?.latitude);
    const locationLon = Number(location?.longitude);

    const hasTrack = Number.isFinite(trackLat) && Number.isFinite(trackLon);
    const hasLocation =
      Number.isFinite(locationLat) && Number.isFinite(locationLon);

    if (isRent) {
      if (!hasTrack || !hasLocation) return;
      mapRef.current?.animateToRegion(
        toRegion([
          { latitude: trackLat, longitude: trackLon },
          { latitude: locationLat, longitude: locationLon },
        ]),
        350,
      );
      return;
    }

    const destinationLat = Number(destination?.latitude);
    const destinationLon = Number(destination?.longitude);
    const hasDestination =
      Number.isFinite(destinationLat) && Number.isFinite(destinationLon);

    if (!hasTrack || !hasLocation || !hasDestination) return;

    mapRef.current?.animateToRegion(
      toRegion([
        { latitude: trackLat, longitude: trackLon },
        { latitude: locationLat, longitude: locationLon },
        { latitude: destinationLat, longitude: destinationLon },
      ]),
      350,
    );
  }, [
    currentTrack?.latitude,
    currentTrack?.longitude,
    location?.latitude,
    location?.longitude,
    destination?.latitude,
    destination?.longitude,
    isRent,
  ]);

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
                    : deliveryCarTypes?.find(
                        i => i.name === data?.order?.carType,
                      )?.image
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
              color="primary"
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
              color="primary"
            />
          )}
          {currentTrack && origin && !isRent && (
            <MapDirections
              destination={{
                latitude: Number(currentTrack?.latitude) || 0,
                longitude: Number(currentTrack?.longitude) || 0,
              }}
              origin={{
                latitude: Number(origin?.latitude) || 0,
                longitude: Number(origin?.longitude) || 0,
              }}
              color="error"
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
