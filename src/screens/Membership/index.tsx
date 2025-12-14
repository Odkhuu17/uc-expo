import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { Container, CustomFlatList, Empty, MessageModal } from '@/components';
import Header from '@/components/NormalHeader';
import {
  GetSubscriptionPlansQuery,
  useGetSubscriptionPlansQuery,
} from '@/gql/query/getSubscriptionPlans.generated';
import { useGetUserLazyQuery } from '@/gql/query/getUserQuery.generated';
import SinglePlan from './SinglePlan';

const MemberShipScreen = () => {
  const router = useRouter();
  const [getUser] = useGetUserLazyQuery();
  const appState = useRef(AppState.currentState);
  const [successModal, setSuccessModal] = useState(false);

  const { data, loading, refetch } = useGetSubscriptionPlansQuery({
    variables: {
      first: 10,
    },
  });

  const init = async () => {
    const { data } = await getUser();

    if (data?.me?.subscribed) {
      setSuccessModal(true);
    }
  };

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
