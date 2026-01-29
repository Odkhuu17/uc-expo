import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import * as yup from 'yup';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  Input,
  ModalBottomSheet,
  BottomContainer,
  ModalMsg,
} from '@/components';
import { Box } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { INavigation } from '@/navigations';
import { useCloseOrderMutation } from '@/gql/mutations/closeOrder.generated';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';

const schema = yup.object().shape({
  mobile: yup
    .string()
    .length(8, 'Та буруу дугаар оруулсан байна!')
    .required('Энэ талбар хоосон байна!'),
});

interface Props {
  order: GetOrderDetailQuery['order'];
}

const OrderCloseButton = ({ order }: Props) => {
  const { user } = useAppSelector(state => state.auth);
  const [closeOrder, { loading }] = useCloseOrderMutation();
  const [successModal, setSuccessModal] = useState(false);
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);
  const navigation = useNavigation<INavigation>();

  const onCloseSuccessModal = () => {
    ref.current?.dismiss();
    setSuccessModal(false);
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
      if (values?.mobile === order?.acceptedDeliveryRequest?.user?.mobile) {
        await closeOrder({
          variables: {
            status: 'completed',
            number: order?.number || '',
          },
        }).finally(() => {
          ref?.current?.dismiss();
        });
        setSuccessModal(true);
      } else {
        ref.current?.dismiss();
        navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Та буруу дугаар оруулсан байна!',
        });
      }
    },
  });

  const onPressCloseOrder = () => {
    Alert.alert(
      'Захиалга дуусгах',
      'Та захиалга дуусгахдаа итгэлтэй байна уу?',
      [
        {
          text: 'Дуусгах',
          onPress: onShowBottomSheet,
        },
        { text: 'Буцах', style: 'cancel' },
      ],
    );
  };

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  const onShowBottomSheet = () => {
    ref.current?.present();
  };

  return (
    <>
      <Button
        title="Захиалга дуусгах"
        variant="outlined"
        color="success"
        onPress={onPressCloseOrder}
      />
      <ModalBottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        onChange={onChangeSheet}
      >
        <BottomSheetView>
          <BottomContainer listenKeyboard>
            <Box gap="m">
              <Input
                label="Жолоочийн утасны дугаар"
                placeholder="Та жолоочийн утасны дугаарыг оруулна уу"
                maxLength={8}
                keyboardAvoiding
                keyboardType="number-pad"
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                autoFocus
                value={values.mobile}
                error={
                  touched.mobile && errors.mobile ? errors.mobile : undefined
                }
              />
              <Button
                title="Дуусгах"
                onPress={handleSubmit}
                color="success"
                loading={loading}
              />
            </Box>
          </BottomContainer>
        </BottomSheetView>
      </ModalBottomSheet>
      <ModalMsg
        type="success"
        msg="Захиалга хаагдлаа"
        handleClose={onCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default OrderCloseButton;
