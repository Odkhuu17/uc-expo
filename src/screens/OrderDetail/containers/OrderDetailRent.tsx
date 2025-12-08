import dayjs from 'dayjs';

import { BoxContainer } from '@/components';
import { Text } from '@/components/Theme';
import { GetOrderQuery } from '@/gql/query/getOrder.generated';
import { moneyFormat } from '@/utils/helpers';
import { SingleRow, Title } from '../components';

interface Props {
  order: GetOrderQuery['order'];
}

const OrderDetailRent = ({ order }: Props) => {
  return (
    <>
      <BoxContainer gap="s">
        <Title title="Ажиллах байршил" />
        {order?.origin?.state?.name && (
          <SingleRow label="Хот/Аймаг:" value={order?.origin?.state?.name} />
        )}
        {order?.origin?.district?.name && (
          <SingleRow
            label="Дүүрэг/Сум:"
            value={order?.origin?.district?.name}
          />
        )}
        {order?.origin?.quarter?.name && (
          <SingleRow label="Хороо/Баг:" value={order?.origin?.quarter?.name} />
        )}
        <SingleRow label="Хаягийн нэр:" value={order?.origin?.address1} />
        <SingleRow
          label="Хаягийн дэлгэрэнгүй:"
          value={order?.origin?.address2}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Ерөнхий мэдээлэл" />
        <SingleRow label="Захиалгын дугаар:" value={order?.number} />
        <SingleRow label="Машины төрөл:" value={order?.carType} />
        <SingleRow label="Даац/Хэмжээ:" value={order?.carWeight} />
        <SingleRow
          label="Үнэ:"
          value={order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
        />
        <SingleRow
          label="Ажил эхлэх өдөр:"
          value={order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
        />
        <SingleRow label="Ажиллах хоног:" value={order?.data?.rentDay} />
        <SingleRow label="Мот/цаг:" value={order?.data?.motHour} />
      </BoxContainer>
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Title title="Нэмэлт мэдээлэл" />
          <Text variant="body2">{order?.data?.additionalInfo}</Text>
        </BoxContainer>
      )}
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Title title="Дэлгэрэнгүй хаяг" />
          <Text variant="body2">{order?.data?.additionalAddress}</Text>
        </BoxContainer>
      )}
    </>
  );
};

export default OrderDetailRent;
