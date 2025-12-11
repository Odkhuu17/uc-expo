import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { ArrowRight2, Location } from 'iconsax-react-nativejs';
import { debounce } from 'lodash';

import { Button, CustomBottomSheetModal, Input } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import {
  CreateAddressMutation,
  useCreateAddressMutation,
} from '@/gql/mutations/createAddressMutation.generated';
import {
  SearchAddressQuery,
  useSearchAddressQuery,
} from '@/gql/query/searchAddressQuery.generated';

interface Props {
  ref: RefObject<BottomSheetModal | null>;
  setCreatedLocation: Dispatch<
    SetStateAction<NonNullable<CreateAddressMutation['createAddress']> | null>
  >;
  location?: NonNullable<SearchAddressQuery['searchAddress']>[0];
}

const LocationModal = ({ ref, setCreatedLocation, location }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [address1, setAddress1] = useState('');

  const {
    data: searchData,
    loading: searchLoading,
    refetch,
  } = useSearchAddressQuery({
    variables: {
      query: address1,
      location: {
        latitude: location?._source?.location.lat || 47.92123,
        longitude: location?._source?.location.lon || 106.918556,
      },
    },
  });

  const [createAddress, { loading }] = useCreateAddressMutation();

  const onChangeSheet = (index: number) => {
    if (index !== -1) {
      setAddress1('');
    }
  };

  console.log('searchData', searchData);

  return (
    <CustomBottomSheetModal ref={ref} onChange={onChangeSheet}>
      <Box px="m">
        <Input
          placeholder="Хаягаа бичих"
          keyboardAvoiding
          autoFocus
          onChangeText={setAddress1}
          value={address1}
        />
      </Box>
      <BottomSheetScrollView>
        <Box
          style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          px="m"
          pt="m"
          gap="m"
        >
          {searchData?.searchAddress?.map((address, index) => {
            return (
              <TouchableOpacity key={index}>
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
      <Box px="m" style={{ paddingBottom: insets.bottom + theme.spacing.m }}>
        <Button title="Хадгалах" loading={loading} onPress={() => {}} />
      </Box>
    </CustomBottomSheetModal>
  );
};

export default LocationModal;
