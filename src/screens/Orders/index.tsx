import { Image } from 'expo-image';
import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  NormalHeader,
} from '@/components';
import {
  GetOrdersQuery,
  useGetOrdersQuery,
} from '@/gql/query/getOrders.generated';
import SingleOrder from './SingleOrder';

const DriverOrdersScreen = () => {
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
          first: 10,
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
    return <SingleOrder item={item} />;
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <NormalHeader title="Захиалгууд" hasBack />
      <CustomFlatList
        ListHeaderComponent={
          <Image
            source={require('assets/images/order-banner.jpg')}
            style={{ width: '100%', height: 200 }}
            contentFit="cover"
          />
        }
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

export default DriverOrdersScreen;
