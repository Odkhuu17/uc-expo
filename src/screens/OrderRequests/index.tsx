import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  HeaderNormal,
} from '@/components';
import { isRentOrder } from '@/utils/helpers';
import SingleDeliveryRequest from './SingleDeliveryRequest';
import { INavigationProps } from '@/navigations';
import {
  GetOrderRequestsQuery,
  useGetOrderRequestsQuery,
} from '@/gql/queries/orderRequests.generated';

interface Props {
  route: INavigationProps<'OrderRequests'>['route'];
}

const OrderRequests = ({ route }: Props) => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { number } = route.params;

  type DeliveryRequestNode = NonNullable<
    NonNullable<
      NonNullable<
        GetOrderRequestsQuery['order']
      >['deliveryRequests']['edges'][number]['node']
    >
  >;

  const { data, loading, fetchMore, refetch } = useGetOrderRequestsQuery({
    variables: {
      number,
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const orderRequests: DeliveryRequestNode[] = (
    data?.order?.deliveryRequests?.edges ?? []
  )
    .map(edge => edge.node)
    .filter((node): node is DeliveryRequestNode => node != null);
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
          const prevOrder = previousResult.order;
          const nextOrder = fetchMoreResult?.order;

          if (!prevOrder || !nextOrder) return previousResult;

          const prevConn = prevOrder.deliveryRequests;
          const nextConn = nextOrder.deliveryRequests;

          const mergedEdges = [
            ...(prevConn.edges ?? []),
            ...(nextConn.edges ?? []),
          ]
            .filter(Boolean)
            .filter(
              (edge, index, array) =>
                array.findIndex(e => e.cursor === edge.cursor) === index,
            );

          const mergedNodes = [
            ...(prevConn.nodes ?? []),
            ...(nextConn.nodes ?? []),
          ]
            .filter(Boolean)
            .filter(
              (node, index, array) =>
                array.findIndex(n => n.id === node.id) === index,
            );

          return {
            ...previousResult,
            order: {
              ...prevOrder,
              deliveryRequests: {
                ...nextConn,
                edges: mergedEdges,
                nodes: mergedNodes,
                pageInfo: nextConn.pageInfo,
                totalCount: nextConn.totalCount ?? prevConn.totalCount,
              },
            },
          };
        },
      });
    }
  };

  const renderItem = ({ item }: { item: DeliveryRequestNode }) => {
    return (
      <SingleDeliveryRequest item={item} isRent={isRent} number={number} />
    );
  };

  const renderFooter = () => {
    if (loading && orderRequests.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <HeaderNormal title="Захиалгын хүсэлтүүд" hasBack />
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

export default OrderRequests;
