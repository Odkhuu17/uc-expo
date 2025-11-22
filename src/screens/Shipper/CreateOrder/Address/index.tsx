import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import { ArrowLeft2, Location, SearchNormal } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
    Button,
    CustomBottomSheetModal,
    CustomFlatList,
    CustomKeyboardAvoidingView,
    FitImage,
    Input,
    Marquee,
    TextArea,
} from '@/components';
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
  title: string;
  onSave: Dispatch<
    SetStateAction<CreateAddressMutation['createAddress'] | undefined>
  >;
  addressData?: CreateAddressMutation['createAddress'];
}

const schema = yup.object().shape({
  address2: yup.string().required('Энэ талбар хоосон байна!'),
});

const Address = ({ title, onSave, addressData }: Props) => {
  const [modal, setModal] = useState(false);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const [address1, setAddress1] = useState('');
  const mapRef = useRef<MapView | null>(null);

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

  const [createAddress, { loading: createLoading }] =
    useCreateAddressMutation();

  const onRegionChangeComplete = (region: Region) => {
    refetch({
      query: '',
      location: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        address2: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        const firstResult = searchData?.searchAddress?.[0];
        const quarterId = firstResult?.quarter?.id;
        const districtId = firstResult?.quarter?.district?.id;
        const stateId = firstResult?.quarter?.district?.state?.id;

        if (quarterId && districtId && stateId) {
          const { data } = await createAddress({
            variables: {
              address1: firstResult?._source?.nameFullMn,
              address2: values.address2,
              location: {
                latitude: firstResult?._source?.location.lat,
                longitude: firstResult?._source?.location.lon,
              },
              sdq: [stateId, districtId, quarterId],
            },
          });

          if (data?.createAddress) {
            onSave(data.createAddress);
            bottomSheetModalRef.current?.dismiss();
          }
        }
      },
    });

  useEffect(() => {
    if (searchData?.searchAddress && searchData.searchAddress.length > 0) {
      const firstResult = searchData.searchAddress[0];

      setAddress1(firstResult?._source?.nameFullMn || '');
    }
  }, [searchData]);

  const renderItem = ({
    item,
  }: {
    item: NonNullable<SearchAddressQuery['searchAddress']>[number];
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAddress1(item?._source?.nameFullMn || '');
          const newLocation = {
            latitude: item?._source?.location?.lat || 0,
            longitude: item?._source?.location?.lon || 0,
          };

          mapRef.current?.animateToRegion(
            {
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            },
            1000
          );

          setModal(false);
        }}
      >
        <Box flexDirection="row" gap="s" alignItems="center" py="xs">
          <Location size={theme.icon.m} />
          <Box flex={1}>
            <Text>{item?._source?.nameFullMn}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const onChangeSearchText = (text: string) => {
    refetch({
      query: text,
    });
  };

  return (
    <>
      <Box gap="xs" flexDirection="row" alignItems="center">
        <Box gap="xs" flex={1}>
          <Text variant="label">Ачих хаяг</Text>
          {addressData && (
            <>
              <Text variant="body3">
                {addressData?.state?.name} / {addressData?.district?.name} /
                {addressData?.quarter?.name}
              </Text>
              {addressData?.address1 && (
                <Text variant="body3">{addressData?.address1}</Text>
              )}
              {addressData?.address2 && (
                <Text variant="body3" color="grey2">
                  {addressData?.address2}
                </Text>
              )}
            </>
          )}
        </Box>
        <TouchableOpacity
          onPress={() => bottomSheetModalRef.current?.present()}
        >
          <Box p="s" borderRadius="s" borderWidth={1} borderColor="border">
            <Location size={theme.icon.m} />
          </Box>
        </TouchableOpacity>
      </Box>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        topInset={undefined}
        handleStyle={{ display: 'none' }}
      >
        <CustomKeyboardAvoidingView>
          <MapView
            ref={mapRef}
            style={css.map}
            initialRegion={{
              latitude: 47.92123,
              longitude: 106.918556,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
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
              <FitImage
                source={require('assets/images/map_pin.png')}
                height={60}
              />
            </Box>
          </MapView>
          <Box style={{ paddingBottom: insets.bottom }}>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              <Box
                flexDirection="row"
                gap="s"
                alignItems="center"
                borderBottomWidth={1}
                borderColor="border"
                p="m"
              >
                <ArrowLeft2 size={theme.icon.m} />
                <Text>{title}</Text>
              </Box>
            </TouchableOpacity>
            <Box p="m" gap="m">
              <Box>
                <Text variant="label" mb="xs">
                  Сонгосон хаяг
                </Text>
                <TouchableOpacity onPress={() => setModal(true)}>
                  <Box
                    height={40}
                    borderRadius="xl"
                    borderColor="border"
                    borderWidth={1}
                    backgroundColor="white"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Box ml="s">
                      <SearchNormal
                        size={theme.icon.m}
                        color={theme.colors.grey2}
                      />
                    </Box>
                    <Box px="s" flex={1}>
                      <Marquee duration={5000}>
                        <Text paddingRight="xl">{address1}</Text>
                      </Marquee>
                    </Box>
                  </Box>
                </TouchableOpacity>
              </Box>
              <TextArea
                placeholder="Нэмэлт мэдээлэл"
                height={80}
                value={values.address2}
                onChangeText={handleChange('address2')}
                onBlur={handleBlur('address2')}
                error={
                  touched.address2 && errors.address2
                    ? errors.address2
                    : undefined
                }
              />
              <Button
                title="Хадгалах"
                loading={createLoading}
                onPress={handleSubmit}
              />
            </Box>
          </Box>
        </CustomKeyboardAvoidingView>
      </CustomBottomSheetModal>
      <Modal visible={modal} animationType="slide">
        <TouchableOpacity onPress={() => setModal(false)}>
          <Box
            px="m"
            pb="m"
            gap="s"
            flexDirection="row"
            alignItems="center"
            style={{ paddingTop: insets.top + theme.spacing.m }}
          >
            <ArrowLeft2 size={theme.icon.m} />
            <Text>Байршил хайх</Text>
          </Box>
        </TouchableOpacity>
        <Box px="m">
          <Input placeholder="Байршил хайх" onChangeText={onChangeSearchText} />
        </Box>
        <CustomFlatList
          data={searchData?.searchAddress}
          renderItem={renderItem}
          loading={searchLoading}
        />
      </Modal>
    </>
  );
};

const css = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Address;
