import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  Container,
  CustomFlatList,
  Empty,
  NormalHeader
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import {
  GetMyTrucksQuery,
  useGetMyTrucksQuery,
} from '@/gql/query/getMyTrucks.generated';
import { useAuthStore } from '@/stores';
import { useRouter } from 'expo-router';
import SingleTruck from './SingleTruck';

const MyTrucks = () => {
  const user = useAuthStore(state => state.user);
  const { data, loading, refetch } = useGetMyTrucksQuery({
    variables: { userId: user?.id || '' },
  });
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const renderItem = ({
    item,
  }: {
    item: GetMyTrucksQuery['trucks']['nodes'][number];
  }) => {
    return <SingleTruck item={item} />;
  };

  console.log(data);

  return (
    <Container>
      <NormalHeader title="Миний машин" hasBack />
      <CustomFlatList
        data={data?.trucks?.nodes}
        refreshing={loading}
        loading={loading}
        onRefresh={refetch}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty title="Машин" description="Машин олдсонгүй" />
        }
      />
      <Box style={{ marginBottom: insets.bottom + theme.spacing.m }} mx="m">
        <Button
          title="Машин нэмэх"
          onPress={() => router.push('/profile/trucks/add')}
        />
      </Box>
    </Container>
  );
};

export default MyTrucks;
