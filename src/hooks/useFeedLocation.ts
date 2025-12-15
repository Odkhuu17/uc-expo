import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';

import { useFeedLocationMutation } from '@/gql/mutations/feedLocation.generated';
import { useGetMyTrucksQuery } from '@/gql/query/getMyTrucks.generated';
import { useAppSelector } from '@/redux/hooks';

const LOCATION_INTERVAL = 60000; // 60 seconds

const useFeedLocation = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { data } = useGetMyTrucksQuery({
    skip: !isAuthenticated,
  });
  const [feedLocation] = useFeedLocationMutation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (
      isAuthenticated &&
      data?.me?.trucks &&
      data?.me?.trucks?.filter(i => i.verified).length > 0
    ) {
      init();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data, isAuthenticated]);

  const sendLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const trucks = data?.me?.trucks?.filter(i => i.verified) || [];

      for (let i = 0; i < trucks.length; i++) {
        await feedLocation({
          variables: {
            truckId: trucks[i].id,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      }

      console.log('Location sent:', trucks.length);
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  const init = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return;
    }

    await sendLocation();

    intervalRef.current = setInterval(() => {
      sendLocation();
    }, LOCATION_INTERVAL);
  };
};

export default useFeedLocation;
