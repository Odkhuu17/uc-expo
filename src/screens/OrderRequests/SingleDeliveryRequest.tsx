import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import {
  BoxContainer,
  Button,
  ModalBottomSheet,
  Input,
  ModalMsg,
  BottomContainer,
  RowValue,
  Label,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { INavigation } from '@/navigations';
import type { GetOrderRequestsQuery } from '@/gql/queries/orderRequests.generated';
import { useAcceptDeliveryRequestMutation } from '@/gql/mutations/acceptDeliveryRequest.generated';
import { GetOrderDetailDocument } from '@/gql/queries/getOrderDetail.generated';

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
  const [acceptDeliveryRequest, { loading }] =
    useAcceptDeliveryRequestMutation();
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);
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
        await acceptDeliveryRequest({
          variables: {
            id: item?.id,
          },
          refetchQueries: [
            {
              query: GetOrderDetailDocument,
              variables: { number },
            },
          ],
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
      <BoxContainer gap="l">
        <Box gap="s">
          <RowValue label="Үнэ:" value={moneyFormat(item?.price || 0)} />
          <RowValue
            label={isRent ? 'Ажил эхлэх өдөр:' : 'Ачих өдөр:'}
            value={
              isRent
                ? dayjs(item?.travelAt).format('YYYY-MM-DD')
                : dayjs(item?.travelAt).format('YYYY-MM-DD HH:mm')
            }
          />
          <RowValue
            label="Жолоочын овог:"
            value={item?.user?.lastName || '-'}
          />
          <RowValue
            label="Жолоочын нэр:"
            value={item?.user?.firstName || '-'}
          />
          <RowValue
            label="Жолоочын дугаар:"
            value={item?.user?.mobile || '-'}
          />
          <RowValue label="Төлөв:">
            <Label
              text={
                item?.status === 'accepted' ? 'Баталгаажсан' : 'Хүлээгдэж буй'
              }
              backgroundColor={
                item?.status === 'accepted' ? 'success' : 'pending'
              }
            />
          </RowValue>
        </Box>
        {item?.status !== 'accepted' && (
          <Button
            title="Захиалга баталгаажуулах"
            onPress={onPressConfirm}
            color="primary"
            variant='outlined'
          />
        )}
      </BoxContainer>
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
                placeholder="Жолоочийн утасны дугаар"
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
                title="Баталгаажуулах"
                loading={loading}
                onPress={handleSubmit}
              />
            </Box>
          </BottomContainer>
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
