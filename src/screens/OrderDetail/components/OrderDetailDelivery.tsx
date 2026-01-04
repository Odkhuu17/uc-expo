import dayjs from 'dayjs';

import { BoxContainer, RowValue, RowValueCall } from '@/components';
import { Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import Title from './Title';

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
          <RowValue label="Хот/Аймаг:" value={order?.origin?.state?.name} />
        )}
        {order?.origin?.district?.name && (
          <RowValue label="Дүүрэг/Сум:" value={order?.origin?.district?.name} />
        )}
        {order?.origin?.quarter?.name && (
          <RowValue label="Хороо/Баг:" value={order?.origin?.quarter?.name} />
        )}
        <RowValue label="Хаягийн нэр:" value={order?.origin?.address1} />
        <RowValue
          label="Хаягийн дэлгэрэнгүй:"
          value={order?.data?.additional_address_origin}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Хүргэх хаяг" />
        {order?.destination?.state?.name && (
          <RowValue
            label="Хот/Аймаг:"
            value={order?.destination?.state?.name}
          />
        )}
        {order?.destination?.district?.name && (
          <RowValue
            label="Дүүрэг/Сум:"
            value={order?.destination?.district?.name}
          />
        )}
        {order?.destination?.quarter?.name && (
          <RowValue
            label="Хороо/Баг:"
            value={order?.destination?.quarter?.name}
          />
        )}
        <RowValue label="Хаягийн нэр:" value={order?.destination?.address1} />
        <RowValue
          label="Хаягийн дэлгэрэнгүй:"
          value={order?.data?.additional_address_destination}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Ерөнхий мэдээлэл" />
        <RowValue label="Захиалгын дугаар:" value={order?.number} />
        <RowValue label="Ачааны төрөл:" value={order?.packageType} />
        <RowValue label="Техникийн төрөл:" value={order?.carType} />
        <RowValue
          label="Үнэ:"
          value={order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
        />
        <RowValue label="НӨАТ:" value={order?.vatIncluded ? 'Тийм' : 'Үгүй'} />
        <RowValue label="Ачааны жин:" value={`${order?.packageWeight} тн`} />
        <RowValue
          label="Ачих өдөр:"
          value={order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
        />
        <RowValue
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
        <RowValue label="Овог нэр:" value={order?.senderName} />
        <RowValueCall label="Утас:" value={order?.senderMobile} />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Хүлээн авагчийн мэдээлэл" />
        <RowValue label="Овог нэр:" value={order?.receiverName} />
        <RowValueCall label="Утас:" value={order?.receiverMobile} />
      </BoxContainer>
    </>
  );
};

export default OrderDetailDelivery;
