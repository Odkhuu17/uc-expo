import React, { useState } from 'react';

import { CustomFlatList, Empty, Loader } from '@/components';
import Banners from './Banners';
import {
  GetOrdersQuery,
  useGetOrdersQuery,
} from '@/gql/queries/getOrders.generated';
import SingleOrder from './SingleOrder';
import Tab from '@/components/Tab';

const AllOrders = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const [filter, setFilter] = useState('active');
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, fetchMore, refetch } = useGetOrdersQuery({
    variables: {
      first: 10,
      filter: {
        status: filter === 'active' ? { eq: 'pending' } : { notEq: 'pending' },
      },
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

  const renderTab = () => {
    const onPressTab = (index: number) => {
      setActiveIndex(index);
      switch (index) {
        case 0:
          setFilter('active');
          break;
        case 1:
          setFilter('inactive');
          break;
        default:
          setFilter('active');
      }
    };

    return (
      <Tab
        tabs={['Идэвхтэй', 'Идэвхгүй']}
        onPressTab={onPressTab}
        activeIndex={activeIndex}
      />
    );
  };

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'] | 'tab';
  }) => {
    if (item === 'tab') {
      return renderTab();
    }
    return <SingleOrder item={item} />;
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <>
      <CustomFlatList
        ListHeaderComponent={<Banners />}
        stickyHeaderIndices={[1]}
        data={['tab', ...orders]}
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
    </>
  );
};

export default AllOrders;
