import { useState } from 'react';
import {
  Alert,
  Image,
  LayoutChangeEvent,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Box } from '@/components/Theme';
import { useGetBannersQuery } from '@/gql/queries/getBanners.generated';

const BANNER_HEIGHT = 180;

const Banners = () => {
  const { data, loading } = useGetBannersQuery({
    variables: {
      offset: 0,
      first: 10,
    },
  });

  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  if (loading || data?.banners?.nodes?.length === 0) {
    return null;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  console.log(data?.banners);

  return (
    <Box onLayout={onLayout}>
      <Animated.ScrollView
        horizontal
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {data?.banners?.nodes?.map(banner => {
          const onPress = async () => {
            if (banner.permalink) {
              try {
                const supported = await Linking.canOpenURL(banner.permalink);

                if (supported) {
                  await Linking.openURL(banner.permalink).catch(e =>
                    console.log(e),
                  );
                } else {
                  console.log(
                    `Don't know how to open URI: ${banner.permalink}`,
                  );
                }
              } catch (err) {
                console.log('An error occurred with Linking: ', err);
              }
            }
          };

          return (
            <TouchableOpacity
              key={banner.id}
              activeOpacity={0.9}
              onPress={onPress}
            >
              <Box
                width={width}
                height={BANNER_HEIGHT}
                borderRadius="m"
                overflow="hidden"
                backgroundColor="grey4"
              >
                <Image
                  source={{ uri: banner.image }}
                  style={css.img}
                  resizeMode="cover"
                />
              </Box>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      {data?.banners?.totalCount && data?.banners?.totalCount > 1 && (
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="xs"
          mt="s"
        >
          {data?.banners?.nodes?.map((_, index: number) => (
            <Box
              key={index}
              width={activeIndex === index ? 20 : 8}
              height={8}
              borderRadius="full"
              backgroundColor={activeIndex === index ? 'primary' : 'grey3'}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const css = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Banners;
