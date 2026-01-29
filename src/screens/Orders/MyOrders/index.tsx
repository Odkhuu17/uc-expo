import { useState } from 'react';

import { CustomFlatList, Empty, Loader } from '@/components';
import {
  GetOrdersMyQuery,
  useGetOrdersMyQuery,
} from '@/gql/queries/getOrdersMy.generated';
import SingleMyOrder from './SingleMyOrder';
import Tab from '@/components/Tab';

const MyOrders = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const [filter, setFilter] = useState('accepted');
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, fetchMore, refetch } = useGetOrdersMyQuery({
    variables: {
      ordersFirst: 10,
      filter: {
        status: { eq: filter },
      },
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

  const renderTab = () => {
    const onPressTab = (index: number) => {
      setActiveIndex(index);
      switch (index) {
        case 0:
          setFilter('accepted');
          break;
        case 1:
          setFilter('completed');
          break;
        default:
          setFilter('accepted');
      }
    };

    return (
      <Tab
        tabs={['Баталгаажсан', 'Дууссан']}
        onPressTab={onPressTab}
        activeIndex={activeIndex}
      />
    );
  };

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetOrdersMyQuery['me']>['orders']['edges'][0]['node'];
  }) => {
    return <SingleMyOrder item={item} />;
  };

  return (
    <CustomFlatList
      ListHeaderComponent={renderTab}
      stickyHeaderIndices={[0]}
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
