import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BoxContainer,
  Container,
  Empty,
  Loader,
  NormalHeader,
} from '@/components';
import { Box, makeStyles, Text, useTheme } from '@/components/Theme';
import {
  GetOrdersQuery,
  useGetOrdersQuery,
} from '@/gql/query/getOrders.generated';
import { Link } from 'expo-router';

const useStyles = makeStyles(theme => ({
  listContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    gap: theme.spacing.m,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
}));

const OrdersScreen = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyles();
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetOrdersQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const orders = data?.orders?.edges?.map(edge => edge.node) || [];
  const hasNextPage = data?.orders?.pageInfo?.hasNextPage || false;
  const endCursor = data?.orders?.pageInfo?.endCursor;

  const onRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const onLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchMore({
        variables: {
          after: endCursor,
          first: 5,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return {
            orders: {
              ...fetchMoreResult.orders,
              edges: [
                ...previousResult.orders.edges,
                ...fetchMoreResult.orders.edges,
              ],
            },
          };
        },
      });
    }
  };

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
  }) => {
    return (
      <Link href={`/profile/orders/${item?.number}`} asChild>
        <TouchableOpacity>
          <BoxContainer gap="s">
            <Text color="lightBlue2" fontFamily="Roboto_500Medium">
              {item?.title}
            </Text>
            <Text>
              {item?.user?.firstName} {item?.user?.lastName}
            </Text>
            {item?.travelAt && (
              <Box flexDirection="row" gap="xs">
                <Text color="lightBlue2" variant="body2">
                  Ачих:
                </Text>
                <Text variant="body2" color="grey2">
                  {dayjs(item?.travelAt).format('YYYY-MM-DD HH:mm')}
                </Text>
              </Box>
            )}
            <Box flexDirection="row" gap="xs">
              <Text color="lightBlue2" variant="body2">
                Захиалсан:
              </Text>
              <Text variant="body2" color="grey2">
                {dayjs(item?.createdAt).format('YYYY-MM-DD')}
              </Text>
            </Box>
          </BoxContainer>
        </TouchableOpacity>
      </Link>
    );
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <NormalHeader title="Захиалгууд" />
      <FlatList
        data={orders}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        keyExtractor={item => item?.id || ''}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: insets.bottom + theme.spacing.m },
          orders.length === 0 && styles.emptyContainer,
        ]}
        ListEmptyComponent={
          loading ? (
            <Loader />
          ) : (
            <Empty
              title="Захиалга олдсонгүй"
              description="Одоогоор захиалга үүсээгүй байна."
            />
          )
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

export default OrdersScreen;
