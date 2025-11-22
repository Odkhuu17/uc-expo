import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, FitImage, OrderLocation } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';
import { useCreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import {
  SearchAddressQuery,
  useSearchAddressQuery,
} from '@/gql/query/searchAddressQuery.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSlice from '@/redux/slices/order';

const useStyles = makeStyles(theme => ({
  bottomView: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.xl2,
    borderTopLeftRadius: theme.borderRadii.xl2,
    borderTopRightRadius: theme.borderRadii.xl2,
    alignItems: 'center',
  },
}));

const ChooseOrderLocationScreen = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { orderLocation } = useAppSelector(state => state.order);

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
    if (orderLocation?.selected === 'origin') {
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
          selected: orderLocation?.selected || 'origin',
        })
      );

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

  return (
    <>
      <MapView
        style={css.map}
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
          flex={1}
          height={60}
          style={{
            transform: [{ translateY: -30 }],
          }}
          alignItems="center"
          justifyContent="center"
        >
          <FitImage source={require('assets/images/map_pin.png')} height={60} />
        </Box>
        <Box bottom={0} position="absolute" left={0} right={0}>
          <LinearGradient
            colors={['#003A91', '#1265FF']}
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
              selected={orderLocation?.selected || 'origin'}
              onPressOrigin={() =>
                dispatch(
                  orderSlice.actions.changeOrderLocation({
                    ...orderLocation,
                    selected: 'origin',
                  })
                )
              }
              onPressDestination={() =>
                dispatch(
                  orderSlice.actions.changeOrderLocation({
                    ...orderLocation,
                    selected: 'destination',
                  })
                )
              }
              loading={searchLoading}
            />
          </Box>
        </Box>
      </MapView>
    </>
  );
};

export default ChooseOrderLocationScreen;

const css = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
