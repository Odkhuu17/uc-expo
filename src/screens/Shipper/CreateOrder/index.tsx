import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import {
  ArchiveBox,
  Box as BoxIcon,
  Calendar,
  Clock,
  TruckFast,
} from 'iconsax-react-nativejs';
import { useEffect, useState } from 'react';
import { Masks } from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
  BoxContainer,
  Button,
  Checkbox,
  Content,
  CustomKeyboardAvoidingView,
  CustomMaskInput,
  DateInput,
  Input,
  MessageModal,
  NormalHeader,
  OrderLocation,
  Select,
  TextArea,
} from '@/components';
import { Box, Text } from '@/components/Theme';
import { carTypes, carTypes2, packageTypes } from '@/constants';
import { useCreateOrderMutation } from '@/gql/mutations/createOrderMutation.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSlice from '@/redux/slices/order';
import { audioToFile, imagesToFiles, videoToFile } from '@/utils/fileHelpers';
import { isRentOrder, moneyMask } from '@/utils/helpers';
import OrderAudio from './OrderAudio';
import OrderAudioPlayer from './OrderAudioPlayer';
import OrderImageButton from './OrderImageButton';
import OrderImages from './OrderImages';
import OrderVideo from './OrderVideo';
import OrderVideoButton from './OrderVideoButton';

const schema = yup.object().shape({
  packageType: yup.string().required('Энэ талбар хоосон байна!'),
  travelHour: yup.string().required('Энэ талбар хоосон байна!'),
  travelTime: yup.string().required('Энэ талбар хоосон байна!'),
  receiverName: yup.string().required('Энэ талбар хоосон байна!'),
  receiverMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
  senderName: yup.string(),
  senderMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
  price: yup.string().when('priceNegotiable', {
    is: false,
    then: schema => schema.required('Энэ талбар хоосон байна!'),
    otherwise: schema => schema,
  }),
});

const CreateOrderScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [successModal, setSuccessModal] = useState(false);
  const [audio, setAudio] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState('');

  const [createOrder, { loading }] = useCreateOrderMutation();
  const { order } = useAppSelector(state => state.order);
  const { orderLocation } = useAppSelector(state => state.order);
  const { carType } = useAppSelector(state => state.order);

  const isRent = isRentOrder(carType);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      packageType: '',
      travelHour: '',
      travelTime: '',
      vatIncluded: false,
      priceNegotiable: false,
      price: '',
      quantity: '',
      additionalInfo: '',
      receiverName: '',
      receiverMobile: '',
      senderName: '',
      senderMobile: '',
      packageWeight: '',
      carWeight: '',
      motTime: '',
      workDay: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      const imageFiles = images.length > 0 ? imagesToFiles(images) : [];
      const videoFile = video ? videoToFile(video) : null;
      const audioFile = audio ? audioToFile(audio) : null;

      await createOrder({
        variables: {
          originId: orderLocation?.origin?.id,
          destinationId: orderLocation?.destination?.id,
          packageType: values.packageType,
          receiverName: values.receiverName,
          receiverMobile: values.receiverMobile,
          senderName: values.senderName,
          senderMobile: values.senderMobile,
          travelAt: dayjs(`${values.travelHour} ${values.travelTime}`),
          price: values.priceNegotiable ? undefined : values.price,
          published: true,
          carWeight: isRent ? values.carWeight : undefined,
          data: {
            quantity: values.quantity,
            additionalInfo: values.additionalInfo,
            packageWeight: values.packageWeight,
          },
          vatIncluded: values.vatIncluded,
          images: imageFiles.length > 0 ? imageFiles : undefined,
          video: videoFile,
          audio: audioFile,
        },
      });

      setSuccessModal(true);
      dispatch(orderSlice.actions.changeOrder());
      dispatch(orderSlice.actions.changeOrderLocation());
    },
  });

  useEffect(() => {
    if (order) {
      Object.keys(order).forEach(key => {
        if (key in values) {
          setFieldValue(key, order[key as keyof typeof order]);
        }
      });

      setVideo(order.video || '');
      setAudio(order.audio || '');
      setImages(order.images || []);
    }
  }, [order]);

  useEffect(() => {
    setFieldValue('carWeight', '');
  }, [carType]);

  const onPressOrigin = () => {
    router.back();
    dispatch(
      orderSlice.actions.changeOrder({ ...values, images, audio, video })
    );
    dispatch(orderSlice.actions.changeSelectedLocation('origin'));
  };

  const onPressDestination = () => {
    router.back();
    dispatch(
      orderSlice.actions.changeOrder({ ...values, images, audio, video })
    );
    dispatch(orderSlice.actions.changeSelectedLocation('destination'));
  };

  return (
    <>
      <Box flex={1}>
        <NormalHeader title="Захиалга үүсгэх" hasBack />
        <CustomKeyboardAvoidingView noWrapper>
          <Content edges={[]} scrollable>
            <Box gap="s">
              <OrderLocation
                origin={orderLocation?.origin?.address1}
                destination={orderLocation?.destination?.address1}
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
                  <OrderImageButton images={images} setImages={setImages} />
                </Box>
                <Box flex={1}>
                  <OrderVideoButton video={video} setVideo={setVideo} />
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
                  placeholder="Машины төрөл"
                  options={[...carTypes, ...carTypes2].map(p => ({
                    label: p.name,
                    value: p.name,
                  }))}
                  selectedOption={carType}
                  setSelectedOption={value =>
                    dispatch(orderSlice.actions.changeCarType(value))
                  }
                />
                {isRent && (
                  <Select
                    icon={ArchiveBox}
                    placeholder="Даац/Хэмжээ"
                    options={
                      carTypes2
                        .find(c => c.name === carType)
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
                )}
                <DateInput
                  icon={Calendar}
                  label="Ачих өдөр"
                  keyboardType="number-pad"
                  value={values.travelHour}
                  placeholder="YYYY/MM/DD"
                  onBlur={handleBlur('travelHour')}
                  onChangeText={handleChange('travelHour')}
                  error={
                    touched.travelHour && errors.travelHour
                      ? errors.travelHour
                      : undefined
                  }
                  mask={Masks.DATE_YYYYMMDD}
                />
                <DateInput
                  icon={Clock}
                  label="Ачих цаг"
                  keyboardType="number-pad"
                  value={values.travelTime}
                  placeholder="HH:mm"
                  onBlur={handleBlur('travelTime')}
                  onChangeText={handleChange('travelTime')}
                  error={
                    touched.travelTime && errors.travelTime
                      ? errors.travelTime
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
                    onChangeText={(_, unmasked) =>
                      handleChange('price')(unmasked)
                    }
                    error={
                      touched.price && errors.price ? errors.price : undefined
                    }
                    mask={moneyMask}
                  />
                )}
              </BoxContainer>
              <BoxContainer gap="m">
                {!isRent && (
                  <Input
                    placeholder="Тоо ширхэг"
                    keyboardType="number-pad"
                    value={values.quantity}
                    onBlur={handleBlur('quantity')}
                    onChangeText={handleChange('quantity')}
                    error={
                      touched.quantity && errors.quantity
                        ? errors.quantity
                        : undefined
                    }
                  />
                )}
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
              {!isRent && (
                <>
                  <BoxContainer gap="m">
                    <Text variant="body2" fontFamily="Roboto_500Medium">
                      Илгээгчийн мэдээлэл
                    </Text>
                    <Input
                      placeholder="Овог нэр"
                      value={values.senderName}
                      onBlur={handleBlur('senderName')}
                      onChangeText={handleChange('senderName')}
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
                      error={
                        touched.receiverMobile && errors.receiverMobile
                          ? errors.receiverMobile
                          : undefined
                      }
                    />
                  </BoxContainer>
                </>
              )}
            </Box>
          </Content>
        </CustomKeyboardAvoidingView>
        <Box px="m" style={{ paddingBottom: insets.bottom + theme.spacing.m }}>
          <Button
            title="Захиалга үүсгэх"
            onPress={handleSubmit}
            loading={loading}
          />
        </Box>
      </Box>
      <MessageModal
        type="success"
        message="Захиалга амжилттай үүслээ"
        onClose={() => {
          router.dismissAll();
          router.navigate('/profile/orders');
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default CreateOrderScreen;
