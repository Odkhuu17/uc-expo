import { Link } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import {
  BoxContainer,
  Container,
  CustomFlatList,
  Empty,
  Loader,
  NormalHeader,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import {
  GetOrdersQuery,
  useGetOrdersQuery,
} from '@/gql/query/getOrders.generated';
import dayjs from 'dayjs';
import { Box as BoxIcon, LocationDiscover } from 'iconsax-react-nativejs';

const DriverOrdersScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const theme = useTheme();

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
    return (
      <Link href={`/driver/orders/${item?.number}`} asChild>
        <TouchableOpacity>
          <BoxContainer gap="s">
            <Text color="lightBlue2" fontFamily="Roboto_500Medium">
              {item?.title}
            </Text>
            <Box flexDirection="row" gap="xs">
              <Text variant="body3" color="grey2">
                {dayjs(item?.createdAt).format('YYYY-MM-DD')}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center" gap="s">
              <Box>
                <BoxIcon size={theme.icon.xl2} color={theme.colors.grey2} />
              </Box>
              <Box flex={1}>
                <Box flexDirection="row" alignItems="center" gap="xs">
                  <Box alignItems="center">
                    <LocationDiscover
                      color={theme.colors.lightBlue2}
                      size={theme.icon.s}
                    />
                  </Box>
                  <Box>
                    <Text variant="body2">
                      {item?.origin?.address?.address1}
                    </Text>
                    <Text variant="body2">
                      {item?.origin?.address?.address2}
                    </Text>
                  </Box>
                </Box>
                <Box
                  alignItems="center"
                  width={theme.icon.s}
                  justifyContent="center"
                >
                  <Box height={20}>
                    <Box
                      width={1}
                      overflow="hidden"
                      top={-5}
                      bottom={-5}
                      position="absolute"
                    >
                      <Box
                        borderWidth={1}
                        width={1}
                        height="100%"
                        borderStyle="dashed"
                        borderColor="baseBlue"
                      ></Box>
                    </Box>
                  </Box>
                </Box>
                <Box flexDirection="row" alignItems="center" gap="xs">
                  <Box>
                    <LocationDiscover
                      color={theme.colors.lightBlue2}
                      size={theme.icon.s}
                    />
                  </Box>
                  <Box>
                    <Text variant="body2">
                      {item?.destination?.address?.address1}
                    </Text>
                    <Text variant="body2">
                      {item?.destination?.address?.address2}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </BoxContainer>
        </TouchableOpacity>
      </Link>
    );
  };

  const renderFooter = () => {
    if (loading && orders.length > 0) {
      return <Loader />;
    }
    return null;
  };

  return (
    <Container>
      <NormalHeader title="Захиалгууд" />
      <CustomFlatList
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
