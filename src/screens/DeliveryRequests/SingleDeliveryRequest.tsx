import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
  BoxContainer,
  Button,
  CustomBottomSheetModal,
  Input,
  MessageModal,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useCloseOrderMutation } from '@/gql/mutations/CloseOrderMutation.generated';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { moneyFormat } from '@/utils/helpers';


interface Props {
  item: NonNullable<
    GetOrderQuery['order']
  >['deliveryRequests']['edges'][0]['node'];
  isRent: boolean;
}

const schema = yup.object().shape({
  mobile: yup
    .string()
    .length(8, 'Та буруу дугаар оруулсан байна!')
    .required('Энэ талбар хоосон байна!'),
});

const SingleDeliveryRequest = ({ item, isRent }: Props) => {
  const { number } = useLocalSearchParams<{ number: string }>();
  const [closeOrder, { loading }] = useCloseOrderMutation();
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();

  const onPressConfirm = () => {
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
      mobile: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      if (values?.mobile === item?.user?.mobile) {
        await closeOrder({
          variables: {
            number: number,
            mobile: values.mobile,
          },
        });
        setSuccessModal(true);
      } else {
        router.navigate({
          pathname: '/modal',
          params: { type: 'error', message: 'Та буруу дугаар оруулсан байна!' },
        });
      }
    },
  });

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  return (
    <>
      <BoxContainer gap="s">
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Үнэ:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {moneyFormat(item?.price || 0)}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">
            {isRent ? 'Ажил эхлэх өдөр:' : 'Ачих өдөр:'}
          </Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {isRent
              ? dayjs(item?.travelAt).format('YYYY/MM/DD')
              : dayjs(item?.travelAt).format('YYYY/MM/DD HH:mm')}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Жолоочын овог:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {item?.user?.lastName || '-'}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Жолоочын нэр:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {item?.user?.firstName || '-'}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Жолоочын дугаар:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {item?.user?.mobile || '-'}
          </Text>
        </Box>
        <Button title="Захиалга баталгаажуулах" onPress={onPressConfirm} />
      </BoxContainer>
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
              placeholder="Жолоочийн утасны дугаар"
              keyboardAvoiding
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              error={
                touched.mobile && errors.mobile ? errors.mobile : undefined
              }
            />
            <Button
              title="Баталгаажуулах"
              loading={loading}
              onPress={handleSubmit}
            />
          </Box>
        </BottomSheetView>
      </CustomBottomSheetModal>
      <MessageModal
        type="success"
        message="Захиалгын хүсэлт амжилттай баталгаажлаа"
        onClose={() => {
          router.back();
          ref.current?.dismiss();
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default SingleDeliveryRequest;
