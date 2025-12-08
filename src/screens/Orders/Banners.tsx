import { Image } from 'expo-image';
import { useState } from 'react';
import {
    LayoutChangeEvent,
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

const BANNER_HEIGHT = 180;

const banners = [require('assets/images/order-banner.jpg')];

const Banners = () => {
  //   const { data, loading } = useGetBannersQuery({
  //     variables: {
  //       offset: 0,
  //       first: 25,
  //       filter: {},
  //     },
  //   });

  const loading = false;

  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  if (loading || banners.length === 0) {
    return null;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

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
        {banners.map(banner => (
          <TouchableOpacity key={banner} activeOpacity={0.9}>
            <Box
              width={width}
              height={BANNER_HEIGHT}
              borderRadius="m"
              overflow="hidden"
              backgroundColor="grey4"
            >
              <Image source={banner} style={css.img} contentFit="cover" />
            </Box>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      {banners.length > 1 && (
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="xs"
          mt="s"
        >
          {banners.map((_, index: number) => (
            <Box
              key={index}
              width={activeIndex === index ? 20 : 8}
              height={8}
              borderRadius="full"
              backgroundColor={activeIndex === index ? 'baseBlue' : 'grey3'}
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
