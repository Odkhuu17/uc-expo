import Config from 'react-native-config';
import { createNumberMask } from 'react-native-mask-input';
import { Region } from 'react-native-maps';

import { rentCarTypes } from '@/constants/transportTypes';

export const moneyFormat = (
  amount: number | string,
  decimalPlaces: number = 0,
) => {
  return `${Number(amount)
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮`;
};

export const moneyMask = createNumberMask({
  delimiter: ',',
  precision: 0,
});

export const formatDuration = (durationMillis?: number | null) => {
  if (!durationMillis || durationMillis <= 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(durationMillis / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const getImageUrl = (url: string) => {
  return `${Config.API_URL}${url}`;
};

export const isRentOrder = (carType?: string) => {
  const found = rentCarTypes.find(car => car.name === carType);

  return found ? true : false;
};

export const getMapRegion = ({
  origin,
  destination,
}: {
  origin: { latitude: number | string; longitude: number | string };
  destination: { latitude: number | string; longitude: number | string };
}): Region => {
  const originCoordinate = {
    latitude: origin?.latitude ? Number(origin?.latitude) : 47.92123,
    longitude: origin?.longitude ? Number(origin?.longitude) : 106.918556,
  };

  const destinationCoordinate = {
    latitude: destination?.latitude ? Number(destination?.latitude) : 47.92123,
    longitude: destination?.longitude
      ? Number(destination?.longitude)
      : 106.918556,
  };

  const minLat = Math.min(
    destinationCoordinate?.latitude,
    originCoordinate.latitude,
  );
  const maxLat = Math.max(
    destinationCoordinate.latitude,
    originCoordinate.latitude,
  );
  const minLon = Math.min(
    destinationCoordinate.longitude,
    originCoordinate.longitude,
  );
  const maxLon = Math.max(
    destinationCoordinate.longitude,
    originCoordinate.longitude,
  );

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
