import { useState } from 'react';
import { Image, Linking, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';
import dayjs from 'dayjs';
import { RefreshControl } from 'react-native-gesture-handler';

import {
  BoxContainer,
  Button,
  Container,
  Loader,
  HeaderNormal,
  ContentScrollable,
  RowValue,
  Label,
} from '@/components';
import { Box, makeStyles } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl, isRentOrder, moneyFormat } from '@/utils/helpers';
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
                <BoxContainer flexDirection="row" alignItems="center">
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.scrollView}
                  >
                    {data?.order?.images?.map((image, index) => (
                      <TouchableOpacity key={index} onPress={onShowImageView}>
                        <Box
                          borderWidth={1}
                          borderRadius="m"
                          borderColor="border"
                          overflow="hidden"
                        >
                          <Image
                            source={{ uri: getImageUrl(image) }}
                            style={styles.img}
                          />
                        </Box>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </BoxContainer>
              )}
              {data?.order?.video && (
                <BoxContainer>
                  <OrderDetailVideo video={getImageUrl(data?.order?.video)} />
                </BoxContainer>
              )}
              {data?.order?.audio && (
                <BoxContainer>
                  <OrderDetailAudio audio={getImageUrl(data?.order?.audio)} />
                </BoxContainer>
              )}
              {isRent ? (
                <OrderDetailRent order={data?.order} />
              ) : (
                <OrderDetailDelivery order={data?.order} />
              )}
              {data?.order?.my &&
                mode === 'shipper' &&
                data?.order?.status !== 'accepted' && (
                  <>
                    <Button
                      title={`Захиалгын хүсэлтүүд (${
                        data?.order?.deliveryRequests?.totalCount || 0
                      })`}
                      color={isRent ? 'rent' : 'delivery'}
                      onPress={onPressRequests}
                    />
                    <Box flexDirection="row" gap="s">
                      <Box flex={1}>
                        <Button
                          color="success"
                          title="Засах"
                          onPress={onPressEdit}
                        />
                      </Box>
                      <Box flex={1}>
                        <OrderDestroyButton order={data?.order} />
                      </Box>
                    </Box>
                  </>
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
                  <Button
                    title="Техник хянах"
                    onPress={onPressTrack}
                    color={isRent ? 'rent' : 'delivery'}
                  />
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
                  {data?.order?.status !== 'accepted' ? (
                    <OrderRequestButton
                      data={data?.order}
                      refetch={refetch}
                      isRent={isRent}
                    />
                  ) : (
                    <Box flexDirection="row" gap="m">
                      {data?.order?.origin && (
                        <Box flex={1}>
                          <Button
                            color={isRent ? 'rent' : 'delivery'}
                            title={isRent ? 'Ажиллах байршил' : 'Авах байршил'}
                            onPress={onPressOriginLocation}
                          />
                        </Box>
                      )}
                      {data?.order?.destination && !isRent && (
                        <Box flex={1}>
                          <Button
                            color="delivery"
                            title="Хүргэх байршил"
                            onPress={onPressDestinationLocation}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </ContentScrollable>
      </Container>
      {hasImages && (
        <ImageView
          images={
            data?.order?.images?.map(img => ({ uri: getImageUrl(img) })) || []
          }
          imageIndex={0}
          visible={isImageViewVisible}
          onRequestClose={onHideImageView}
        />
      )}
    </>
  );
};

export default OrderDetail;
