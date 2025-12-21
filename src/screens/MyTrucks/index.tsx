import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';

import {
  BottomContainer,
  Button,
  Container,
  CustomFlatList,
  Empty,
  NormalHeader,
} from '@/components';
import {
  GetMyTrucksQuery,
  useGetMyTrucksLazyQuery,
} from '@/gql/query/getMyTrucks.generated';
import SingleTruck from './SingleTruck';

const MyTrucks = () => {
  const [getMyTrucks, { data, loading }] = useGetMyTrucksLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getMyTrucks();
    }, [])
  );

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
  }) => {
    return <SingleTruck item={item} refetch={getMyTrucks} />;
  };

  return (
    <Container>
      <NormalHeader title="Миний машин" hasBack />
      <CustomFlatList
        data={data?.me?.trucks}
        refreshing={loading}
        loading={loading}
        onRefresh={getMyTrucks}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty title="Машин" description="Машин олдсонгүй" />
        }
      />
      <BottomContainer>
        <Button
          title="Машин нэмэх"
          onPress={() => router.push('/profile/trucks/add')}
        />
      </BottomContainer>
    </Container>
  );
};

export default MyTrucks;
