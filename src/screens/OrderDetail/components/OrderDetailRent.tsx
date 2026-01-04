import dayjs from 'dayjs';

import { BoxContainer, RowValue, RowValueCall } from '@/components';
import { Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { Title } from '../components';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';

interface Props {
  order: GetOrderDetailQuery['order'];
}

const OrderDetailRent = ({ order }: Props) => {
  return (
    <>
      <BoxContainer gap="s">
        <Title title="Ажиллах байршил" color="rent" />
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
          value={order?.data?.additional_address}
        />
      </BoxContainer>
      <BoxContainer gap="s">
        <Title title="Ерөнхий мэдээлэл" color="rent" />
        <RowValue label="Захиалгын дугаар:" value={order?.number} />
        <RowValue label="Техникийн төрөл:" value={order?.carType} />
        <RowValue label="Даац/Хэмжээ:" value={order?.carWeight} />
        <RowValue
          label="Үнэ:"
          value={order?.price ? moneyFormat(order?.price) : 'Тохиролцоно'}
        />
        <RowValue
          label="Ажил эхлэх өдөр:"
          value={order?.travelAt && dayjs(order?.travelAt).format('YYYY-MM-DD')}
        />
        <RowValue label="Ажиллах хоног:" value={order?.data?.rent_day} />
        <RowValue label="Ажиллах цаг:" value={order?.data?.mot_hour} />
        <RowValue
          label="Захиалгын дэлгэрэнгүй:"
          value={order?.data?.additional_info}
        />
      </BoxContainer>
      {order?.data?.additionalInfo && (
        <BoxContainer gap="s">
          <Title title="Нэмэлт мэдээлэл" color="rent" />
          <Text variant="body2">{order?.data?.additionalInfo}</Text>
        </BoxContainer>
      )}
      {order?.data?.additionalAddress && (
        <BoxContainer gap="s">
          <Title title="Дэлгэрэнгүй хаяг" color="rent" />
          <Text variant="body2">{order?.data?.additionalAddress}</Text>
        </BoxContainer>
      )}
      <BoxContainer gap="s">
        <Title title="Захиалагчийн мэдээлэл" color="rent" />
        <RowValue label="Нэр:" value={order?.user?.firstName} />
        <RowValueCall label="Утас:" value={order?.user?.mobile} />
      </BoxContainer>
    </>
  );
};

export default OrderDetailRent;
