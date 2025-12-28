import { useEffect, useRef } from 'react';
import GetLocation from 'react-native-get-location';

import { useAppSelector } from '@/redux/hooks';
import { useFeedLocationMutation } from '@/gql/mutations/feedLocation.generated';
import { useGetFeedTrucksQuery } from '@/gql/queries/getFeedTrucks.generated';

const LOCATION_INTERVAL = 30000; // 30 seconds

const useFeedLocation = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { data } = useGetFeedTrucksQuery({
    skip: !isAuthenticated,
  });
  const [feedLocation] = useFeedLocationMutation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (
      isAuthenticated &&
      data?.me?.trucks?.length &&
      data?.me?.trucks?.filter(i => i.subscribed).length > 0
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
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      const trucks = data?.me?.trucks?.filter(i => i.subscribed) || [];

      for (let i = 0; i < trucks.length; i++) {
        await feedLocation({
          variables: {
            truckId: trucks[i].id,
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });
      }

      console.log('Location sent:', trucks.length);
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  const init = async () => {
    await sendLocation();

    intervalRef.current = setInterval(() => {
      sendLocation();
    }, LOCATION_INTERVAL);
  };
};

export default useFeedLocation;
