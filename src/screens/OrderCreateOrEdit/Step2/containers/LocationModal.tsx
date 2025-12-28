import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Region } from 'react-native-maps';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight01Icon, Location05Icon } from '@hugeicons/core-free-icons';

import { Button, ModalBottomSheet, Input, Loader } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import {
  AddressSearchQuery,
  useAddressSearchQuery,
} from '@/gql/queries/addressSearch.generated';

interface Props {
  ref: RefObject<BottomSheetModal | null>;
  setLocation: Dispatch<
    SetStateAction<NonNullable<AddressSearchQuery['searchAddress']>[0] | null>
  >;
  location: NonNullable<AddressSearchQuery['searchAddress']>[0] | null;
  origin?: NonNullable<AddressSearchQuery['searchAddress']>[0] | null;
  mapRef: RefObject<MapView | null>;
  setShowChooseFromMap: Dispatch<SetStateAction<boolean>>;
  isRent?: boolean;
}

const LocationModal = ({
  ref,
  setLocation,
  location,
  origin,
  mapRef,
  setShowChooseFromMap,
  isRent,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [address1, setAddress1] = useState('');

  const { data: searchData, loading: searchLoading } = useAddressSearchQuery({
    variables: {
      query: address1,
      location: {
        latitude: location?._source?.location?.lat || 47.92123,
        longitude: location?._source?.location?.lon || 106.918556,
      },
    },
  });

  const onChangeSheet = (index: number) => {
    if (index !== -1) {
      setAddress1(location?._source?.nameMn || '');
    }
  };

  const onChooseFromMap = () => {
    ref.current?.dismiss();
    setShowChooseFromMap(true);
  };

  return (
    <ModalBottomSheet ref={ref} onChange={onChangeSheet}>
      <Box px="m">
        <Input
          clearButtonMode="always"
          placeholder="Хаягаа бичих"
          autoFocus
          onChangeText={setAddress1}
          value={address1}
        />
      </Box>
      <Box p="m">
        {!isRent && (
          <Button
            variant="outlined"
            title="Газрын зургаас сонгох"
            onPress={onChooseFromMap}
          />
        )}
      </Box>
      <BottomSheetScrollView>
        <Box
          style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          px="m"
          gap="m"
        >
          {searchLoading ? (
            <Loader />
          ) : (
            searchData?.searchAddress?.map((address, index) => {
              const onPressAddress = () => {
                setLocation(address);
                ref.current?.dismiss();

                const selectedCoordinate = {
                  latitude: address?._source?.location?.lat || 47.92123,
                  longitude: address?._source?.location?.lon || 106.918556,
                };

                const originCoordinate = origin
                  ? {
                      latitude: origin?._source?.location?.lat || 47.92123,
                      longitude: origin?._source?.location?.lon || 106.918556,
                    }
                  : null;

                if (originCoordinate) {
                  const minLat = Math.min(
                    selectedCoordinate.latitude,
                    originCoordinate.latitude,
                  );
                  const maxLat = Math.max(
                    selectedCoordinate.latitude,
                    originCoordinate.latitude,
                  );
                  const minLon = Math.min(
                    selectedCoordinate.longitude,
                    originCoordinate.longitude,
                  );
                  const maxLon = Math.max(
                    selectedCoordinate.longitude,
                    originCoordinate.longitude,
                  );

                  const latitudeDelta = Math.max((maxLat - minLat) * 1.8, 0.05);
                  const longitudeDelta = Math.max(
                    (maxLon - minLon) * 1.8,
                    0.05,
                  );

                  const region: Region = {
                    latitude: (minLat + maxLat) / 2,
                    longitude: (minLon + maxLon) / 2,
                    latitudeDelta,
                    longitudeDelta,
                  };

                  mapRef.current?.animateToRegion(region, 350);
                  return;
                }

                mapRef.current?.animateToRegion({
                  ...selectedCoordinate,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
              };

              return (
                <TouchableOpacity key={index} onPress={onPressAddress}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    borderBottomColor="border"
                    pb="m"
                  >
                    <Box
                      p="s"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                    >
                      <HugeiconsIcon
                        icon={Location05Icon}
                        size={theme.icon.s}
                      />
                    </Box>
                    <Box flex={1} gap="xs">
                      <Box flex={1}>
                        <Text variant="title" numberOfLines={1}>
                          {address?._source?.nameMn}
                        </Text>
                      </Box>
                      <Box flex={1}>
                        <Text variant="body2" color="grey4" numberOfLines={1}>
                          {address?._source?.nameFullMn}
                        </Text>
                      </Box>
                    </Box>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={theme.icon.m}
                    />
                  </Box>
                </TouchableOpacity>
              );
            })
          )}
        </Box>
      </BottomSheetScrollView>
    </ModalBottomSheet>
  );
};

export default LocationModal;
