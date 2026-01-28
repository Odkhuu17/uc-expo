import { useState } from 'react';
import { Image, Linking, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';
import dayjs from 'dayjs';
import { RefreshControl } from 'react-native';
import { PencilEdit01Icon } from '@hugeicons/core-free-icons';

import {
  BoxContainer,
  Button,
  Container,
  Loader,
  HeaderNormal,
  ContentScrollable,
  RowValue,
  Label,
  ButtonIcon,
  Warning,
} from '@/components';
import { Box, makeStyles } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { isRentOrder, moneyFormat } from '@/utils/helpers';
import {
  OrderDetailAudio,
  OrderDetailDelivery,
  OrderDetailVideo,
  Title,
} from './components';
import OrderDestroyButton from './containers/OrderDestroyButton';
import OrderRequestButton from './containers/OrderRequestButton';
import { INavigationProps } from '@/navigations';
import { useGetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import OrderDetailRent from './components/OrderDetailRent';
import InputLabel from '@/components/InputLabel';
import OrderCloseButton from './containers/OrderCloseButton';

const useStyles = makeStyles(theme => ({
  img: {
    width: 100,
    height: 100,
  },
  scrollView: {
    gap: theme.spacing.m,
  },
}));

interface Props {
  navigation: INavigationProps<'OrderDetail'>['navigation'];
  route: INavigationProps<'OrderDetail'>['route'];
}

const OrderDetail = ({ navigation, route }: Props) => {
  const { mode } = useAppSelector(state => state.general);
  const { number } = route.params;
  const styles = useStyles();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const { data, loading, refetch } = useGetOrderDetailQuery({
    variables: {
      number,
    },
  });

  const isRent = isRentOrder(data?.order?.carType);
  const hasImages = data?.order?.images && data?.order?.images.length > 0;

  const onPressEdit = () => {
    navigation.navigate('OrderCreateOrEdit', { number });
  };

  const onPressRequests = () => {
    navigation.navigate('OrderRequests', { number });
  };

  const onShowImageView = () => {
    setIsImageViewVisible(true);
  };

  const onHideImageView = () => {
    setIsImageViewVisible(false);
  };

  const onPressTrack = () => {
    navigation.navigate('TrackTruck', { number });
  };

  const onPressOriginLocation = () => {
    const origin = data?.order?.origin;

    if (origin?.latitude && origin?.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${origin.latitude},${origin.longitude}`;
      Linking.openURL(url).catch(err =>
        console.error('Failed to open Google Maps:', err),
      );
    }
  };

  const onPressDestinationLocation = () => {
    const destination = data?.order?.destination;

    if (destination?.latitude && destination?.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`;
      Linking.openURL(url).catch(err =>
        console.error('Failed to open Google Maps:', err),
      );
    }
  };

  return (
    <>
      <Container>
        <HeaderNormal title={number} hasBack />
        <ContentScrollable
          edges={['bottom']}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={loading} />
          }
        >
          {loading ? (
            <Loader />
          ) : (
            <Box gap="m">
              {hasImages && (
                <BoxContainer gap="s">
                  <InputLabel label="Зураг, бичлэг" />
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.scrollView}
                  >
                    {data?.order?.video && (
                      <OrderDetailVideo video={data?.order?.video} />
                    )}
                    {data?.order?.images?.map((image, index) => (
                      <TouchableOpacity key={index} onPress={onShowImageView}>
                        <Box
                          borderWidth={1}
                          borderRadius="m"
                          borderColor="border"
                          overflow="hidden"
                        >
                          <Image source={{ uri: image }} style={styles.img} />
                        </Box>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </BoxContainer>
              )}
              {data?.order?.audio && (
                <BoxContainer>
                  <OrderDetailAudio audio={data?.order?.audio} />
                </BoxContainer>
              )}
              {isRent ? (
                <OrderDetailRent order={data?.order} />
              ) : (
                <OrderDetailDelivery order={data?.order} />
              )}
              {data?.order?.my &&
                data?.order?.status === 'accepted' &&
                mode === 'shipper' && <OrderCloseButton order={data?.order} />}
              {data?.order?.my &&
                mode === 'shipper' &&
                data?.order?.status !== 'accepted' &&
                data?.order?.status !== 'completed' && (
                  <Box flexDirection="row" gap="s">
                    <ButtonIcon
                      shape="square"
                      icon={PencilEdit01Icon}
                      color="grey4"
                      onPress={onPressEdit}
                    />
                    <OrderDestroyButton order={data?.order} />
                    <Box flex={1}>
                      <Button
                        title={`Захиалгын хүсэлтүүд (${
                          data?.order?.deliveryRequests?.totalCount || 0
                        })`}
                        onPress={onPressRequests}
                      />
                    </Box>
                  </Box>
                )}
              {mode === 'shipper' && data?.order?.acceptedDeliveryRequest && (
                <BoxContainer gap="m">
                  <Title
                    title="Жолоочын мэдээлэл"
                    color={isRent ? 'rent' : 'delivery'}
                  />
                  <RowValue
                    label="Үнэ:"
                    value={moneyFormat(
                      data?.order?.acceptedDeliveryRequest?.price,
                    )}
                  />
                  <RowValue
                    label="Овог"
                    value={data?.order?.acceptedDeliveryRequest?.user?.lastName}
                  />
                  <RowValue
                    label="Нэр"
                    value={
                      data?.order?.acceptedDeliveryRequest?.user?.firstName
                    }
                  />
                  <RowValue
                    label="Утасны дугаар"
                    value={data?.order?.acceptedDeliveryRequest?.user?.mobile}
                  />
                  {data?.order?.status !== 'completed' && (
                    <Button
                      title={isRent ? 'Техник хянах' : 'Ачаа хянах'}
                      onPress={onPressTrack}
                      color={isRent ? 'rent' : 'delivery'}
                    />
                  )}
                </BoxContainer>
              )}
              {mode === 'driver' && data?.order?.myRequest && (
                <BoxContainer gap="m">
                  <Title
                    title="Миний хүсэлт"
                    color={isRent ? 'rent' : 'delivery'}
                  />
                  <RowValue
                    label="Үнэ:"
                    value={moneyFormat(data?.order?.myRequest?.price)}
                  />
                  <RowValue
                    label="Илгээсэн огноо:"
                    value={dayjs(data?.order?.myRequest?.updatedAt).format(
                      'YYYY-MM-DD HH:mm',
                    )}
                  />
                  <RowValue label="Төлөв:">
                    <Label
                      text={
                        data?.order?.myRequest?.status === 'pending'
                          ? 'Хүлээгдэж буй'
                          : 'Зөвшөөрөгдсөн'
                      }
                      backgroundColor={
                        data?.order?.myRequest?.status === 'pending'
                          ? 'pending'
                          : 'success'
                      }
                    />
                  </RowValue>
                </BoxContainer>
              )}
              {mode === 'driver' && (
                <>
                  {data?.order?.status !== 'accepted' &&
                  data?.order?.status !== 'completed' ? (
                    <OrderRequestButton
                      data={data?.order}
                      refetch={refetch}
                      isRent={isRent}
                    />
                  ) : (
                    data?.order?.status !== 'completed' && (
                      <Box flexDirection="row" gap="m">
                        {data?.order?.origin && (
                          <Box flex={1}>
                            <Button
                              title={
                                isRent ? 'Ажиллах байршил' : 'Авах байршил'
                              }
                              onPress={onPressOriginLocation}
                            />
                          </Box>
                        )}
                        {data?.order?.destination && !isRent && (
                          <Box flex={1}>
                            <Button
                              title="Хүргэх байршил"
                              onPress={onPressDestinationLocation}
                            />
                          </Box>
                        )}
                      </Box>
                    )
                  )}
                </>
              )}
              {data?.order?.status === 'completed' && (
                <Warning type="warning" description="Захиалга дууссан байна!" />
              )}
            </Box>
          )}
        </ContentScrollable>
      </Container>
      {hasImages && (
        <ImageView
          images={data?.order?.images?.map(img => ({ uri: img })) || []}
          imageIndex={0}
          visible={isImageViewVisible}
          onRequestClose={onHideImageView}
        />
      )}
    </>
  );
};

export default OrderDetail;
