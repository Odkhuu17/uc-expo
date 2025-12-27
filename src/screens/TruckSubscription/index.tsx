import { useState } from 'react';

import { useGetMyTrucksLazyQuery } from '@/gql/queries/getMyTruck.generated';
import {
  GetSubscriptionPlansQuery,
  useGetSubscriptionPlansQuery,
} from '@/gql/queries/getSubscriptionPlans.generated';
import { INavigationProps } from '@/navigations';
import SinglePlan from './SinglePlan';
import {
  Container,
  CustomFlatList,
  Empty,
  HeaderNormal,
  ModalMsg,
} from '@/components';

interface Props {
  navigation: INavigationProps<'TruckSubscription'>['navigation'];
  route: INavigationProps<'TruckSubscription'>['route'];
}

const TruckSubscription = ({ navigation, route }: Props) => {
  const [getTruck] = useGetMyTrucksLazyQuery();
  const [successModal, setSuccessModal] = useState(false);

  const { data, loading, refetch } = useGetSubscriptionPlansQuery({
    variables: {
      first: 10,
    },
  });

  const init = async () => {
    const { data } = await getTruck();
    data?.me?.trucks.forEach(truck => {
      if (truck.id === route.params.truckId) {
        if (truck.subscribed) {
          setSuccessModal(true);
        }
      }
    });
  };

  const onCloseSuccessModal = () => {
    navigation.goBack();
    setSuccessModal(false);
  };

  const renderItem = ({
    item,
  }: {
    item: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0];
  }) => <SinglePlan node={item.node} truckId={route.params.truckId} />;

  return (
    <>
      <Container>
        <HeaderNormal title="Гишүүнчлэл" hasBack />
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
      <ModalMsg
        type="success"
        msg="Төлбөр амжилттай төлөгдлөө"
        handleClose={onCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default TruckSubscription;
