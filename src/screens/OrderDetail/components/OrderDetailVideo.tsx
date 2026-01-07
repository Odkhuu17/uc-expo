import { PlayIcon } from '@hugeicons/core-free-icons';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView, VideoViewRef } from 'react-native-video';

import { ButtonIcon } from '@/components';
import { Box } from '@/components/Theme';
import { getImageUrl } from '@/utils/helpers';
import InputLabel from '@/components/InputLabel';

interface Props {
  video: string;
}

const Video = ({ video }: Props) => {
  const player = useVideoPlayer(getImageUrl(video));
  const videoViewRef = useRef<VideoViewRef>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onPlay = () => {
    videoViewRef?.current?.enterFullscreen();
    player.play();
  };

  const onFullscreenChange = (fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
  };

  return (
    <Box flex={1}>
      <Box width={100} height={100} borderRadius="s" overflow="hidden">
        <VideoView
          style={css.video}
          player={player}
          controls={isFullscreen}
          resizeMode="cover"
          ref={videoViewRef}
          onFullscreenChange={onFullscreenChange}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          backgroundColor="backdropLight"
        >
          <ButtonIcon color="white" icon={PlayIcon} onPress={onPlay} />
        </Box>
      </Box>
    </Box>
  );
};

const css = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Video;
