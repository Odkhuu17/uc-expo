import { useVideoPlayer, VideoView } from 'expo-video';
import { VideoPlay } from 'iconsax-react-nativejs';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text } from '@/components/Theme';

interface Props {
  video: string;
}

const OrderDetailVideo = ({ video }: Props) => {
  const player = useVideoPlayer(video);
  const videoViewRef = useRef<VideoView>(null);

  const handlePlayFullscreen = () => {
    videoViewRef.current?.enterFullscreen();
  };

  const onFullscreenEnter = () => {
    player.play();
  };

  const onFullscreenExit = () => {
    player.pause();
  };

  return (
    <BoxContainer gap="s">
      <Box flexDirection="row" alignItems="center">
        <Text
          variant="body1"
          color="baseBlue"
          fontFamily="Roboto_500Medium"
          flex={1}
        >
          Бичлэг
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <VideoView
          ref={videoViewRef}
          style={css.video}
          player={player}
          allowsFullscreen
          onFullscreenEnter={onFullscreenEnter}
          onFullscreenExit={onFullscreenExit}
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
          <IconButton
            icon={VideoPlay}
            backgroundColor="backdrop"
            color="white"
            onPress={handlePlayFullscreen}
          />
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
