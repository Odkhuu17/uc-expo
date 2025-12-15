import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useInfiniteHits } from 'react-instantsearch';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, FitImage, OrderLocation } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';
import { carTypes, carTypes2 } from '@/constants';
import {
  CreateAddressMutation,
  useCreateAddressMutation,
} from '@/gql/mutations/createAddressMutation.generated';
import {
  SearchAddressQuery,
  useSearchAddressQuery,
} from '@/gql/query/searchAddressQuery.generated';
import { CarTypes, ChooseFromMap, MapPin } from './components';
import { LocationModal } from './containers';
import { createArc } from './helpers';

const PIN_HEIGHT = 60;

interface Props {
  isRent?: boolean;
  selectedCarTypes: string[];
  setSelectedCarTypes: Dispatch<SetStateAction<string[]>>;
  setStep: Dispatch<SetStateAction<number>>;
  origin: NonNullable<SearchAddressQuery['searchAddress']>[0] | null;
  setOrigin: Dispatch<
    SetStateAction<NonNullable<SearchAddressQuery['searchAddress']>[0] | null>
  >;
  destination: NonNullable<SearchAddressQuery['searchAddress']>[0] | null;
  setDestination: Dispatch<
    SetStateAction<NonNullable<SearchAddressQuery['searchAddress']>[0] | null>
  >;
  selectedLocation: 'origin' | 'destination';
  setSelectedLocation: Dispatch<SetStateAction<'origin' | 'destination'>>;
  setCreatedOrigin: Dispatch<
    SetStateAction<NonNullable<CreateAddressMutation['createAddress']> | null>
  >;
  setCreatedDestination: Dispatch<
    SetStateAction<NonNullable<CreateAddressMutation['createAddress']> | null>
  >;
  createdOrigin?: NonNullable<CreateAddressMutation['createAddress']> | null;
  createdDestination?: NonNullable<
    CreateAddressMutation['createAddress']
  > | null;
}

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

const Step2 = ({
  isRent,
  selectedCarTypes,
  setSelectedCarTypes,
  setStep,
  selectedLocation,
  setSelectedLocation,
  origin,
  setOrigin,
  destination,
  setDestination,
  setCreatedOrigin,
  setCreatedDestination,
  createdOrigin,
  createdDestination,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const originModalRef = useRef<BottomSheetModal | null>(null);
  const destinationModalRef = useRef<BottomSheetModal | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [showChooseFromMap, setShowChooseFromMap] = useState(false);

  const arcCoordinates = createArc(
    {
      latitude: origin?._source?.location.lat || 0,
      longitude: origin?._source?.location.lon || 0,
    },
    {
      latitude: destination?._source?.location.lat || 0,
      longitude: destination?._source?.location.lon || 0,
    }
  );

  const [createAddress, { loading: createLoading }] =
    useCreateAddressMutation();

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
    if (isRent) {
      const { data } = await refetch({
        query: '',
        location: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      });
      setOrigin(data?.searchAddress?.[0] || null);
      setCreatedOrigin(null);
    }
  };

  const onSubmit = async () => {
    if (!origin) {
      return router.navigate({
        pathname: '/modal',
        params: {
          type: 'error',
          message: isRent
            ? 'Та ажиллах байршлаа оруулна уу!'
            : 'Та очиж авах хаягаа оруулна уу!',
        },
      });
    } else if (!isRent && !destination) {
      return router.navigate({
        pathname: '/modal',
        params: {
          type: 'error',
          message: 'Та хүргэх хаягаа оруулна уу!',
        },
      });
    }

    const originQuarterId = origin?.quarter?.id || '';
    const originDistrictId = origin?.quarter?.district?.id || '';
    const originStateId = origin?.quarter?.district?.state?.id || '';

    const destinationQuarterId = destination?.quarter?.id || '';
    const destinationDistrictId = destination?.quarter?.district?.id || '';
    const destinationStateId = destination?.quarter?.district?.state?.id || '';

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
        sdq: [destinationStateId, destinationDistrictId, destinationQuarterId],
      },
    });
    setCreatedOrigin(originData?.createAddress || null);
    setCreatedDestination(destinationData?.createAddress || null);
    setStep(3);
  };

  const onPressOrigin = () => {
    setSelectedLocation('origin');
    originModalRef.current?.present();
  };

  const onPressDestination = () => {
    setSelectedLocation('destination');
    destinationModalRef.current?.present();
  };

  const { items, isLastPage, showMore } = useInfiniteHits({
    escapeHTML: false,
  });

  return (
    <>
      {!showChooseFromMap ? (
        <>
          <MapView
            style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: 47.92123,
              longitude: 106.918556,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            {!isRent && origin && destination && (
              <Polyline
                coordinates={arcCoordinates}
                strokeColor={theme.colors.baseBlue}
                strokeWidth={3}
              />
            )}
            {!isRent && origin && (
              <Marker
                coordinate={{
                  latitude: origin?._source?.location.lat || 0,
                  longitude: origin?._source?.location.lon || 0,
                }}
              >
                <Box
                  height={PIN_HEIGHT}
                  style={{
                    transform: [{ translateY: -13 }],
                  }}
                >
                  <FitImage
                    source={require('assets/images/map_pin.png')}
                    height={PIN_HEIGHT}
                  />
                </Box>
              </Marker>
            )}
            {!isRent && destination && (
              <Marker
                coordinate={{
                  latitude: destination?._source?.location.lat || 0,
                  longitude: destination?._source?.location.lon || 0,
                }}
              >
                <Box
                  height={PIN_HEIGHT}
                  style={{
                    transform: [{ translateY: -13 }],
                  }}
                >
                  <FitImage
                    source={require('assets/images/map_pin.png')}
                    height={PIN_HEIGHT}
                  />
                </Box>
              </Marker>
            )}
          </MapView>
          <Box
            flex={1}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems="center"
            justifyContent="center"
          >
            <Box position="absolute" top={theme.spacing.xl2} left={0}>
              <CarTypes
                setSelectedCarTypes={setSelectedCarTypes}
                selectedCarTypes={selectedCarTypes}
                carTypes={isRent ? carTypes2 : carTypes}
                title={
                  isRent
                    ? 'Техник түрээсийн төрөл сонгох'
                    : 'Ачааны машины төрөл сонгох'
                }
              />
            </Box>
            {isRent && <MapPin />}
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
                  insets.bottom +
                  theme.spacing.m +
                  theme.button.m +
                  theme.spacing.m
                }
                left={theme.spacing.xl}
                right={theme.spacing.xl}
              >
                <OrderLocation
                  isRent={isRent}
                  origin={
                    createdOrigin
                      ? createdOrigin.address1
                      : origin?._source?.nameFullMn
                  }
                  destination={
                    createdDestination
                      ? createdDestination.address1
                      : destination?._source?.nameFullMn
                  }
                  selected={selectedLocation}
                  onPressOrigin={onPressOrigin}
                  onPressDestination={onPressDestination}
                  loading={searchLoading}
                />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <ChooseFromMap
          title={
            selectedLocation === 'origin' ? 'Очиж авах хаяг' : 'Хүргэх хаяг'
          }
          location={selectedLocation === 'origin' ? origin : destination}
          setLocation={
            selectedLocation === 'origin' ? setOrigin : setDestination
          }
          setShowChooseFromMap={setShowChooseFromMap}
        />
      )}
      <LocationModal
        ref={originModalRef}
        setLocation={setOrigin}
        location={origin}
        mapRef={mapRef}
        setShowChooseFromMap={setShowChooseFromMap}
      />
      <LocationModal
        ref={destinationModalRef}
        setLocation={setDestination}
        location={destination}
        mapRef={mapRef}
        setShowChooseFromMap={setShowChooseFromMap}
      />
    </>
  );
};

export default Step2;
