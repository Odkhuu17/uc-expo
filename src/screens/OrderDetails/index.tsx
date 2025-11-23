import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';

import { Container, Content, Loader, NormalHeader } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useGetOrderQuery } from '@/gql/query/getOrder.generated';
import { moneyFormat } from '@/utils/helpers';

const OrderDetail = () => {
  const { number } = useLocalSearchParams();

  const { data, loading } = useGetOrderQuery({
    variables: {
      number: number as string,
    },
  });

  console.log(data);

  return (
    <Container>
      <NormalHeader title={number as string} hasBack />
      <Content edges={['bottom']} scrollable>
        {loading ? (
          <Loader />
        ) : (
          <Box gap="m">
            <Box gap="s">
              <Box borderBottomWidth={1} borderColor="border" pb="s">
                <Text color="baseBlue" fontFamily="Roboto_500Medium">
                  Авах хаяг
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хот/Аймаг:
                </Text>
                <Text variant="body2">
                  {data?.order?.origin?.address?.state?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Дүүрэг/Сум:
                </Text>
                <Text variant="body2">
                  {data?.order?.origin?.address?.district?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хороо/Баг:
                </Text>
                <Text variant="body2">
                  {data?.order?.origin?.address?.quarter?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хаягийн нэр:
                </Text>
                <Text variant="body2">
                  {data?.order?.origin?.address?.address1}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хаягийн дэлгэрэнгүй:
                </Text>
                <Text variant="body2">
                  {data?.order?.origin?.address?.address2}
                </Text>
              </Box>
            </Box>
            <Box gap="s">
              <Box borderBottomWidth={1} borderColor="border" pb="s">
                <Text color="baseBlue" fontFamily="Roboto_500Medium">
                  Хүргэх хаяг
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хот/Аймаг:
                </Text>
                <Text variant="body2">
                  {data?.order?.destination?.address?.state?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Дүүрэг/Сум:
                </Text>
                <Text variant="body2">
                  {data?.order?.destination?.address?.district?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хороо/Баг:
                </Text>
                <Text variant="body2">
                  {data?.order?.destination?.address?.quarter?.name}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хаягийн нэр:
                </Text>
                <Text variant="body2">
                  {data?.order?.destination?.address?.address1}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  Хаягийн дэлгэрэнгүй:
                </Text>
                <Text variant="body2">
                  {data?.order?.destination?.address?.address2}
                </Text>
              </Box>
            </Box>
            <Box gap="s">
              <Box borderBottomWidth={1} borderColor="border" pb="s">
                <Text color="baseBlue" fontFamily="Roboto_500Medium">
                  Ерөнхий мэдээлэл
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Захиалгын дугаар:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.number}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Ачааны төрөл:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.packageType}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Машины төрөл:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.carType}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Машины даац:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.carWeight}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Үнэ:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {moneyFormat(data?.order?.price || 0)}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Ачааны жин:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.packageWeight}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Ачих өдөр:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.travelAt &&
                    dayjs(data?.order?.travelAt).format('YYYY-MM-DD HH:mm')}
                </Text>
              </Box>
            </Box>
            <Box gap="s">
              <Box borderBottomWidth={1} borderColor="border" pb="s">
                <Text color="baseBlue" fontFamily="Roboto_500Medium">
                  Илгээгчийн мэдээлэл
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Овог нэр:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.senderName}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Утас:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.senderMobile}
                </Text>
              </Box>
            </Box>
            <Box gap="s">
              <Box borderBottomWidth={1} borderColor="border" pb="s">
                <Text color="baseBlue" fontFamily="Roboto_500Medium">
                  Хүлээн авагчийн мэдээлэл
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Овог нэр:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.receiverName}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text variant="body2">Утас:</Text>
                <Text variant="body2" fontFamily="Roboto_500Medium">
                  {data?.order?.receiverMobile}
                </Text>
              </Box>
            </Box>
          </Box>
        )}
      </Content>
    </Container>
  );
};

export default OrderDetail;
