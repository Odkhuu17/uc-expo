import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Box, Text } from '@/components/Theme';
import { isRentOrder, moneyFormat } from '@/utils/helpers';
import { Label, BoxContainer, SingleOrderBody } from '@/components';
import { GetOrdersQuery } from '@/gql/queries/getOrders.generated';
import { INavigation } from '@/navigations';

interface Props {
  item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
}

const SingleOrderRequest = ({ item }: Props) => {
  const navigation = useNavigation<INavigation>();

  const isRent = isRentOrder(item?.carType);

  const onNavigateToDetail = () => {
    navigation.navigate('OrderDetail', { number: item?.number! });
  };

  return (
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
        <Box gap="s" pt="s" borderTopWidth={1} borderColor="border">
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
      </BoxContainer>
    </TouchableOpacity>
  );
};

export default SingleOrderRequest;
