import { Alert } from 'react-native';

import { Button, ButtonIcon } from '@/components';
import { useOrderDestroyMutation } from '@/gql/mutations/orderDestroy.generated';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import { Delete03Icon } from '@hugeicons/core-free-icons';

interface Props {
  order: GetOrderDetailQuery['order'];
}

const OrderDestroyButton = ({ order }: Props) => {
  const [orderDestroy, { loading: orderDestroyLoading }] =
    useOrderDestroyMutation();

  const onPressDelete = () => {
    Alert.alert(
      'Захиалга устгах',
      `Та энэ захиалгыг устгахдаа итгэлтэй байна уу?`,
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Устгах',
          style: 'destructive',
          onPress: () => {
            orderDestroy({ variables: { id: order?.id || '' } });
          },
        },
      ],
    );
  };

  return (
    <ButtonIcon
      shape="square"
      icon={Delete03Icon}
      color="error"
      loading={orderDestroyLoading}
      onPress={onPressDelete}
    />
  );
};

export default OrderDestroyButton;
