import { useTheme } from '@shopify/restyle';
import { useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import { ArchiveBox, Calendar, Clock, TruckFast } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Masks } from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BoxContainer,
  Button,
  Checkbox,
  CustomKeyboardAvoidingView,
  CustomMaskInput,
  DateInput,
  OrderInput,
  OrderLocation,
  ScrollableContent,
  Select,
  TextArea,
} from '@/components';
import { Box } from '@/components/Theme';
import { carTypes2 } from '@/constants';
import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { moneyMask } from '@/utils/helpers';
import {
  OrderAudio,
  OrderAudioPlayer,
  OrderImageButton,
  OrderImages,
  OrderVideo,
  OrderVideoButton,
} from './components';

interface Props {
  setSelectedLocation: Dispatch<SetStateAction<'origin' | 'destination'>>;
  createdOrigin?: NonNullable<CreateAddressMutation['createAddress']> | null;
  createdDestination?: NonNullable<
    CreateAddressMutation['createAddress']
  > | null;
  audio: string;
  images: string[];
  video: string;
  setAudio: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<string[]>>;
  setVideo: Dispatch<SetStateAction<string>>;
  formik: ReturnType<typeof useFormik<any>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const RentStep3 = ({
  setSelectedLocation,
  createdOrigin,
  createdDestination,
  audio,
  images,
  video,
  formik,
  setStep,
  setAudio,
  setImages,
  setVideo,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { number } = useLocalSearchParams();

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
  } = formik;

  const onPressOrigin = () => {
    setStep(2);
    setSelectedLocation('origin');
  };

  const onPressDestination = () => {
    setStep(2);
    setSelectedLocation('destination');
  };

  useEffect(() => {
    setFieldValue('carWeight', '');
  }, [createdDestination]);

  return (
    <CustomKeyboardAvoidingView>
      <ScrollableContent edges={[]}>
        <Box gap="s">
          <OrderLocation
            isRent
            origin={createdOrigin?.address1}
            destination={createdDestination?.address1}
            onPressOrigin={onPressOrigin}
            onPressDestination={onPressDestination}
          />
          <BoxContainer
            flexDirection="row"
            justifyContent="space-between"
            gap="s"
          >
            <Box flex={1}>
              <OrderAudio setAudio={setAudio} audio={audio} />
            </Box>
            <Box flex={1}>
              <OrderImageButton setImages={setImages} />
            </Box>
            <Box flex={1}>
              <OrderVideoButton setVideo={setVideo} />
            </Box>
          </BoxContainer>
          {audio && <OrderAudioPlayer audio={audio} setAudio={setAudio} />}
          {video && <OrderVideo video={video} setVideo={setVideo} />}
          {images.length > 0 && (
            <OrderImages images={images} setImages={setImages} />
          )}
          <BoxContainer gap="m">
            <Select
              icon={TruckFast}
              placeholder="Техникийн төрөл"
              options={carTypes2.map(p => ({
                label: p.name,
                value: p.name,
              }))}
              selectedOption={values.carType}
              setSelectedOption={handleChange('carType')}
            />
            <Select
              icon={ArchiveBox}
              placeholder="Даац/Хэмжээ"
              options={
                carTypes2
                  .find(c => c.name === values.carType)
                  ?.options?.map(p => ({
                    label: p,
                    value: p,
                  })) || []
              }
              selectedOption={values.carWeight}
              setSelectedOption={handleChange('carWeight')}
              error={
                touched.carWeight && errors.carWeight
                  ? errors.carWeight
                  : undefined
              }
            />
            <DateInput
              icon={Calendar}
              label="Ажил эхлэх өдөр"
              keyboardType="number-pad"
              value={values.startDate}
              placeholder="YYYY/MM/DD"
              onBlur={handleBlur('startDate')}
              onChangeText={handleChange('startDate')}
              error={
                touched.startDate && errors.startDate
                  ? errors.startDate
                  : undefined
              }
              mask={Masks.DATE_YYYYMMDD}
            />
            <OrderInput
              icon={Calendar}
              label="Ажиллах хоног"
              keyboardType="number-pad"
              value={values.rentDay}
              onBlur={handleBlur('rentDay')}
              onChangeText={handleChange('rentDay')}
              error={
                touched.rentDay && errors.rentDay ? errors.rentDay : undefined
              }
            />
            <OrderInput
              icon={Clock}
              label="Ажиллах цаг"
              keyboardType="number-pad"
              value={values.motHour}
              onBlur={handleBlur('motHour')}
              onChangeText={handleChange('motHour')}
              error={
                touched.motHour && errors.motHour ? errors.motHour : undefined
              }
            />
          </BoxContainer>
          <BoxContainer gap="m">
            <Box flexDirection="row" justifyContent="space-between">
              <Checkbox
                label="НӨАТ"
                value={values.vatIncluded}
                onChange={val => setFieldValue('vatIncluded', val)}
              />
              <Checkbox
                label="Үнэ тохирно"
                value={values.priceNegotiable}
                onChange={val => setFieldValue('priceNegotiable', val)}
              />
            </Box>
            {!values.priceNegotiable && (
              <CustomMaskInput
                placeholder="Үнэ"
                keyboardType="number-pad"
                value={values.price}
                onBlur={handleBlur('price')}
                onChangeText={(_, unmasked) => handleChange('price')(unmasked)}
                error={touched.price && errors.price ? errors.price : undefined}
                mask={moneyMask}
              />
            )}
          </BoxContainer>
          <BoxContainer gap="m">
            <TextArea
              placeholder="Дэлгэрэнгүй хаяг"
              value={values.additionalAddress}
              onBlur={handleBlur('additionalAddress')}
              onChangeText={handleChange('additionalAddress')}
              error={
                touched.additionalAddress && errors.additionalAddress
                  ? errors.additionalAddress
                  : undefined
              }
            />
            <TextArea
              placeholder="Нэмэлт мэдээлэл"
              value={values.additionalInfo}
              onBlur={handleBlur('additionalInfo')}
              onChangeText={handleChange('additionalInfo')}
              error={
                touched.additionalInfo && errors.additionalInfo
                  ? errors.additionalInfo
                  : undefined
              }
            />
          </BoxContainer>
        </Box>
      </ScrollableContent>
      <Box px="m" style={{ paddingBottom: insets.bottom + theme.spacing.m }}>
        <Button
          title={number ? 'Захиалга засах' : 'Захиалга үүсгэх'}
          onPress={handleSubmit}
          loading={isSubmitting}
        />
      </Box>
    </CustomKeyboardAvoidingView>
  );
};

export default RentStep3;
