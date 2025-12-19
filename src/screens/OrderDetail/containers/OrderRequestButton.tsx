import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useRouter } from 'expo-router';

import {
  Button,
  CustomBottomSheetModal,
  Input,
  MessageModal,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useCreateDeliveryRequestMutation } from '@/gql/mutations/createDeliveryRequestMutation.generated';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';

interface Props {
  data: GetOrderQuery['order'];
  refetch: () => void;
}

const schema = yup.object().shape({
  price: yup.string().required('Энэ талбар хоосон байна!'),
  travelAt: yup.string(),
});

const OrderRequestButton = ({ data, refetch }: Props) => {
  const [createDeliveryRequest, { loading }] =
    useCreateDeliveryRequestMutation();
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);

  const onPress = () => {
    ref.current?.present();
  };

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      price: data?.price ? `${data?.price}` : '0',
      travelAt: data?.travelAt
        ? dayjs(data?.travelAt).format('YYYY/MM/DD')
        : dayjs().format('YYYY/MM/DD'),
    },
    validationSchema: schema,
    onSubmit: async () => {
      await createDeliveryRequest({
        variables: {
          orderId: data?.id!,
          price: values?.price ? Number(values?.price) : 0,
          travelAt: dayjs(values?.travelAt) || dayjs().format('YYYY-MM-DD'),
        },
      })
        .then(() => {
          return router.navigate({
            pathname: '/modal',
            params: {
              type: 'success',
              message: 'Таны хүсэлт амжилттай илгээгдлээ',
            },
          });
        })
        .finally(() => {
          ref.current?.dismiss();
        });
    },
  });

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  return (
    <>
      <Button title="Хүсэлт илгээх" loading={loading} onPress={onPress} />
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        onChange={onChangeSheet}
      >
        <BottomSheetView>
          <Box
            style={{ paddingBottom: insets.bottom + theme.spacing.m }}
            px="m"
            pt="m"
            gap="m"
          >
            <Input
              label="Үнэ"
              placeholder="Үнэ"
              keyboardAvoiding
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              keyboardType="number-pad"
              value={values.price}
              error={touched.price && errors.price ? errors.price : undefined}
            />
            <Button
              title="Хүсэлт илгээх"
              loading={loading}
              onPress={handleSubmit}
            />
          </Box>
        </BottomSheetView>
      </CustomBottomSheetModal>
      <MessageModal
        type="success"
        message="Таны хүсэлт амжилттай илгээгдлээ"
        onClose={() => {
          refetch();
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default OrderRequestButton;
