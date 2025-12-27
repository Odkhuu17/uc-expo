import React, { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  HeaderNormal,
  Label,
} from '@/components';
import SingleOrder from '@/containers/SingleOrder';
import {
  GetMyDeliveryRequestsQuery,
  useGetMyDeliveryRequestsQuery,
} from '@/gql/queries/getMyDeliveryRequests.generated';
import { Box, Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';

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
    return (
      <>
        <SingleOrder item={item?.order}>
          <Box pb="m" px="m" gap="s">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="body2">Миний үнэ</Text>
              <Text fontWeight={600} variant="body2">
                {moneyFormat(item?.price || '')}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="body2">Төлөв</Text>
              <Label
                backgroundColor={
                  item?.status === 'pending'
                    ? 'pending'
                    : item?.status === 'accepted'
                    ? 'success'
                    : 'error'
                }
                text={
                  item?.status === 'pending'
                    ? 'Хүлээгдэж байна'
                    : item?.status === 'accepted'
                    ? 'Баталгаажсан'
                    : 'Идэвхгүй'
                }
              />
            </Box>
          </Box>
        </SingleOrder>
      </>
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
