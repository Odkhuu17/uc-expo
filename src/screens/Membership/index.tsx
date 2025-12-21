import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { Container, CustomFlatList, Empty, MessageModal } from '@/components';
import Header from '@/components/NormalHeader';
import { useGetMyTrucksLazyQuery } from '@/gql/query/getMyTrucks.generated';
import {
  GetSubscriptionPlansQuery,
  useGetSubscriptionPlansQuery,
} from '@/gql/query/getSubscriptionPlans.generated';
import SinglePlan from './SinglePlan';

const MemberShipScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [getTruck] = useGetMyTrucksLazyQuery();
  const appState = useRef(AppState.currentState);
  const [successModal, setSuccessModal] = useState(false);

  const { data, loading, refetch } = useGetSubscriptionPlansQuery({
    variables: {
      first: 10,
    },
  });

  const init = async () => {
    const { data } = await getTruck();
    data?.me?.trucks.forEach(truck => {
      if (truck.id === id) {
        if (truck.subscribed) {
          setSuccessModal(true);
        }
      }
    });
  };

  useEffect(() => {
    init();
    const interval = setInterval(() => {
      init();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        init();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const renderItem = ({
    item,
  }: {
    item: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0];
  }) => <SinglePlan node={item.node} />;

  return (
    <>
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
      <MessageModal
        type="success"
        message="Төлбөр амжилттай төлөгдлөө"
        onClose={() => {
          router.back();
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default MemberShipScreen;
