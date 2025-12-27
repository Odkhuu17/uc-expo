import dayjs from 'dayjs';

import { BoxContainer } from '@/components';
import { Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import SingleRow from './SingleRow';
import Title from './Title';
import SingleCallRow from './SingleCallRow';

interface Props {
  order: GetOrderDetailQuery['order'];
}

const OrderDetailDelivery = ({ order }: Props) => {
  console.log(order, 'order---delivery');
  return (
    <>
      <BoxContainer gap="s">
        <Title title="Авах хаяг" />
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
          value={order?.data?.additional_address_origin}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Хүргэх хаяг" />
        {order?.destination?.state?.name && (
          <SingleRow
            label="Хот/Аймаг:"
            value={order?.destination?.state?.name}
          />
        )}
        {order?.destination?.district?.name && (
          <SingleRow
            label="Дүүрэг/Сум:"
            value={order?.destination?.district?.name}
          />
        )}
        {order?.destination?.quarter?.name && (
          <SingleRow
            label="Хороо/Баг:"
            value={order?.destination?.quarter?.name}
          />
        )}
        <SingleRow label="Хаягийн нэр:" value={order?.destination?.address1} />
        <SingleRow
          label="Хаягийн дэлгэрэнгүй:"
          value={order?.data?.additional_address_destination}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Ерөнхий мэдээлэл" />
        <SingleRow label="Захиалгын дугаар:" value={order?.number} />
        <SingleRow label="Ачааны төрөл:" value={order?.packageType} />
        <SingleRow label="Техникийн төрөл:" value={order?.carType} />
        <SingleRow
          label="Үнэ:"
          value={order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
        />
        <SingleRow label="НӨАТ:" value={order?.vatIncluded ? 'Тийм' : 'Үгүй'} />
        <SingleRow label="Ачааны жин:" value={order?.packageWeight} />
        <SingleRow
          label="Ачих өдөр:"
          value={order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
        />
        <SingleRow
          label="Ачих цаг:"
          value={order?.travelAt && dayjs(order?.travelAt).format('HH:mm')}
        />
      </BoxContainer>
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Title title="Нэмэлт мэдээлэл" />
          <Text variant="body2">{order?.data?.additionalInfo}</Text>
        </BoxContainer>
      )}
      <BoxContainer gap="s">
        <Title title="Илгээгчийн мэдээлэл" />
        <SingleRow label="Овог нэр:" value={order?.senderName} />
        <SingleCallRow label="Утас:" value={order?.senderMobile} />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Хүлээн авагчийн мэдээлэл" />
        <SingleRow label="Овог нэр:" value={order?.receiverName} />
        <SingleCallRow label="Утас:" value={order?.receiverMobile} />
      </BoxContainer>
    </>
  );
};

export default OrderDetailDelivery;
