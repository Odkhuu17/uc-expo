import { Alert } from 'react-native';
import { Delete03Icon } from '@hugeicons/core-free-icons';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon } from '@/components';
import { useOrderDestroyMutation } from '@/gql/mutations/orderDestroy.generated';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import { INavigation } from '@/navigations';
import { GetOrdersDocument } from '@/gql/queries/getOrders.generated';
interface Props {
  order: GetOrderDetailQuery['order'];
}

const OrderDestroyButton = ({ order }: Props) => {
  const [orderDestroy, { loading: orderDestroyLoading }] =
    useOrderDestroyMutation();

  const navigation = useNavigation<INavigation>();

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
          onPress: async () => {
            await orderDestroy({
              variables: { id: order?.id || '' },
              refetchQueries: [
                {
                  query: GetOrdersDocument,
                  variables: { first: 10 },
                },
                'GetOrdersMy',
              ],
            });

            navigation.goBack();
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
