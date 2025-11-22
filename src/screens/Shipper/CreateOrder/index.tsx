import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import {
  Box as BoxIcon,
  Calendar,
  Clock,
  Image,
  Microphone2,
  VideoPlay,
} from 'iconsax-react-nativejs';
import { useState } from 'react';
import { Masks } from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
  BoxContainer,
  Button,
  Content,
  CustomKeyboardAvoidingView,
  CustomMaskInput,
  DateInput,
  Input,
  MessageModal,
  NormalHeader,
  OrderLocation,
  Select,
} from '@/components';
import { Box } from '@/components/Theme';
import { packageType } from '@/constants';
import { useCreateOrderMutation } from '@/gql/mutations/createOrderMutation.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderSlice from '@/redux/slices/order';
import { moneyMask } from '@/utils/helpers';
import OrderIconButton from './OrderIconButton';

const schema = yup.object().shape({
  title: yup.string().required('Энэ талбар хоосон байна!'),
  packageType: yup.string().required('Энэ талбар хоосон байна!'),
  packageWeight: yup.number().required('Энэ талбар хоосон байна!'),
  packageDimensions: yup.number().required('Энэ талбар хоосон байна!'),
  receiverName: yup.string().required('Энэ талбар хоосон байна!'),
  receiverMobile: yup.string().required('Энэ талбар хоосон байна!'),
  senderName: yup.string().required('Энэ талбар хоосон байна!'),
  senderMobile: yup.string().required('Энэ талбар хоосон байна!'),
  price: yup.number().required('Энэ талбар хоосон байна!'),
});

const CreateOrderScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useAppDispatch();

  const [createOrder, { loading }] = useCreateOrderMutation();

  const { orderLocation } = useAppSelector(state => state.order);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        title: '',
        packageType: '',
        packageWeight: '',
        packageDimensions: '',
        receiverName: '',
        receiverMobile: '',
        senderName: '',
        senderMobile: '',
        travelAt: '',
        price: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        await createOrder({
          variables: {
            originId: orderLocation?.origin?.id,
            destinationId: orderLocation?.destination?.id,
            title: values.title,
            packageType: values.packageType,
            packageWeight: Number(values.packageWeight),
            packageDimensions: Number(values.packageDimensions),
            receiverName: values.receiverName,
            receiverMobile: values.receiverMobile,
            senderName: values.senderName,
            senderMobile: values.senderMobile,
            travelAt: dayjs(values.travelAt),
            price: values.price,
            published: true,
          },
        });

        setSuccessModal(true);
      },
    });

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
                onPressOrigin={() => {
                  router.back();
                  dispatch(
                    orderSlice.actions.changeOrderLocation({
                      ...orderLocation,
                      selected: 'origin',
                    })
                  );
                }}
                onPressDestination={() => {
                  router.back();
                  dispatch(
                    orderSlice.actions.changeOrderLocation({
                      ...orderLocation,
                      selected: 'destination',
                    })
                  );
                }}
              />
              <BoxContainer
                flexDirection="row"
                justifyContent="space-between"
                gap="s"
              >
                <Box flex={1}>
                  <OrderIconButton
                    icon={Microphone2}
                    title="Дуу хоолой нэмэх"
                  />
                </Box>
                <Box flex={1}>
                  <OrderIconButton icon={Image} title="Зураг нэмэх" />
                </Box>
                <Box flex={1}>
                  <OrderIconButton icon={VideoPlay} title="Бичлэг нэмэх" />
                </Box>
              </BoxContainer>
              <BoxContainer gap="m">
                <Select
                  icon={BoxIcon}
                  placeholder="Ачааны төрөл"
                  options={packageType.map(p => ({
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
                <DateInput
                  icon={Calendar}
                  label="Ачих өдөр"
                  keyboardType="number-pad"
                  value={values.travelAt}
                  placeholder="YYYY/MM/DD"
                  onBlur={handleBlur('travelAt')}
                  onChangeText={handleChange('travelAt')}
                  error={
                    touched.travelAt && errors.travelAt
                      ? errors.travelAt
                      : undefined
                  }
                  mask={Masks.DATE_YYYYMMDD}
                />
                <DateInput
                  icon={Clock}
                  label="Ачих цаг"
                  keyboardType="number-pad"
                  value={values.travelAt}
                  placeholder="HH:mm"
                  onBlur={handleBlur('travelAt')}
                  onChangeText={handleChange('travelAt')}
                  error={
                    touched.travelAt && errors.travelAt
                      ? errors.travelAt
                      : undefined
                  }
                  mask={[/[0-2]/, /\d/, ':', /[0-5]/, /\d/]}
                />
              </BoxContainer>
              <BoxContainer gap="m">
                <Input
                  label="Илгээгчийн нэр"
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
                  label="Илгээгчийн утас"
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
                <Input
                  label="Хүлээн авагчийн нэр"
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
                  label="Хүлээн авагчийн утас"
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
              <BoxContainer gap="m">
                <CustomMaskInput
                  label="Захиалгын үнэ"
                  unit="MNT"
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
              </BoxContainer>
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
