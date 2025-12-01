import dayjs from 'dayjs';

import { BoxContainer } from '@/components';
import { Box, Text } from '@/components/Theme';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { moneyFormat } from '@/utils/helpers';

interface Props {
  order: GetOrderQuery['order'];
}

const OrderDetailDelivery = ({ order }: Props) => {
  return (
    <>
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Авах хаяг
          </Text>
        </Box>
        {order?.origin?.address?.state?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хот/Аймаг:
            </Text>
            <Text variant="body2">{order?.origin?.state?.name}</Text>
          </Box>
        )}
        {order?.origin?.district?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Дүүрэг/Сум:
            </Text>
            <Text variant="body2">{order?.origin?.district?.name}</Text>
          </Box>
        )}
        {order?.origin?.quarter?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хороо/Баг:
            </Text>
            <Text variant="body2">{order?.origin?.quarter?.name}</Text>
          </Box>
        )}
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн нэр:
          </Text>
          <Text variant="body2">{order?.origin?.address1}</Text>
        </Box>
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн дэлгэрэнгүй:
          </Text>
          <Text variant="body2">{order?.origin?.address2}</Text>
        </Box>
      </BoxContainer>
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Хүргэх хаяг
          </Text>
        </Box>
        {order?.destination?.state?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хот/Аймаг:
            </Text>
            <Text variant="body2">{order?.destination?.state?.name}</Text>
          </Box>
        )}
        {order?.destination?.district?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Дүүрэг/Сум:
            </Text>
            <Text variant="body2">{order?.destination?.district?.name}</Text>
          </Box>
        )}
        {order?.destination?.quarter?.name && (
          <Box flexDirection="row" gap="s">
            <Text variant="body2" fontFamily="Roboto_500Medium">
              Хороо/Баг:
            </Text>
            <Text variant="body2">{order?.destination?.quarter?.name}</Text>
          </Box>
        )}
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн нэр:
          </Text>
          <Text variant="body2">{order?.destination?.address1}</Text>
        </Box>
        <Box flexDirection="row" gap="s">
          <Text variant="body2" fontFamily="Roboto_500Medium">
            Хаягийн дэлгэрэнгүй:
          </Text>
          <Text variant="body2">{order?.destination?.address2}</Text>
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
          <Text variant="body2">Ачааны төрөл:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.packageType}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Машины төрөл:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.carType}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Үнэ:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">НӨАТ:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.vatIncluded ? 'Тийм' : 'Үгүй'}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Ачааны жин:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.packageWeight}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Тоо ширхэг:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.data?.quantity}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Ачих өдөр:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Ачих цаг:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.travelAt && dayjs(order?.travelAt).format('HH:mm')}
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
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Илгээгчийн мэдээлэл
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Овог нэр:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.senderName}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Утас:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.senderMobile}
          </Text>
        </Box>
      </BoxContainer>
      <BoxContainer gap="s">
        <Box borderBottomWidth={1} borderColor="border" pb="s">
          <Text color="baseBlue" fontFamily="Roboto_500Medium">
            Хүлээн авагчийн мэдээлэл
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Овог нэр:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.receiverName}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body2">Утас:</Text>
          <Text variant="body2" fontFamily="Roboto_500Medium">
            {order?.receiverMobile}
          </Text>
        </Box>
      </BoxContainer>
    </>
  );
};

export default OrderDetailDelivery;
