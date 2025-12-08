import { Button } from '@/components';
import { useDestroyOrderMutation } from '@/gql/mutations/destroyOrderMutation.generated';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { Alert } from 'react-native';

interface Props {
  order: GetOrderQuery['order'];
}

const OrderDestroyButton = ({ order }: Props) => {
  const [orderDestroy, { loading: orderDestroyLoading }] =
    useDestroyOrderMutation();

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
      ]
    );
  };

  return (
    <Button
      backgroundColor="red"
      title="Устгах"
      loading={orderDestroyLoading}
      onPress={onPressDelete}
    />
  );
};

export default OrderDestroyButton;
