import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  BottomContainer,
  Button,
  Container,
  CustomFlatList,
  Empty,
  HeaderNormal,
} from '@/components';

import {
  GetMyTrucksQuery,
  useGetMyTrucksLazyQuery,
} from '@/gql/queries/getMyTruck.generated';
import { INavigationProps } from '@/navigations';
import SingleTruck from './SingleTruck';

interface Props {
  navigation: INavigationProps<'TrucksMy'>['navigation'];
}

const TrucksMy = ({ navigation }: Props) => {
  const [getMyTrucks, { data, loading }] = useGetMyTrucksLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useFocusEffect(
    useCallback(() => {
      getMyTrucks();
    }, []),
  );

  const renderItem = ({
    item,
  }: {
    item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
  }) => {
    return <SingleTruck item={item} refetch={getMyTrucks} />;
  };

  const onPressTruckAdd = () => {
    navigation.navigate('TruckAddOrEdit', { id: undefined });
  };

  return (
    <Container>
      <HeaderNormal title="Миний машин" hasBack />
      <CustomFlatList
        data={data?.me?.trucks}
        refreshing={loading}
        loading={loading}
        onRefresh={getMyTrucks}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty title="Машин" description="Машин олдсонгүй" />
        }
      />
      <BottomContainer>
        <Button title="Машин нэмэх" onPress={onPressTruckAdd} />
      </BottomContainer>
    </Container>
  );
};

export default TrucksMy;
