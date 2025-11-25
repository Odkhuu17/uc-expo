import { useVideoPlayer, VideoView } from 'expo-video';
import { CloseCircle, VideoPlay } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';

interface Props {
  video: string;
  setVideo: Dispatch<SetStateAction<string>>;
}

const OrderVideo = ({ video, setVideo }: Props) => {
  const player = useVideoPlayer(video);
  const theme = useTheme();
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

  const onRemoveVideo = () => {
    Alert.alert('Бичлэг устгах', 'Та устгахдаа итгэлтэй байна уу?', [
      {
        text: 'Буцах',
        style: 'cancel',
      },
      {
        text: 'Устгах',
        style: 'destructive',
        onPress: () => {
          setVideo?.('');
        },
      },
    ]);
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
        <TouchableOpacity onPress={onRemoveVideo}>
          <CloseCircle size={theme.icon.m} />
        </TouchableOpacity>
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

        {/* <IconButton
          color="baseBlue"
          icon={status.playing ? Pause : Play}
          size="m"
          backgroundColor="transparent"
          onPress={onTogglePlay}
        /> */}
        {/* <Text variant="body2" color="grey2">
          {formatDuration(status.currentTime * 1000)} /{' '}
          {formatDuration(status.duration * 1000)}
        </Text> */}
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

export default OrderVideo;
