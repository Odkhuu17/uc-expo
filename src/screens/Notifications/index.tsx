import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  HeaderNormal,
  BoxContainer,
} from '@/components';
import { GetMyDeliveryRequestsQuery } from '@/gql/queries/getMyDeliveryRequests.generated';
import { useGetMyNotificationsQuery } from '@/gql/queries/getMyNotifications.generated';

const DeliveryRequestsMy = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetMyNotificationsQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const deliveryRequests =
    data?.me?.notifications?.edges?.map(edge => edge.node) || [];
  const hasNextPage = data?.me?.notifications?.pageInfo?.hasNextPage || false;
  const endCursor = data?.me?.notifications?.pageInfo?.endCursor;

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

          const previousEdges = previousMe.notifications?.edges || [];
          const newEdges = nextMe?.notifications?.edges || [];

          return {
            ...previousResult,
            me: {
              ...previousMe,
              ...nextMe,
              notifications:
                previousMe.notifications && nextMe?.notifications
                  ? {
                      ...previousMe.notifications,
                      ...nextMe.notifications,
                      edges: [...previousEdges, ...newEdges],
                    }
                  : nextMe?.notifications ?? previousMe.notifications,
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
    return (
      <BoxContainer>
        <></>
      </BoxContainer>
    );
  };

  const renderFooter = () => {
    if (loading && deliveryRequests.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <HeaderNormal title="Мэдэгдлүүд" />
      <CustomFlatList
        data={deliveryRequests}
        loading={loading}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            title="Мэдэгдэл олдсонгүй"
            description="Мэдэгдэл үүсээгүй байна."
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

export default DeliveryRequestsMy;
