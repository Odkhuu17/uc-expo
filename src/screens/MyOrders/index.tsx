import { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  NormalHeader,
  SingleOrder,
} from '@/components';
import {
  GetMyOrdersQuery,
  useGetMyOrdersQuery,
} from '@/gql/query/getMyOrdersQuery.generated';

const MyOrdersScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetMyOrdersQuery({
    variables: {
      ordersFirst: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const onRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const orders =
    data?.me?.orders?.edges
      ?.map(edge => edge.node)
      .filter((node): node is NonNullable<typeof node> => node != null) || [];
  const pageInfo = data?.me?.orders?.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage || false;
  const endCursor = pageInfo?.endCursor;

  const onLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchMore({
        variables: {
          ordersFirst: 20,
          after: endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.me?.orders) return prev;

          return {
            ...prev,
            me: {
              ...prev.me!,
              orders: {
                ...fetchMoreResult.me.orders,
                edges: [
                  ...(prev.me?.orders?.edges || []),
                  ...fetchMoreResult.me.orders.edges,
                ],
              },
            },
          };
        },
      });
    }
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetMyOrdersQuery['me']>['orders']['edges'][0]['node'];
  }) => {
    return <SingleOrder item={item} />;
  };

  return (
    <Container>
      <NormalHeader hasBack title="Миний захиалгууд" />
      <CustomFlatList
        data={orders}
        loading={loading}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            title="Захиалга олдсонгүй"
            description="Одоогоор захиалга үүсээгүй байна."
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

export default MyOrdersScreen;
