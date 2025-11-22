import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
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
  Input,
  MessageModal,
  NormalHeader,
} from '@/components';
import { Box } from '@/components/Theme';
import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { useCreateOrderMutation } from '@/gql/mutations/createOrderMutation.generated';
import { moneyMask } from '@/utils/helpers';
import Address from './Address';

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

  const [createOrder, { loading }] = useCreateOrderMutation();
  const [origin, setOrigin] = useState<
    CreateAddressMutation['createAddress'] | undefined
  >();
  const [destination, setDestination] = useState<
    CreateAddressMutation['createAddress'] | undefined
  >();

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
        if (origin && destination) {
          await createOrder({
            variables: {
              destinationId: destination.id,
              originId: origin.id,
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
        } else {
          router.push({
            pathname: '/modal',
            params: {
              type: 'error',
              message: 'Та ачаа буулгах болон авах хаягаа оруулна уу!',
            },
          });
        }
      },
    });

  return (
    <>
      <Box flex={1}>
        <NormalHeader title="Захиалга үүсгэх" hasBack />
        <CustomKeyboardAvoidingView noWrapper>
          <Content edges={[]} scrollable>
            <Box gap="s">
              <BoxContainer gap="m">
                <Address
                  title="Ачих хаяг"
                  onSave={setOrigin}
                  addressData={origin}
                />
                <Address
                  title="Буулах хаяг"
                  onSave={setDestination}
                  addressData={destination}
                />
              </BoxContainer>
              <BoxContainer gap="m">
                <Input
                  label="Захиалгын утга"
                  value={values.title}
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  error={
                    touched.title && errors.title ? errors.title : undefined
                  }
                />
                <Input
                  label="Ачааны төрөл"
                  value={values.packageType}
                  onBlur={handleBlur('packageType')}
                  onChangeText={handleChange('packageType')}
                  error={
                    touched.packageType && errors.packageType
                      ? errors.packageType
                      : undefined
                  }
                />
                <Input
                  label="Ачааны жин"
                  unit="кг"
                  value={values.packageWeight}
                  keyboardType="numeric"
                  onBlur={handleBlur('packageWeight')}
                  onChangeText={handleChange('packageWeight')}
                  error={
                    touched.packageWeight && errors.packageWeight
                      ? errors.packageWeight
                      : undefined
                  }
                />
                <Input
                  label="Ачааны эзэлхүүн"
                  unit="м3"
                  keyboardType="number-pad"
                  value={values.packageDimensions}
                  onBlur={handleBlur('packageDimensions')}
                  onChangeText={handleChange('packageDimensions')}
                  error={
                    touched.packageDimensions && errors.packageDimensions
                      ? errors.packageDimensions
                      : undefined
                  }
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
                  label="Огноо"
                  keyboardType="number-pad"
                  value={values.travelAt}
                  onBlur={handleBlur('travelAt')}
                  onChangeText={handleChange('travelAt')}
                  error={
                    touched.travelAt && errors.travelAt
                      ? errors.travelAt
                      : undefined
                  }
                  mask={Masks.DATE_YYYYMMDD}
                />
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
