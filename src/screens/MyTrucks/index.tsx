import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  Container,
  CustomFlatList,
  Empty,
  NormalHeader,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import {
  GetMyTrucksQuery,
  useGetMyTrucksQuery,
} from '@/gql/query/getMyTrucks.generated';
import SingleTruck from './SingleTruck';

const MyTrucks = () => {
  const { data, loading, refetch } = useGetMyTrucksQuery({
    fetchPolicy: 'no-cache',
  });
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  // Sort trucks by createdAt descending (newest first)
  const sortedTrucks = data?.me?.trucks
    ? [...data.me.trucks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
  }) => {
    return <SingleTruck item={item} />;
  };

  return (
    <Container>
      <NormalHeader title="Миний машин" hasBack />
      <CustomFlatList
        data={sortedTrucks}
        refreshing={loading}
        loading={loading}
        onRefresh={refetch}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty title="Машин" description="Машин олдсонгүй" />
        }
      />
      {data?.me?.trucks && data.me.trucks.length === 0 && (
        <Box style={{ marginBottom: insets.bottom + theme.spacing.m }} mx="m">
          <Button
            title="Машин нэмэх"
            onPress={() => router.push('/profile/trucks/add')}
          />
        </Box>
      )}
    </Container>
  );
};

export default MyTrucks;
