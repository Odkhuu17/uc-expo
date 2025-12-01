import dayjs from 'dayjs';

import { BoxContainer } from '@/components';
import { Box, Text } from '@/components/Theme';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { moneyFormat } from '@/utils/helpers';

interface Props {
  order: GetOrderQuery['order'];
}

const OrderDetailRent = ({ order }: Props) => {
  return (
    <>
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Ажиллах байршил
          </Text>
        </Box>
        {order?.origin?.address?.state?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хот/Аймаг:
            </Text>
            <Text variant="body2">{order?.origin?.address?.state?.name}</Text>
          </Box>
        )}
        {order?.origin?.address?.district?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Дүүрэг/Сум:
            </Text>
            <Text variant="body2">
              {order?.origin?.address?.district?.name}
            </Text>
          </Box>
        )}
        {order?.origin?.address?.quarter?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хороо/Баг:
            </Text>
            <Text variant="body2">{order?.origin?.address?.quarter?.name}</Text>
          </Box>
        )}
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн нэр:
          </Text>
          <Text variant="body2">{order?.origin?.address?.address1}</Text>
        </Box>
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн дэлгэрэнгүй:
          </Text>
          <Text variant="body2">{order?.origin?.address?.address2}</Text>
        </Box>
      </BoxContainer>
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Ерөнхий мэдээлэл
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Захиалгын дугаар:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.number}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Машины төрөл:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.carType}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Даац/Хэмжээ:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.carWeight}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Үнэ:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Ажил эхлэх өдөр:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Ажиллах хоног:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.data?.rentDay}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Мот/цаг:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.data?.motHour}
          </Text>
        </Box>
      </BoxContainer>
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Box borderBottomWidth={1} borderColor="border" pb="s">
            <Text color="baseBlue" fontFamily="Roboto_500Medium">
              Нэмэлт мэдээлэл
            </Text>
          </Box>
          <Text variant="body2">{order?.data?.additionalInfo}</Text>
        </BoxContainer>
      )}
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Box borderBottomWidth={1} borderColor="border" pb="s">
            <Text color="baseBlue" fontFamily="Roboto_500Medium">
               Дэлгэрэнгүй хаяг
            </Text>
          </Box>
          <Text variant="body2">{order?.data?.additionalAddress}</Text>
        </BoxContainer>
      )}
    </>
  );
};

export default OrderDetailRent;
