import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import {
  BoxContainer,
  Button,
  ModalBottomSheet,
  Input,
  ModalMsg,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { INavigation } from '@/navigations';
import { useCloseOrderMutation } from '@/gql/mutations/closeOrder.generated';
import type { GetOrderRequestsQuery } from '@/gql/queries/orderRequests.generated';

type DeliveryRequestNode = NonNullable<
  NonNullable<
    NonNullable<
      GetOrderRequestsQuery['order']
    >['deliveryRequests']['edges'][number]['node']
  >
>;

const schema = yup.object().shape({
  mobile: yup
    .string()
    .length(8, 'Та буруу дугаар оруулсан байна!')
    .required('Энэ талбар хоосон байна!'),
});

interface Props {
  item: DeliveryRequestNode;
  isRent: boolean;
  number: string;
}

const SingleDeliveryRequest = ({ item, isRent, number }: Props) => {
  const [closeOrder, { loading }] = useCloseOrderMutation();
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [successModal, setSuccessModal] = useState(false);
  const navigation = useNavigation<INavigation>();

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
        }).finally(() => {
          ref?.current?.dismiss();
        });
        setSuccessModal(true);
      } else {
        navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Та буруу дугаар оруулсан байна!',
        });
      }
    },
  });

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  const onCloseSuccessModal = () => {
    navigation.goBack();
    ref.current?.dismiss();
    setSuccessModal(false);
  };

  return (
    <>
      <BoxContainer
        gap="s"
        borderColor="success"
        borderWidth={item?.status === 'accepted' ? 2 : 0}
      >
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
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Төлөв:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {item?.status === 'accepted' ? 'Баталгаажсан' : '-'}
          </Text>
        </Box>
        {item?.status !== 'accepted' && (
          <Button title="Захиалга баталгаажуулах" onPress={onPressConfirm} />
        )}
      </BoxContainer>
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
              label="Жолоочийн утасны дугаар"
              placeholder="Жолоочийн утасны дугаар"
              keyboardAvoiding
              keyboardType="number-pad"
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
      </ModalBottomSheet>
      <ModalMsg
        type="success"
        msg="Захиалгын хүсэлт амжилттай баталгаажлаа"
        handleClose={onCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default SingleDeliveryRequest;
