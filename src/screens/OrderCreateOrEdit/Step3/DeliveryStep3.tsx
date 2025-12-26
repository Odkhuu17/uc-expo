import { useTheme } from '@shopify/restyle';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useRef } from 'react';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CalendarDownload01Icon,
  Clock01Icon,
  ContainerTruck01Icon,
  PackageIcon,
  WeightIcon,
} from '@hugeicons/core-free-icons';

import {
  BoxContainer,
  Button,
  Checkbox,
  CustomKeyboardAvoidingView,
  Input,
  ContentScrollable,
  Select,
  InputDate,
  InputMask,
  InputTextArea,
} from '@/components';
import { Box, Text } from '@/components/Theme';
import { deliveryCarTypes, packageTypes } from '@/constants/transportTypes';
import { moneyMask } from '@/utils/helpers';
import { CreateAddressMutation } from '@/gql/mutations/createAddress.generated';
import { OrderLocation } from '../components';
import { ImageObject } from '@/gql/graphql';
import InputImage from './containers/InputImage';
import Images from './containers/Images';
import InputVideo from './containers/InputVideo';
import InputAudio from './containers/InputAudio';
import { GetTaxonsQuery } from '@/gql/queries/getTaxons.generated';

interface Props {
  setSelectedLocation: Dispatch<SetStateAction<'origin' | 'destination'>>;
  createdOrigin?: NonNullable<CreateAddressMutation['createAddress']> | null;
  createdDestination?: NonNullable<
    CreateAddressMutation['createAddress']
  > | null;
  audio: string | null;
  imageObjects: ImageObject[];
  video: string | null;
  setAudio: Dispatch<SetStateAction<string | null>>;
  setImageObjects: Dispatch<SetStateAction<ImageObject[]>>;
  setVideo: Dispatch<SetStateAction<string | null>>;
  formik: ReturnType<typeof useFormik<any>>;
  setStep: Dispatch<SetStateAction<number>>;
  number?: string;
  orderNumber: string;
  taxonsData?: GetTaxonsQuery['taxons'];
}

const DeliveryStep3 = ({
  setSelectedLocation,
  createdOrigin,
  createdDestination,
  audio,
  imageObjects,
  video,
  formik,
  setStep,
  setAudio,
  setImageObjects,
  setVideo,
  number,
  orderNumber,
  taxonsData,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const refs = useRef<(TextInput | null)[]>([]);

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

  const onChangeCarType = (value: string) => {
    setFieldValue('carType', value);
    setFieldValue('carWeight', '');
    if (taxonsData) {
      const selectedTaxon = taxonsData?.edges?.find(
        taxon => taxon?.node?.name === value,
      );
      if (selectedTaxon) {
        setFieldValue('taxonId', selectedTaxon?.node?.id || '');
      }
    }
  };

  const onSubmitEditing = (index: number) => {
    if (refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <ContentScrollable edges={[]}>
        <Box gap="s">
          <OrderLocation
            origin={createdOrigin?.address1}
            destination={createdDestination?.address1}
            onPressOrigin={onPressOrigin}
            onPressDestination={onPressDestination}
          />
          <BoxContainer gap="m">
            <Text variant="label">Зураг</Text>
            <Box flexDirection="row" alignItems="center">
              <InputImage
                number={number || orderNumber}
                setImageObject={setImageObjects}
              />
              <Images
                number={number || orderNumber}
                setImageObjects={setImageObjects}
                imageObjects={imageObjects}
              />
            </Box>
          </BoxContainer>
          <BoxContainer gap="m">
            <InputVideo
              label="Бичлэг"
              video={video}
              setVideo={setVideo}
              number={number || orderNumber}
            />
          </BoxContainer>
          <BoxContainer gap="m">
            <InputAudio
              label="Дуу"
              audio={audio}
              setAudio={setAudio}
              number={number || orderNumber}
            />
          </BoxContainer>
          <BoxContainer gap="m">
            <Select
              label="Ачааны төрөл"
              icon={PackageIcon}
              placeholder="Ачааны төрөл"
              options={packageTypes.map(p => ({
                label: p,
                value: p,
              }))}
              selectedOption={values.packageType}
              setSelectedOption={handleChange('packageType')}
              error={
                touched.packageType && errors.packageType
                  ? errors.packageType
                  : undefined
              }
            />
            <Select
              label="Техникийн төрөл"
              icon={ContainerTruck01Icon}
              placeholder="Техникийн төрөл"
              options={deliveryCarTypes.map(p => ({
                label: p.name,
                value: p.name,
                image: p.image,
              }))}
              selectedOption={values.carType}
              setSelectedOption={onChangeCarType}
            />
            <Input
              icon={WeightIcon}
              label="Ачааны жин (тн)"
              placeholder="Ачааны жин (тн)"
              keyboardType="number-pad"
              value={values.packageWeight}
              onBlur={handleBlur('packageWeight')}
              onChangeText={handleChange('packageWeight')}
              returnKeyType="next"
              error={
                touched.packageWeight && errors.packageWeight
                  ? errors.packageWeight
                  : undefined
              }
            />
            <InputDate
              icon={CalendarDownload01Icon}
              label="Ачих өдөр"
              value={values.travelDay}
              placeholder="Ачих өдөр"
              onBlur={handleBlur('travelDay')}
              onChange={handleChange('travelDay')}
              returnKeyType="next"
              error={
                touched.travelDay && errors.travelDay
                  ? errors.travelDay
                  : undefined
              }
            />
            <InputDate
              icon={Clock01Icon}
              label="Ачих цаг"
              keyboardType="number-pad"
              value={values.travelHour}
              mode="time"
              placeholder="Ачих цаг"
              onBlur={handleBlur('travelHour')}
              onChange={handleChange('travelHour')}
              returnKeyType="next"
              error={
                touched.travelHour && errors.travelHour
                  ? errors.travelHour
                  : undefined
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
              <InputMask
                label="Ачуулах үнэ"
                placeholder="Ачуулах үнэ"
                keyboardType="number-pad"
                value={values.price}
                onBlur={handleBlur('price')}
                onSubmitEditing={() => onSubmitEditing(1)}
                returnKeyType="next"
                onChangeText={(_, unmasked) => handleChange('price')(unmasked)}
                ref={(el: TextInput | null) => (refs.current[1] = el)}
                mask={moneyMask}
                error={touched.price && errors.price ? errors.price : undefined}
              />
            )}
          </BoxContainer>
          <BoxContainer gap="m">
            <InputTextArea
              label="Нэмэлт мэдээлэл"
              placeholder="Ачааны нэмэлт мэдээлэл болон тоо ширхэгээ бичнэ үү!"
              value={values.additionalInfo}
              onBlur={handleBlur('additionalInfo')}
              onChangeText={handleChange('additionalInfo')}
              returnKeyType="next"
              ref={(el: TextInput | null) => (refs.current[2] = el)}
              onSubmitEditing={() => onSubmitEditing(2)}
              error={
                touched.additionalInfo && errors.additionalInfo
                  ? errors.additionalInfo
                  : undefined
              }
            />
          </BoxContainer>
          <BoxContainer gap="m">
            <Input
              label="Илгээгчийн нэр"
              placeholder="Илгээгчийн нэр"
              value={values.senderName}
              onBlur={handleBlur('senderName')}
              onChangeText={handleChange('senderName')}
              returnKeyType="next"
              ref={(el: TextInput | null) => (refs.current[3] = el)}
              onSubmitEditing={() => onSubmitEditing(3)}
              error={
                touched.senderName && errors.senderName
                  ? errors.senderName
                  : undefined
              }
            />
            <Input
              label="Илгээгчийн утасны дугаар"
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              value={values.senderMobile}
              onBlur={handleBlur('senderMobile')}
              onChangeText={handleChange('senderMobile')}
              returnKeyType="next"
              ref={(el: TextInput | null) => (refs.current[4] = el)}
              onSubmitEditing={() => onSubmitEditing(4)}
              error={
                touched.senderMobile && errors.senderMobile
                  ? errors.senderMobile
                  : undefined
              }
            />
            <InputTextArea
              label="Очих авах хаягийн дэлгэрэнгүй"
              placeholder="Очих авах хаягийн дэлгэрэнгүй"
              value={values.additionalAddressOrigin}
              onBlur={handleBlur('additionalAddressOrigin')}
              onChangeText={handleChange('additionalAddressOrigin')}
              error={
                touched.additionalAddressOrigin &&
                errors.additionalAddressOrigin
                  ? errors.additionalAddressOrigin
                  : undefined
              }
            />
          </BoxContainer>
          <BoxContainer gap="m">
            <Input
              label="Хүлээн авагчийн нэр"
              placeholder="Хүлээн авагчийн нэр"
              value={values.receiverName}
              onBlur={handleBlur('receiverName')}
              onChangeText={handleChange('receiverName')}
              returnKeyType="next"
              ref={(el: TextInput | null) => (refs.current[5] = el)}
              onSubmitEditing={() => onSubmitEditing(5)}
              error={
                touched.receiverName && errors.receiverName
                  ? errors.receiverName
                  : undefined
              }
            />
            <Input
              label="Хүлээн авагчийн утасны дугаар"
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              value={values.receiverMobile}
              onBlur={handleBlur('receiverMobile')}
              onChangeText={handleChange('receiverMobile')}
              ref={(el: TextInput | null) => (refs.current[6] = el)}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              error={
                touched.receiverMobile && errors.receiverMobile
                  ? errors.receiverMobile
                  : undefined
              }
            />
            <InputTextArea
              label="Хүргэх хаягийн дэлгэрэнгүй"
              placeholder="Хүргэх хаягийн дэлгэрэнгүй"
              value={values.additionalAddressDestination}
              onBlur={handleBlur('additionalAddressDestination')}
              onChangeText={handleChange('additionalAddressDestination')}
              error={
                touched.additionalAddressDestination &&
                errors.additionalAddressDestination
                  ? errors.additionalAddressDestination
                  : undefined
              }
            />
          </BoxContainer>
        </Box>
      </ContentScrollable>
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

export default DeliveryStep3;
