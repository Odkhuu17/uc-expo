import { useTheme } from '@shopify/restyle';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CalendarSetting01Icon,
  ContainerTruck01Icon,
  TimeSetting01Icon,
  WeightIcon,
  WorkHistoryIcon,
} from '@hugeicons/core-free-icons';

import {
  BoxContainer,
  Button,
  Checkbox,
  CustomKeyboardAvoidingView,
  Input,
  InputDate,
  ContentScrollable,
  Select,
  InputTextArea,
  InputMask,
} from '@/components';
import { Box } from '@/components/Theme';
import { rentCarTypes } from '@/constants/transportTypes';
import { moneyMask } from '@/utils/helpers';
import { CreateAddressMutation } from '@/gql/mutations/createAddress.generated';
import { OrderLocation } from '../components';
import InputImage from './containers/InputImage';
import Images from './containers/Images';
import InputVideo from './containers/InputVideo';
import InputAudio from './containers/InputAudio';
import { ImageObject } from '@/gql/graphql';
import InputLabel from '@/components/InputLabel';
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
  number?: string | null;
  orderNumber: string;
  taxonsData?: GetTaxonsQuery['taxons'];
}

const RentStep3 = ({
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

  return (
    <CustomKeyboardAvoidingView>
      <ContentScrollable edges={[]}>
        <Box gap="s">
          <OrderLocation
            isRent
            origin={createdOrigin?.address1}
            destination={createdDestination?.address1}
            onPressOrigin={onPressOrigin}
          />
          <BoxContainer gap="m">
            <InputLabel label="Зураг" />
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
              icon={ContainerTruck01Icon}
              placeholder="Техникийн төрөл"
              options={rentCarTypes.map(p => ({
                label: p.name,
                value: p.name,
                image: p.image,
              }))}
              selectedOption={values.carType}
              setSelectedOption={value => onChangeCarType(value)}
            />
            <Select
              icon={WeightIcon}
              placeholder="Даац/Хэмжээ"
              options={
                rentCarTypes
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
            <InputDate
              icon={CalendarSetting01Icon}
              label="Ажил эхлэх өдөр"
              keyboardType="number-pad"
              value={values.startDate}
              placeholder="YАжил эхлэх өдөр"
              onBlur={handleBlur('startDate')}
              onChangeText={handleChange('startDate')}
              error={
                touched.startDate && errors.startDate
                  ? errors.startDate
                  : undefined
              }
            />
            <Input
              icon={WorkHistoryIcon}
              label="Ажиллах хоног"
              keyboardType="number-pad"
              value={values.rentDay}
              onBlur={handleBlur('rentDay')}
              onChangeText={handleChange('rentDay')}
              error={
                touched.rentDay && errors.rentDay ? errors.rentDay : undefined
              }
            />
            <Input
              icon={TimeSetting01Icon}
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
              <InputMask
                placeholder="Үнэ"
                keyboardType="number-pad"
                value={values.price}
                onBlur={handleBlur('price')}
                onChangeText={(_, unmasked) => handleChange('price')(unmasked)}
                mask={moneyMask}
                error={touched.price && errors.price ? errors.price : undefined}
              />
            )}
          </BoxContainer>
          <BoxContainer gap="m">
            <InputTextArea
              label="Дэлгэрэнгүй хаяг"
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
            <InputTextArea
              label="Нэмэлт мэдээлэл"
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

export default RentStep3;
