import { useTheme } from '@shopify/restyle';
import { useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import {
  ArchiveBox,
  Box as BoxIcon,
  Calendar,
  Clock,
  TruckFast,
} from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Masks } from 'react-native-mask-input';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BoxContainer,
  Button,
  Checkbox,
  CustomKeyboardAvoidingView,
  CustomMaskInput,
  DateInput,
  Input,
  OrderInput,
  OrderLocation,
  ScrollableContent,
  Select,
  TextArea,
} from '@/components';
import { Box, Text } from '@/components/Theme';
import { carTypes, packageTypes } from '@/constants';
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

const DeliveryStep3 = ({
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

  const onSubmitEditing = (index: number) => {
    if (refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <CustomKeyboardAvoidingView noWrapper>
      <Box flex={1}>
        <ScrollableContent edges={[]}>
          <Box gap="s">
            <OrderLocation
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
                icon={BoxIcon}
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
                icon={TruckFast}
                placeholder="Техникийн төрөл"
                options={carTypes.map(p => ({
                  label: p.name,
                  value: p.name,
                }))}
                selectedOption={values.carType}
                setSelectedOption={handleChange('carType')}
              />
              <OrderInput
                icon={ArchiveBox}
                label="Ачааны жин (тн)"
                keyboardType="number-pad"
                value={values.packageWeight}
                onBlur={handleBlur('packageWeight')}
                onChangeText={handleChange('packageWeight')}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[0] = el)}
                onSubmitEditing={() => onSubmitEditing(0)}
                error={
                  touched.packageWeight && errors.packageWeight
                    ? errors.packageWeight
                    : undefined
                }
              />
              <DateInput
                icon={Calendar}
                label="Ачих өдөр"
                keyboardType="number-pad"
                value={values.travelDay}
                placeholder="YYYY/MM/DD"
                onBlur={handleBlur('travelDay')}
                onChangeText={handleChange('travelDay')}
                returnKeyType="next"
                onSubmitEditing={() => onSubmitEditing(1)}
                ref={(el: TextInput | null) => (refs.current[1] = el)}
                error={
                  touched.travelDay && errors.travelDay
                    ? errors.travelDay
                    : undefined
                }
                mask={Masks.DATE_YYYYMMDD}
              />
              <DateInput
                icon={Clock}
                label="Ачих цаг"
                keyboardType="number-pad"
                value={values.travelHour}
                placeholder="HH:mm"
                onBlur={handleBlur('travelHour')}
                onChangeText={handleChange('travelHour')}
                onSubmitEditing={() => onSubmitEditing(2)}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[2] = el)}
                error={
                  touched.travelHour && errors.travelHour
                    ? errors.travelHour
                    : undefined
                }
                mask={[/[0-2]/, /\d/, ':', /[0-5]/, /\d/]}
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
                  placeholder="Ачуулах үнэ"
                  keyboardType="number-pad"
                  value={values.price}
                  onBlur={handleBlur('price')}
                  onSubmitEditing={() => onSubmitEditing(3)}
                  returnKeyType="next"
                  onChangeText={(_, unmasked) =>
                    handleChange('price')(unmasked)
                  }
                  ref={(el: TextInput | null) => (refs.current[3] = el)}
                  error={
                    touched.price && errors.price ? errors.price : undefined
                  }
                  mask={moneyMask}
                />
              )}
            </BoxContainer>
            <BoxContainer gap="m">
              <TextArea
                placeholder="Ачааны нэмэлт мэдээлэл болон тоо ширхэгээ бичнэ үү!"
                value={values.additionalInfo}
                onBlur={handleBlur('additionalInfo')}
                onChangeText={handleChange('additionalInfo')}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[4] = el)}
                onSubmitEditing={() => onSubmitEditing(4)}
                error={
                  touched.additionalInfo && errors.additionalInfo
                    ? errors.additionalInfo
                    : undefined
                }
              />
            </BoxContainer>
            <BoxContainer gap="m">
              <Text variant="body2" fontFamily="Roboto_500Medium">
                Илгээгчийн мэдээлэл
              </Text>
              <Input
                placeholder="Овог нэр"
                value={values.senderName}
                onBlur={handleBlur('senderName')}
                onChangeText={handleChange('senderName')}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[5] = el)}
                onSubmitEditing={() => onSubmitEditing(5)}
                error={
                  touched.senderName && errors.senderName
                    ? errors.senderName
                    : undefined
                }
              />
              <Input
                placeholder="Утасны дугаар"
                keyboardType="number-pad"
                value={values.senderMobile}
                onBlur={handleBlur('senderMobile')}
                onChangeText={handleChange('senderMobile')}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[6] = el)}
                onSubmitEditing={() => onSubmitEditing(6)}
                error={
                  touched.senderMobile && errors.senderMobile
                    ? errors.senderMobile
                    : undefined
                }
              />
            </BoxContainer>
            <BoxContainer gap="m">
              <Text variant="body2" fontFamily="Roboto_500Medium">
                Хүлээн авагчийн мэдээлэл
              </Text>
              <Input
                placeholder="Овог нэр"
                value={values.receiverName}
                onBlur={handleBlur('receiverName')}
                onChangeText={handleChange('receiverName')}
                returnKeyType="next"
                ref={(el: TextInput | null) => (refs.current[7] = el)}
                onSubmitEditing={() => onSubmitEditing(7)}
                error={
                  touched.receiverName && errors.receiverName
                    ? errors.receiverName
                    : undefined
                }
              />
              <Input
                placeholder="Утасны дугаар"
                keyboardType="number-pad"
                value={values.receiverMobile}
                onBlur={handleBlur('receiverMobile')}
                onChangeText={handleChange('receiverMobile')}
                ref={(el: TextInput | null) => (refs.current[8] = el)}
                error={
                  touched.receiverMobile && errors.receiverMobile
                    ? errors.receiverMobile
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
      </Box>
    </CustomKeyboardAvoidingView>
  );
};

export default DeliveryStep3;
