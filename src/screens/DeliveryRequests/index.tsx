import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  NormalHeader,
} from '@/components';
import { useGetOrderRequestsQuery } from '@/gql/query/getOrderRequestsQuery.generated';
import { GetOrdersQuery } from '@/gql/query/getOrders.generated';
import { isRentOrder } from '@/utils/helpers';
import SingleDeliveryRequest from './SingleDeliveryRequest';

const DeliveryRequestsScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { number } = useLocalSearchParams<{ number: string }>();

  const { data, loading, fetchMore, refetch } = useGetOrderRequestsQuery({
    variables: {
      number,
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const orderRequests =
    data?.order?.deliveryRequests?.edges?.map(edge => edge.node) || [];
  const hasNextPage =
    data?.order?.deliveryRequests?.pageInfo?.hasNextPage || false;
  const endCursor = data?.order?.deliveryRequests?.pageInfo?.endCursor;

  const isRent = isRentOrder(data?.order?.carType);

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
            ...previousResult,
            order: {
              ...previousResult.order,
              ...fetchMoreResult.order,
              deliveryRequests: {
                ...fetchMoreResult.order?.deliveryRequests,
                edges: [
                  ...(previousResult.order?.deliveryRequests?.edges || []),
                  ...(fetchMoreResult.order?.deliveryRequests?.edges || []),
                ],
              },
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
    return <SingleDeliveryRequest item={item} isRent={isRent} />;
  };

  const renderFooter = () => {
    if (loading && orderRequests.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <NormalHeader title="Захиалгын хүсэлтүүд" hasBack />
      <CustomFlatList
        data={orderRequests}
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

export default DeliveryRequestsScreen;
