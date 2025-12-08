import { TouchableOpacity } from 'react-native';

import { Box, Text } from '@/components/Theme';
import { useCloseOrderMutation } from '@/gql/mutations/CloseOrderMutation.generated';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { useGetOrderRequestsQuery } from '@/gql/query/getOrderRequestsQuery.generated';

interface Props {
  order: GetOrderQuery['order'];
}

const OrderRequests = ({ order }: Props) => {
  const { data } = useGetOrderRequestsQuery({
    variables: {
      number: order?.number,
      first: 10,
    },
  });

  const [closeOrder] = useCloseOrderMutation();

  return (
    <Box>
      {data?.order?.deliveryRequests?.edges?.map(
        (
          i: NonNullable<
            GetOrderQuery['order']
          >['deliveryRequests']['edges'][0],
          index
        ) => {
          return (
            <Box key={index}>
              <TouchableOpacity
                onPress={() => {
                  closeOrder({
                    variables: {
                      number: order?.number!,
                      mobile: '95690480',
                    },
                  });
                }}
              >
                <Text>{i.node!.price}</Text>
                <Text>{i.node!.status}</Text>
              </TouchableOpacity>
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default OrderRequests;
