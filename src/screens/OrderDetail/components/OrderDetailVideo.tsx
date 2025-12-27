import Video, { VideoRef } from 'react-native-video';
import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { PlayCircleIcon } from '@hugeicons/core-free-icons';

import { BoxContainer, ButtonIcon } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';

interface Props {
  video: string;
}

const OrderDetailVideo = ({ video }: Props) => {
  const theme = useTheme();
  const videoRef = useRef<VideoRef>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayFullscreen = async () => {
    videoRef.current?.presentFullscreenPlayer();
  };

  const onFullscreenPlayerDidPresent = () => {
    videoRef.current?.resume();
  };

  const onFullscreenPlayerWillDismiss = () => {
    videoRef.current?.seek(0);
    videoRef.current?.pause();
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    setIsLoading(isBuffering);
  };

  return (
    <BoxContainer gap="s">
      <Box flexDirection="row" alignItems="center">
        <Text variant="title" flex={1}>
          Бичлэг
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <Video
          source={{ uri: video }}
          ref={videoRef}
          style={css.video}
          resizeMode="cover"
          fullscreen
          onFullscreenPlayerDidPresent={onFullscreenPlayerDidPresent}
          onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onBuffer={onBuffer}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <ButtonIcon
              icon={PlayCircleIcon}
              backgroundColor="backdrop"
              onPress={handlePlayFullscreen}
            />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};

const css = StyleSheet.create({
  video: {
    width: '100%',
    height: 150,
  },
});

export default OrderDetailVideo;
