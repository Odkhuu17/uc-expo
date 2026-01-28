import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Box, Text } from '@/components/Theme';
import { isRentOrder } from '@/utils/helpers';
import { Label, BoxContainer, SingleOrderBody } from '@/components';
import { INavigation } from '@/navigations';
import { GetOrdersMyQuery } from '@/gql/queries/getOrdersMy.generated';

interface Props {
  item: NonNullable<GetOrdersMyQuery['me']>['orders']['edges'][0]['node'];
}

const SingleMyOrder = ({ item }: Props) => {
  const navigation = useNavigation<INavigation>();

  const isRent = isRentOrder(item?.carType);

  const onNavigateToDetail = () => {
    navigation.navigate('OrderDetail', { number: item?.number! });
  };

  return (
    <>
      <TouchableOpacity onPress={onNavigateToDetail}>
        <BoxContainer
          borderWidth={1}
          borderColor="border"
          overflow="hidden"
          gap="s"
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex={1}>
              <Text color={isRent ? 'rent' : 'primary'} variant="title">
                {isRent ? item?.carType : item?.packageType}
              </Text>
            </Box>
            <Label
              text={isRent ? 'Техник түрээс' : 'Ачаа тээвэр'}
              backgroundColor={isRent ? 'rent' : 'delivery'}
            />
          </Box>
          <SingleOrderBody item={item} />
          {item?.status === 'accepted' || item?.status === 'completed' ? (
            <Box alignItems="center" flexDirection="row">
              <Text variant="body2">Төлөв: </Text>
              {item?.status === 'accepted' ? (
                <Label text="Баталгаажсан" backgroundColor="success" />
              ) : (
                <Label text="Дууссан" backgroundColor="error" />
              )}
            </Box>
          ) : (
            <Box alignItems="center" flexDirection="row">
              <Text variant="body2">Хүсэлтийн тоо: </Text>
              <Label
                text={String(item?.deliveryRequests.totalCount || 0)}
                backgroundColor="error"
              />
            </Box>
          )}
        </BoxContainer>
      </TouchableOpacity>
    </>
  );
};

export default SingleMyOrder;
