import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Button, ModalBottomSheet, Input, ModalMsg } from '@/components';
import { Box, useTheme } from '@/components/Theme';
import {
  GetOrderDetailQuery,
  GetOrderDetailDocument,
} from '@/gql/queries/getOrderDetail.generated';
import { INavigation } from '@/navigations';
import { useCreateDeliveryRequestMutation } from '@/gql/mutations/createDeliveryRequest.generated';

interface Props {
  data: GetOrderDetailQuery['order'];
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
  const navigation = useNavigation<INavigation>();
  const [successModal, setSuccessModal] = useState(false);

  const onPress = () => {
    ref.current?.present();
  };

  const handleCloseSuccessModal = () => {
    refetch();
    setSuccessModal(false);
  };

  const formatNumberWithCommas = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      price: data?.price ? formatNumberWithCommas(`${data?.price}`) : '0',
      travelAt: data?.travelAt
        ? dayjs(data?.travelAt).format('YYYY/MM/DD')
        : dayjs().format('YYYY/MM/DD'),
    },
    validationSchema: schema,
    onSubmit: async () => {
      const priceValue = values?.price ? values.price.replace(/,/g, '') : '0';

      await createDeliveryRequest({
        variables: {
          orderId: data?.id!,
          price: priceValue,
          travelAt: dayjs(values?.travelAt) || dayjs().format('YYYY-MM-DD'),
        },
        refetchQueries: [
          {
            query: GetOrderDetailDocument,
            variables: { id: data?.id! },
          },
        ],
        awaitRefetchQueries: true,
      })
        .then(() => {
          navigation.navigate('MsgModal', {
            type: 'success',
            msg: 'Таны хүсэлт амжилттай илгээгдлээ',
          });
        })
        .finally(() => {
          ref.current?.dismiss();
        });
    },
  });

  const handlePriceChange = (text: string) => {
    const formatted = formatNumberWithCommas(text);
    setFieldValue('price', formatted);
  };

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  return (
    <>
      <Button title="Хүсэлт илгээх" loading={loading} onPress={onPress} />
      <ModalBottomSheet
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
              value={values.price}
              onChangeText={handlePriceChange}
              onBlur={handleBlur('price')}
              keyboardAvoiding
              autoFocus
              keyboardType="number-pad"
              label="Үнэ"
              placeholder="Үнэ"
              error={touched.price && errors.price ? errors.price : undefined}
            />
            <Button
              title="Хүсэлт илгээх"
              loading={loading}
              onPress={handleSubmit}
            />
          </Box>
        </BottomSheetView>
      </ModalBottomSheet>
      <ModalMsg
        type="success"
        msg="Таны хүсэлт амжилттай илгээгдлээ"
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default OrderRequestButton;
