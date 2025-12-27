import { PlayIcon } from '@hugeicons/core-free-icons';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  useEvent,
  useVideoPlayer,
  VideoView,
  VideoViewRef,
} from 'react-native-video';

import { ButtonIcon } from '@/components';
import { Box, Text } from '@/components/Theme';
import { getImageUrl } from '@/utils/helpers';
import dayjs from 'dayjs';

interface Props {
  video: string;
}

const Video = ({ video }: Props) => {
  const player = useVideoPlayer(getImageUrl(video));
  const videoViewRef = useRef<VideoViewRef>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);

  useEvent(player, 'onLoad', ({ duration }) => {
    if (Number.isFinite(duration)) {
      setDurationSeconds(duration);
    }
  });

  const onPlay = () => {
    videoViewRef?.current?.enterFullscreen();
    player.play();
  };

  const onFullscreenChange = (fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
  };

  return (
    <Box flex={1} alignItems="center" flexDirection="row">
      <Box flexDirection="row" alignItems="center" gap="s">
        <ButtonIcon icon={PlayIcon} onPress={onPlay} />
        <Text>
          {durationSeconds != null
            ? dayjs(durationSeconds * 1000).format('mm:ss')
            : ''}
        </Text>
      </Box>

      <VideoView
        style={css.video}
        player={player}
        controls={isFullscreen}
        resizeMode="cover"
        ref={videoViewRef}
        onFullscreenChange={onFullscreenChange}
      />
    </Box>
  );
};

const css = StyleSheet.create({
  video: {
    height: 0,
    width: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Video;
