import { useState } from 'react';

import {
  Container,
  CustomFlatList,
  Empty,
  Loader,
  HeaderNormal,
  Button,
  BottomContainer,
} from '@/components';
import SingleOrder from '@/containers/SingleOrder';
import {
  GetOrdersMyQuery,
  useGetOrdersMyQuery,
} from '@/gql/queries/getOrdersMy.generated';
import { INavigationProps } from '@/navigations';
import Status from '@/containers/SingleOrder/Status';

interface Props {
  navigation: INavigationProps<'OrdersMy'>['navigation'];
}

const OrdersMy = ({ navigation }: Props) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetOrdersMyQuery({
    variables: {
      ordersFirst: 10,
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

  const onPressCreateOrder = () => {
    navigation.navigate('OrderCreateOrEdit', { number: undefined });
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
          ordersFirst: 20,
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

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetOrdersMyQuery['me']>['orders']['edges'][0]['node'];
  }) => {
    return (
      <SingleOrder item={item}>
        <Status item={item} />
      </SingleOrder>
    );
  };

  return (
    <Container>
      <HeaderNormal title="Миний захиалгууд" />
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
      <BottomContainer noInsets>
        <Button title="Захиалга үүсгэх" onPress={onPressCreateOrder} />
      </BottomContainer>
    </Container>
  );
};

export default OrdersMy;
