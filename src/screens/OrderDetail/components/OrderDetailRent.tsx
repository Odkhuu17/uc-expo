import dayjs from 'dayjs';

import { BoxContainer } from '@/components';
import { Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { SingleRow, Title } from '../components';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import SingleCallRow from './SingleCallRow';

interface Props {
  order: GetOrderDetailQuery['order'];
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
          value={order?.data?.additional_address}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Ерөнхий мэдээлэл" />
        <SingleRow label="Захиалгын дугаар:" value={order?.number} />
        <SingleRow label="Техникийн төрөл:" value={order?.carType} />
        <SingleRow label="Даац/Хэмжээ:" value={order?.carWeight} />
        <SingleRow
          label="Үнэ:"
          value={order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
        />
        <SingleRow
          label="Ажил эхлэх өдөр:"
          value={order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
        />
        <SingleRow label="Ажиллах хоног:" value={order?.data?.rent_day} />
        <SingleRow label="Ажиллах цаг:" value={order?.data?.mot_hour} />
        <SingleRow
          label="Захиалгын дэлгэрэнгүй:"
          value={order?.data?.additional_info}
        />
      </BoxContainer>
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Title title="Нэмэлт мэдээлэл" />
          <Text variant="body2">{order?.data?.additionalInfo}</Text>
        </BoxContainer>
      )}
      {order?.data?.additionalAddress && (
        <BoxContainer gap="s">
          <Title title="Дэлгэрэнгүй хаяг" />
          <Text variant="body2">{order?.data?.additionalAddress}</Text>
        </BoxContainer>
      )}
      <BoxContainer gap="s">
        <Title title="Захиалагчийн мэдээлэл" />
        <SingleRow label="Нэр:" value={order?.user?.firstName} />
        <SingleCallRow label="Утас:" value={order?.user?.mobile} />
      </BoxContainer>
    </>
  );
};

export default OrderDetailRent;
