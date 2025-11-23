import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, OrderLocation } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';
import { useCreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import {
  SearchAddressQuery,
  useSearchAddressQuery,
} from '@/gql/query/searchAddressQuery.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSlice from '@/redux/slices/order';
import CarTypes from './CarTypes';
import CarTypes2 from './CarTypes2';
import MapPin from './MapPin';
import MenuButton from './MenuButton';

const useStyles = makeStyles(theme => ({
  bottomView: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.xl2,
    borderTopLeftRadius: theme.borderRadii.xl2,
    borderTopRightRadius: theme.borderRadii.xl2,
    alignItems: 'center',
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ChooseOrderLocationScreen = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector(state => state.order);

  const [origin, setOrigin] = useState<
    NonNullable<SearchAddressQuery['searchAddress']>[0] | null
  >(null);
  const [destination, setDestination] = useState<
    NonNullable<SearchAddressQuery['searchAddress']>[0] | null
  >(null);

  const {
    data: searchData,
    loading: searchLoading,
    refetch,
  } = useSearchAddressQuery({
    variables: {
      query: '',
      location: { latitude: 47.92123, longitude: 106.918556 },
    },
  });

  useEffect(() => {
    if (!origin) {
      setOrigin(searchData?.searchAddress?.[0] || null);
    }
  }, [searchData]);

  const onRegionChangeComplete = async (region: Region) => {
    const { data } = await refetch({
      query: '',
      location: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
    if (selectedLocation === 'origin') {
      setOrigin(data?.searchAddress?.[0] || null);
    } else {
      setDestination(data?.searchAddress?.[0] || null);
    }
  };

  const [createAddress, { loading: createLoading }] =
    useCreateAddressMutation();

  const onSubmit = async () => {
    if (origin && destination) {
      const originQuarterId = origin?.quarter?.id || '';
      const originDistrictId = origin?.quarter?.district?.id || '';
      const originStateId = origin?.quarter?.district?.state?.id || '';

      const destinationQuarterId = destination?.quarter?.id || '';
      const destinationDistrictId = destination?.quarter?.district?.id || '';
      const destinationStateId =
        destination?.quarter?.district?.state?.id || '';

      const { data: originData } = await createAddress({
        variables: {
          address1: origin?._source?.nameFullMn || '',
          location: {
            latitude: origin?._source?.location.lat || 0,
            longitude: origin?._source?.location.lon || 0,
          },
          sdq: [originStateId, originDistrictId, originQuarterId],
        },
      });

      const { data: destinationData } = await createAddress({
        variables: {
          address1: destination?._source?.nameFullMn || '',
          location: {
            latitude: destination?._source?.location.lat || 0,
            longitude: destination?._source?.location.lon || 0,
          },
          sdq: [
            destinationStateId,
            destinationDistrictId,
            destinationQuarterId,
          ],
        },
      });

      dispatch(
        orderSlice.actions.changeOrderLocation({
          origin: originData?.createAddress,
          destination: destinationData?.createAddress,
        })
      );

      dispatch(orderSlice.actions.changeSelectedLocation('origin'));

      router.navigate('/shipper/orders/create');
    } else {
      router.navigate({
        pathname: '/modal',
        params: {
          type: 'error',
          message: 'Та очиж авах хаяг болон хүргэх хаягаа оруулна уу!',
        },
      });
    }
  };

  const onPressOrigin = () => {
    dispatch(orderSlice.actions.changeSelectedLocation('origin'));
  };

  const onPressDestination = () => {
    dispatch(orderSlice.actions.changeSelectedLocation('destination'));
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.92123,
          longitude: 106.918556,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Box
          position="absolute"
          top={insets.top + theme.spacing.m}
          left={0}
          gap="m"
        >
          <MenuButton />
          <CarTypes />
        </Box>
        <Box
          position="absolute"
          top={insets.top + theme.spacing.m}
          right={0}
          gap="m"
        >
          <Box height={100} />
          <CarTypes2 />
        </Box>
        <MapPin />
        <Box bottom={0} position="absolute" left={0} right={0}>
          <LinearGradient
            colors={theme.gradients.primary}
            style={[
              styles.bottomView,
              { paddingBottom: theme.spacing.m + insets.bottom },
            ]}
          >
            <Button
              loading={createLoading}
              textColor="black"
              backgroundColor="lightBlue"
              title="Захиалгыг үргэжлүүлэх"
              onPress={onSubmit}
            />
          </LinearGradient>
          <Box
            position="absolute"
            bottom={
              insets.bottom + theme.spacing.m + theme.button.m + theme.spacing.m
            }
            left={theme.spacing.xl}
            right={theme.spacing.xl}
          >
            <OrderLocation
              origin={origin?._source?.nameFullMn}
              destination={destination?._source?.nameFullMn}
              selected={selectedLocation || 'origin'}
              onPressOrigin={onPressOrigin}
              onPressDestination={onPressDestination}
              loading={searchLoading}
            />
          </Box>
        </Box>
      </MapView>
    </>
  );
};

export default ChooseOrderLocationScreen;
