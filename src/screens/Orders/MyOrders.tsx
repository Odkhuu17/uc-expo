import { useState } from 'react';

import { CustomFlatList, Empty, Loader } from '@/components';
import SingleOrder from '@/containers/SingleOrder';
import {
  GetOrdersMyQuery,
  useGetOrdersMyQuery,
} from '@/gql/queries/getOrdersMy.generated';
import Status from '@/containers/SingleOrder/Status';
import { Box, Text } from '@/components/Theme';

const MyOrders = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetOrdersMyQuery({
    variables: {
      ordersFirst: 10,
    },
    pollInterval: 30000,
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
          ordersFirst: 10,
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
    item: NonNullable<GetOrdersMyQuery['me']>['orders']['edges'][0]['node'];
  }) => {
    return (
      <SingleOrder
        item={item}
        deliveryRequestsCount={item?.deliveryRequests?.totalCount}
      >
        <Status item={item} />
      </SingleOrder>
    );
  };

  return (
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
  );
};

export default MyOrders;
