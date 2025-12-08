import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';

import {
  BoxContainer,
  Button,
  Container,
  Loader,
  NormalHeader,
  ScrollableContent,
} from '@/components';
import { Box, makeStyles } from '@/components/Theme';
import { useGetOrderQuery } from '@/gql/query/getOrder.generated';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl, isRentOrder } from '@/utils/helpers';
import { OrderDetailAudio, OrderDetailVideo } from './components';
import {
  OrderDestroyButton,
  OrderDetailDelivery,
  OrderDetailRent,
  OrderRequestButton,
} from './containers';

const useStyles = makeStyles(theme => ({
  img: {
    width: 100,
    height: 100,
  },
  scrollView: {
    gap: theme.spacing.m,
  },
}));

const OrderDetail = () => {
  const { mode } = useAppSelector(state => state.general);
  const { number } = useLocalSearchParams<{ number: string }>();
  const styles = useStyles();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const router = useRouter();

  const { data, loading } = useGetOrderQuery({
    variables: {
      number,
    },
  });

  const isRent = isRentOrder(data?.order?.carType);
  const hasImages = data?.order?.images && data?.order?.images.length > 0;

  const onPressEdit = () => {
    router.navigate(`/orders/${number}/edit`);
  };

  const onPressRequests = () => {
    router.navigate(`/orders/${number}/requests`);
  };

  const onShowImageView = () => {
    setIsImageViewVisible(true);
  };

  const onHideImageView = () => {
    setIsImageViewVisible(false);
  };

  return (
    <>
      <Container>
        <NormalHeader title={number as string} hasBack />
        <ScrollableContent edges={['bottom']}>
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
                <OrderDetailVideo
                  video={`${process.env.EXPO_PUBLIC_IMAGE_URL}${data?.order?.video}`}
                />
              )}
              {data?.order?.audio && (
                <OrderDetailAudio
                  audio={`${process.env.EXPO_PUBLIC_IMAGE_URL}${data?.order?.audio}`}
                />
              )}
              {isRent ? (
                <OrderDetailRent order={data?.order} />
              ) : (
                <OrderDetailDelivery order={data?.order} />
              )}
              {data?.order?.my && mode === 'shipper' && (
                <>
                  <Button
                    title={`Захиалгын хүсэлтүүд (${data?.order?.deliveryRequests?.totalCount || 0})`}
                    onPress={onPressRequests}
                  />
                  <Box flexDirection="row" gap="s">
                    <Box flex={1}>
                      <Button
                        backgroundColor="green"
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
              {mode === 'driver' && data?.order?.status !== 'accepted' && (
                <OrderRequestButton data={data?.order} />
              )}
            </Box>
          )}
        </ScrollableContent>
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
