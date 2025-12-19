import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  NormalHeader,
  SingleOrder,
} from '@/components';
import {
  GetDeliveryRequestsQuery,
  useGetDeliveryRequestsQuery,
} from '@/gql/query/getDeliveryRequests.generated';

const OrderRequests = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetDeliveryRequestsQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const orders = data?.deliveryRequests?.edges?.map(edge => edge.node) || [];
  const hasNextPage = data?.deliveryRequests?.pageInfo?.hasNextPage || false;
  const endCursor = data?.deliveryRequests?.pageInfo?.endCursor;

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
            deliveryRequests: {
              ...fetchMoreResult.deliveryRequests,
              edges: [
                ...previousResult.deliveryRequests.edges,
                ...fetchMoreResult.deliveryRequests.edges,
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
    item: NonNullable<
      GetDeliveryRequestsQuery['deliveryRequests']['edges'][0]['node']
    >;
  }) => {
    return <SingleOrder item={item?.order} />;
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <NormalHeader title="Миний хүсэлтүүд" hasBack />
      <CustomFlatList
        data={orders}
        loading={loading}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            title="Захиалгын хүсэлт олдсонгүй"
            description="Одоогоор захиалгын хүсэлт үүсээгүй байна."
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

export default OrderRequests;
