import { Button } from '@/components';
import { useCreateDeliveryRequestMutation } from '@/gql/mutations/createDeliveryRequestMutation.generated';

interface Props {
  data: any;
}

const OrderRequestButton = ({ data }: Props) => {
  const [createDeliveryRequest, { loading }] =
    useCreateDeliveryRequestMutation();

  const onPress = () => {
    createDeliveryRequest({
      variables: {
        orderId: data?.id,
        price: data?.price || 0,
        travelAt: new Date().toISOString(),
      },
    });
  };

  return (
    <Button
      title="Хүргэлтийн хүсэлт илгээх"
      loading={loading}
      onPress={onPress}
    />
  );
};

export default OrderRequestButton;
