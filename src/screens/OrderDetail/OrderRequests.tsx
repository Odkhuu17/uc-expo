import { Box, Text } from '@/components/Theme';
import { useCloseOrderMutation } from '@/gql/mutations/CloseOrderMutation.generated';
import { useGetOrderRequestsQuery } from '@/gql/query/getOrderRequestsQuery.generated';
import { TouchableOpacity } from 'react-native';

interface Props {
  order: any;
}

const OrderRequests = ({ order }: Props) => {
  const { data } = useGetOrderRequestsQuery({
    variables: {
      number: order?.number,
      first: 10,
    },
  });

  const [closeOrder] = useCloseOrderMutation();

  console.log(data, '123');

  return (
    <Box>
      {data?.order?.deliveryRequests?.edges?.map((i, index) => {
        return (
          <Box key={index}>
            <TouchableOpacity
              onPress={() => {
                closeOrder({
                  variables: {
                    number: order?.number,
                    mobile: '95690480',
                  },
                });
              }}
            >
              <Text>{i.node.price}</Text>
              <Text>{i.node.status}</Text>
            </TouchableOpacity>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderRequests;
