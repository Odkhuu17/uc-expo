import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  HeaderNormal,
} from '@/components';
import {
  GetMyDeliveryRequestsQuery,
  useGetMyDeliveryRequestsQuery,
} from '@/gql/queries/getMyDeliveryRequests.generated';
import SingleOrderRequest from './SingleOrderRequest';

const DeliveryRequestsMy = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetMyDeliveryRequestsQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const deliveryRequests =
    data?.me?.deliveryRequests?.edges?.map(edge => edge.node) || [];
  const hasNextPage =
    data?.me?.deliveryRequests?.pageInfo?.hasNextPage || false;
  const endCursor = data?.me?.deliveryRequests?.pageInfo?.endCursor;

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

          const previousMe = previousResult.me;
          const nextMe = fetchMoreResult.me;

          if (!previousMe) return fetchMoreResult;

          const previousEdges = previousMe.deliveryRequests?.edges || [];
          const newEdges = nextMe?.deliveryRequests?.edges || [];

          return {
            ...previousResult,
            me: {
              ...previousMe,
              ...nextMe,
              deliveryRequests:
                previousMe.deliveryRequests && nextMe?.deliveryRequests
                  ? {
                      ...previousMe.deliveryRequests,
                      ...nextMe.deliveryRequests,
                      edges: [...previousEdges, ...newEdges],
                    }
                  : nextMe?.deliveryRequests ?? previousMe.deliveryRequests,
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
      GetMyDeliveryRequestsQuery['me']
    >['deliveryRequests']['edges'][0]['node'];
  }) => {
    return <SingleOrderRequest item={item?.order} />;
  };

  const renderFooter = () => {
    if (loading && deliveryRequests.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <HeaderNormal title="Миний хүсэлтүүд" />
      <CustomFlatList
        data={deliveryRequests}
        loading={loading}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            title="Захиалгын хүсэлт олдсонгүй"
            description="Та одоогоор захиалгын хүсэлт үүсгээгүй байна."
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

export default DeliveryRequestsMy;
