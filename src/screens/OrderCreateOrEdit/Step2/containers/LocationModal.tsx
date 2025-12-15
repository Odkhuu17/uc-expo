import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ArrowRight2, Location } from 'iconsax-react-nativejs';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';

import { Button, CustomBottomSheetModal, Input } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import {
  SearchAddressQuery,
  useSearchAddressQuery,
} from '@/gql/query/searchAddressQuery.generated';

interface Props {
  ref: RefObject<BottomSheetModal | null>;
  setLocation: Dispatch<
    SetStateAction<NonNullable<SearchAddressQuery['searchAddress']>[0] | null>
  >;
  location: NonNullable<SearchAddressQuery['searchAddress']>[0] | null;
  mapRef: RefObject<MapView | null>;
  setShowChooseFromMap: Dispatch<SetStateAction<boolean>>;
}

const LocationModal = ({
  ref,
  setLocation,
  location,
  mapRef,
  setShowChooseFromMap,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [address1, setAddress1] = useState('');

  const { data: searchData } = useSearchAddressQuery({
    variables: {
      query: address1,
      location: {
        latitude: location?._source?.location.lat || 47.92123,
        longitude: location?._source?.location.lon || 106.918556,
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
    <CustomBottomSheetModal ref={ref} onChange={onChangeSheet}>
      <Box px="m">
        <Input
          placeholder="Хаягаа бичих"
          autoFocus
          onChangeText={setAddress1}
          value={address1}
        />
      </Box>
      <Box p="m">
        <Button
          backgroundColor="white"
          textColor="black"
          title="Газрын зургаас сонгох"
          onPress={onChooseFromMap}
        />
      </Box>
      <BottomSheetScrollView>
        <Box
          style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          px="m"
          gap="m"
        >
          {searchData?.searchAddress?.map((address, index) => {
            const onPressAddress = () => {
              setLocation(address);
              ref.current?.dismiss();
              mapRef.current?.animateToRegion({
                latitude: address?._source?.location.lat || 47.92123,
                longitude: address?._source?.location.lon || 106.918556,
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
                    backgroundColor="grey"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                  >
                    <Location size={theme.icon.s} />
                  </Box>
                  <Box flex={1} gap="xs">
                    <Box flex={1}>
                      <Text
                        variant="body1"
                        fontFamily="Roboto_500Medium"
                        numberOfLines={1}
                      >
                        {address?._source?.nameMn}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      <Text variant="body2" color="grey2" numberOfLines={1}>
                        {address?._source?.nameFullMn}
                      </Text>
                    </Box>
                  </Box>
                  <ArrowRight2 size={theme.icon.m} />
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </BottomSheetScrollView>
    </CustomBottomSheetModal>
  );
};

export default LocationModal;
