import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteHits, useRefinementList } from 'react-instantsearch-core';
import { Image, Platform } from 'react-native';

import { BottomContainer, Button, MapDirections, MapPin } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';
import { rentCarTypes, deliveryCarTypes } from '@/constants/transportTypes';
import CarTypes from './components/CarTypes';
import {
  AddressCreateMutation,
  useAddressCreateMutation,
} from '@/gql/mutations/addressCreate.generated';
import { INavigation } from '@/navigations';
import OrderLocationContainer from '../components/OrderLocationContainer';
import SingleLocation from '../containers/SingleLocation';
import { getMapRegion } from '@/utils/helpers';
import { useAddressSearchLazyQuery } from '@/gql/queries/addressSearch.generated';

interface Props {
  isRent?: boolean;
  setStep: Dispatch<SetStateAction<number>>;
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
  origin?: {
    lat: number;
    lng: number;
    address: string;
  };
  destination?: {
    lat: number;
    lng: number;
    address: string;
  };
  setOrigin: Dispatch<
    SetStateAction<
      | {
          lat: number;
          lng: number;
          address: string;
        }
      | undefined
    >
  >;
  setDestination: Dispatch<
    SetStateAction<
      | {
          lat: number;
          lng: number;
          address: string;
        }
      | undefined
    >
  >;
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
  img: {
    width: '100%',
    height: '100%',
  },
}));

const Step2 = ({
  isRent,
  setStep,
  origin,
  destination,
  setOrigin,
  setDestination,
  setCreatedOrigin,
  setCreatedDestination,
}: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<INavigation>();
  const styles = useStyles();
  const mapRef = useRef<MapView | null>(null);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>(
    isRent
      ? rentCarTypes.map(ct => ct.name)
      : deliveryCarTypes.map(ct => ct.name),
  );

  const [createAddress, { loading: createLoading }] =
    useAddressCreateMutation();

  const [searchData, { loading }] = useAddressSearchLazyQuery();

  const { items } = useInfiniteHits({
    escapeHTML: false,
  });

  // Use refinement list to filter by taxon name
  const { items: taxonFacets, refine: refineTaxon } = useRefinementList({
    attribute: 'taxon.name',
    operator: 'or', // Use OR operator for multiple selections
  });

  // Sync selectedCarTypes with refinement list
  useEffect(() => {
    // Get currently refined items
    const currentRefined = taxonFacets
      .filter(facet => facet.isRefined)
      .map(facet => facet.value);

    // Find items to add (in selectedCarTypes but not refined)
    const toAdd = selectedCarTypes.filter(
      type => !currentRefined.includes(type),
    );

    // Find items to remove (refined but not in selectedCarTypes)
    const toRemove = currentRefined.filter(
      type => !selectedCarTypes.includes(type),
    );

    // Apply changes only if needed (batch updates in single render)
    if (toAdd.length > 0 || toRemove.length > 0) {
      [...toAdd, ...toRemove].forEach(name => {
        refineTaxon(name);
      });
    }
  }, [selectedCarTypes]); // Use join to avoid array reference changes

  useEffect(() => {
    if (!isRent) {
      if (origin && destination) {
        const region = getMapRegion({
          origin: {
            latitude: origin?.lat || 47.92123,
            longitude: origin?.lng || 106.918556,
          },
          destination: {
            latitude: destination?.lat || 47.92123,
            longitude: destination?.lng || 106.918556,
          },
        });

        mapRef?.current?.animateToRegion(region, 350);
      } else if (origin) {
        const originCoordinate = {
          latitude: origin?.lat || 47.92123,
          longitude: origin?.lng || 106.918556,
        };

        mapRef?.current?.animateToRegion({
          ...originCoordinate,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }
  }, [origin, destination, mapRef, isRent]);

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

    const { data: originData } = await createAddress({
      variables: {
        address1: origin?.address || '',
        location: {
          latitude: origin?.lat || 0,
          longitude: origin?.lng || 0,
        },
      },
    });

    const { data: destinationData } = await createAddress({
      variables: {
        address1: destination?.address || '',
        location: {
          latitude: destination?.lat || 0,
          longitude: destination?.lng || 0,
        },
      },
    });
    setCreatedOrigin(originData?.createAddress || null);
    setCreatedDestination(destinationData?.createAddress || null);
    setStep(3);
  };

  const onRegionChangeComplete = async (region: Region) => {
    if (isRent) {
      const { data } = await searchData({
        variables: {
          query: '',
          location: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
        },
      });

      setOrigin({
        lat: region.latitude,
        lng: region.longitude,
        address: data?.searchAddress?.[0]?._source.nameMn || '',
      });
    }
  };

  console.log(origin)

  return (
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
        {items?.map(item => {
          return (
            <Marker
              key={item?.id}
              coordinate={{
                latitude: Number(item.location?.lat),
                longitude: Number(item.location?.lon),
              }}
            >
              <Box
                width={40}
                height={40}
                borderRadius="full"
                backgroundColor="white"
                borderWidth={2}
                borderColor="primary"
              >
                <Image
                  source={
                    isRent
                      ? rentCarTypes?.find(i => i.name === item?.taxon?.name)
                          ?.image
                      : deliveryCarTypes?.find(
                          i => i.name === item?.taxon?.name,
                        )?.image
                  }
                  resizeMode="contain"
                  style={styles.img}
                />
              </Box>
            </Marker>
          );
        })}
        {!isRent && origin && destination && (
          <MapDirections
            origin={{
              latitude: origin?.lat || 0,
              longitude: origin?.lng || 0,
            }}
            destination={{
              latitude: destination?.lat || 0,
              longitude: destination?.lng || 0,
            }}
          />
        )}
        {!isRent && origin && (
          <Marker
            coordinate={{
              latitude: origin?.lat || 47.92123,
              longitude: origin?.lng || 106.918556,
            }}
            title="Очиж авах хаяг"
          >
            <MapPin title="Очиж авах хаяг" />
          </Marker>
        )}
        {!isRent && destination && (
          <Marker
            coordinate={{
              latitude: destination?.lat || 0,
              longitude: destination?.lng || 0,
            }}
            title="Хүргэх хаяг"
          >
            {Platform.OS === 'ios' && <MapPin title="Хүргэх хаяг" />}
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
        {isRent && <MapPin title="Ажиллах байршил" />}
        <Box bottom={0} position="absolute" left={0} right={0}>
          <BottomContainer>
            <Box gap="m">
              <OrderLocationContainer
                location1={
                  <SingleLocation
                    loading={loading}
                    setLocation={setOrigin}
                    location={origin}
                    isRent={isRent}
                    title={isRent ? 'Ажиллах байршил' : 'Очиж авах хаяг'}
                  />
                }
                location2={
                  isRent ? undefined : (
                    <SingleLocation
                      setLocation={setDestination}
                      location={destination}
                      title="Хүргэх хаяг"
                      isRent={isRent}
                    />
                  )
                }
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
  );
};

export default Step2;
