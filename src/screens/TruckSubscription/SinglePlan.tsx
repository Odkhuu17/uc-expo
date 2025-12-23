import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Box, Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { GetSubscriptionPlansQuery } from '@/gql/queries/getSubscriptionPlans.generated';

interface Props {
  node: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0]['node'];
  onPress: () => void;
  loading?: boolean;
}

const SinglePlan = ({ node, onPress, loading }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor="primary"
        p="s"
        borderRadius="m"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color="white" fontWeight={600}>
          {node?.name}
        </Text>
        <Box borderRadius="m" backgroundColor="white" p="s">
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text fontWeight={600}>{moneyFormat(node?.price || 0)}</Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SinglePlan;
