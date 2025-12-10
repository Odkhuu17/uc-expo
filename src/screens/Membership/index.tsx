import { Container, CustomFlatList, Empty } from '@/components';
import Header from '@/components/NormalHeader';
import {
  GetSubscriptionPlansQuery,
  useGetSubscriptionPlansQuery,
} from '@/gql/query/getSubscriptionPlans.generated';
import SinglePlan from './SinglePlan';

const MemberShipScreen = () => {
  const { data, loading, refetch } = useGetSubscriptionPlansQuery({
    variables: {
      first: 10,
    },
  });

  const renderItem = ({
    item,
  }: {
    item: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0];
  }) => <SinglePlan node={item.node} />;

  return (
    <Container>
      <Header title="Гишүүнчлэл" hasBack />
      <CustomFlatList
        onRefresh={refetch}
        refreshing={loading}
        data={data?.subscriptionPlans.edges}
        renderItem={renderItem}
        loading={loading}
        ListEmptyComponent={
          <Empty
            title="Төлбөрийн нөхцөл"
            description="Төлбөрийн нөхцөл олдсонгүй"
          />
        }
      />
    </Container>
  );
};

export default MemberShipScreen;
