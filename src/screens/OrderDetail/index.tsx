import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';

import {
  BoxContainer,
  Button,
  Container,
  Content,
  Loader,
  NormalHeader,
} from '@/components';
import { Box, makeStyles } from '@/components/Theme';
import { useDestroyOrderMutation } from '@/gql/mutations/destroyOrderMutation.generated';
import { useGetOrderQuery } from '@/gql/query/getOrder.generated';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl, isRentOrder } from '@/utils/helpers';
import OrderDetailAudio from './OrderDetailAudio';
import OrderDetailDelivery from './OrderDetailDelivery';
import OrderDetailRent from './OrderDetailRent';
import OrderDetailVideo from './OrderDetailVideo';
import OrderRequestButton from './OrderRequestButton';
import OrderRequests from './OrderRequests';

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
  const { number } = useLocalSearchParams();
  const styles = useStyles();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const router = useRouter();

  const { data, loading } = useGetOrderQuery({
    variables: {
      number: number as string,
    },
  });

  const [orderDestroy, { loading: orderDestroyLoading }] =
    useDestroyOrderMutation();

  const isRent = isRentOrder(data?.order?.carType);
  const hasImages = data?.order?.images && data?.order?.images.length > 0;

  const onPressDelete = () => {
    Alert.alert(
      'Захиалга устгах',
      `Та энэ захиалгыг устгахдаа итгэлтэй байна уу?`,
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Устгах',
          style: 'destructive',
          onPress: () => {
            orderDestroy({ variables: { id: data?.order?.id || '' } });
          },
        },
      ]
    );
  };

  const onPressEdit = () => {
    router.navigate(`/orders/${number}/edit`);
  };

  return (
    <>
      <Container>
        <NormalHeader title={number as string} hasBack />
        <Content edges={['bottom']} scrollable>
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
                      <TouchableOpacity
                        key={index}
                        onPress={() => setIsImageViewVisible(true)}
                      >
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
                <Box flexDirection="row" gap="s">
                  <Box flex={1}>
                    <Button
                      backgroundColor="green"
                      title="Засах"
                      onPress={onPressEdit}
                    />
                  </Box>
                  <Box flex={1}>
                    <Button
                      backgroundColor="red"
                      title="Устгах"
                      loading={orderDestroyLoading}
                      onPress={onPressDelete}
                    />
                  </Box>
                </Box>
              )}
              <OrderRequestButton data={data?.order} />
              <OrderRequests order={data?.order} />
            </Box>
          )}
        </Content>
      </Container>
      {hasImages && (
        <ImageView
          images={
            data?.order?.images?.map(img => ({ uri: getImageUrl(img) })) || []
          }
          imageIndex={0}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
        />
      )}
    </>
  );
};

export default OrderDetail;
