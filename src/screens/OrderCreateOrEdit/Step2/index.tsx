import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { useInfiniteHits } from 'react-instantsearch';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { BottomContainer, Button } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';
import { rentCarTypes, deliveryCarTypes } from '@/constants/transportTypes';
import { CarTypes, ChooseFromMap, MapPin } from './components';
import { createArc } from './helpers';
import {
  AddressCreateMutation,
  useAddressCreateMutation,
} from '@/gql/mutations/addressCreate.generated';
import {
  AddressSearchQuery,
  useAddressSearchQuery,
} from '@/gql/queries/addressSearch.generated';
import { INavigation } from '@/navigations';
import { OrderLocation } from '../components';
import LocationModal from './containers/LocationModal';

interface Props {
  isRent?: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  origin: NonNullable<AddressSearchQuery['searchAddress']>[0] | null;
  setOrigin: Dispatch<
    SetStateAction<NonNullable<AddressSearchQuery['searchAddress']>[0] | null>
  >;
  destination: NonNullable<AddressSearchQuery['searchAddress']>[0] | null;
  setDestination: Dispatch<
    SetStateAction<NonNullable<AddressSearchQuery['searchAddress']>[0] | null>
  >;
  selectedLocation: 'origin' | 'destination';
  setSelectedLocation: Dispatch<SetStateAction<'origin' | 'destination'>>;
  setCreatedOrigin: Dispatch<
    SetStateAction<NonNullable<AddressCreateMutation['createAddress']> | null>
  >;
  setCreatedDestination: Dispatch<
    SetStateAction<NonNullable<AddressCreateMutation['createAddress']> | null>
  >;
  createdOrigin?: NonNullable<AddressCreateMutation['createAddress']> | null;
  createdDestination?: NonNullable<
    AddressCreateMutation['createAddress']
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
  const theme = useTheme();
  const navigation = useNavigation<INavigation>();
  const styles = useStyles();
  const originModalRef = useRef<BottomSheetModal | null>(null);
  const destinationModalRef = useRef<BottomSheetModal | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [showChooseFromMap, setShowChooseFromMap] = useState(false);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>(
    isRent
      ? rentCarTypes.map(ct => ct.name)
      : deliveryCarTypes.map(ct => ct.name),
  );

  const arcCoordinates = createArc(
    {
      latitude: origin?._source?.location.lat || 0,
      longitude: origin?._source?.location.lon || 0,
    },
    {
      latitude: destination?._source?.location.lat || 0,
      longitude: destination?._source?.location.lon || 0,
    },
  );

  const [createAddress, { loading: createLoading }] =
    useAddressCreateMutation();

  const {
    data: searchData,
    loading: searchLoading,
    refetch,
  } = useAddressSearchQuery({
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
      return navigation.navigate('MsgModal', {
        type: 'error',
        msg: isRent
          ? 'Та ажиллах байршлаа оруулна уу!'
          : 'Та очиж авах хаягаа оруулна уу!',
      });
    } else if (!isRent && !destination) {
      return navigation.navigate('MsgModal', {
        type: 'error',
        msg: 'Та хүргэх хаягаа оруулна уу!',
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

  // const { items, isLastPage, showMore } = useInfiniteHits({
  //   escapeHTML: false,
  // });

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
                strokeColor={theme.colors.primary}
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
                <MapPin isMarker />
              </Marker>
            )}
            {!isRent && destination && (
              <Marker
                coordinate={{
                  latitude: destination?._source?.location.lat || 0,
                  longitude: destination?._source?.location.lon || 0,
                }}
              >
                <MapPin isMarker />
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
                carTypes={isRent ? rentCarTypes : deliveryCarTypes}
                title={
                  isRent
                    ? 'Техник түрээсийн төрөл сонгох'
                    : 'Техникийн төрөл сонгох'
                }
              />
            </Box>
            {isRent && <MapPin />}
            <Box bottom={0} position="absolute" left={0} right={0}>
              <BottomContainer>
                <Box gap="m">
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
                  <Button
                    loading={createLoading}
                    title="Үргэлжүүлэх"
                    onPress={onSubmit}
                  />
                </Box>
              </BottomContainer>
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
        isRent={isRent}
      />
      <LocationModal
        ref={destinationModalRef}
        setLocation={setDestination}
        location={destination}
        mapRef={mapRef}
        setShowChooseFromMap={setShowChooseFromMap}
        isRent={isRent}
      />
    </>
  );
};

export default Step2;
