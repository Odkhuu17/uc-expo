import React, { useState } from 'react';

import { CustomFlatList, Empty, Loader } from '@/components';

import Banners from './Banners';
import {
  GetOrdersQuery,
  useGetOrdersQuery,
} from '@/gql/queries/getOrders.generated';
import SingleOrder from '@/containers/SingleOrder';

const AllOrders = () => {
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
    <CustomFlatList
      ListHeaderComponent={<Banners />}
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

export default AllOrders;
