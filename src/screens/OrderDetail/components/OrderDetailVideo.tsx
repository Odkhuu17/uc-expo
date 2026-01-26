import { Cancel01Icon, PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';
import { useRef, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Video, {
  type VideoRef,
  type OnProgressData,
  type OnLoadData,
} from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ButtonIcon, Loader } from '@/components';
import { Box, Text } from '@/components/Theme';

interface Props {
  video: string;
}

const VideoComp = ({ video }: Props) => {
  const videoRef = useRef<VideoRef>(null);
  const modalVideoRef = useRef<VideoRef>(null);
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPaused, setModalPaused] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [startedPlay, setStartedPlay] = useState(false);

  const onPlay = () => {
    setShowOverlay(false);
    setModalVisible(true);
    setModalPaused(false);
  };

  const onClose = () => {
    setModalPaused(true);
    modalVideoRef.current?.seek?.(0);
    setModalVisible(false);
    setShowOverlay(true);
    setCurrentTime(0);
    setStartedPlay(false);
    setIsBuffering(false);
  };

  const togglePlayPause = () => {
    setModalPaused(prev => !prev);
  };

  const onSliderValueChange = (value: number) => {
    setIsSeeking(true);
    setCurrentTime(value);
  };

  const onSliderSlidingComplete = (value: number) => {
    modalVideoRef.current?.seek?.(value);
    setIsSeeking(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onBuffer = (buffer: { isBuffering: boolean }) => {
    setIsBuffering(buffer.isBuffering);
    console.log('Buffering:', buffer.isBuffering);
  };

  const onProgress = (data: OnProgressData) => {
    if (!isSeeking) {
      setCurrentTime(data.currentTime);
    }

    if (!startedPlay) {
      setStartedPlay(true);
    }

    if (data?.playableDuration < data?.currentTime) {
      setIsBuffering(false);
    }
  };

  const onLoad = (data: OnLoadData) => {
    console.log('Video loaded:', data);
    setDuration(data.duration);
  };

  return (
    <>
      <Box flex={1}>
        <Box width={100} height={100} borderRadius="s" overflow="hidden">
          <Video
            ref={videoRef}
            style={css.video}
            source={{ uri: video }}
            paused={true}
            controls={false}
            muted
            resizeMode="cover"
          />

          {showOverlay && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              backgroundColor="backdropLight"
              pointerEvents="auto"
            >
              <ButtonIcon color="white" icon={PlayIcon} onPress={onPlay} />
            </Box>
          )}
        </Box>
      </Box>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={onClose}
      >
        <Box
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
          flex={1}
          backgroundColor="black"
        >
          <Box flex={1} style={css.modalRoot}>
            <Box p="m" alignItems="flex-end">
              <ButtonIcon icon={Cancel01Icon} onPress={onClose} color="white" />
            </Box>
            <Box flex={1}>
              {modalVisible && (
                <>
                  <Video
                    ref={modalVideoRef}
                    style={css.modalVideo}
                    source={{ uri: video }}
                    paused={modalPaused}
                    resizeMode="contain"
                    playInBackground={false}
                    playWhenInactive={false}
                    onLoad={onLoad}
                    onBuffer={onBuffer}
                    onProgress={onProgress}
                    onEnd={onClose}
                    onError={onClose}
                  />
                  {(!startedPlay || isBuffering) && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Loader />
                    </Box>
                  )}
                </>
              )}
            </Box>

            {/* Custom controls overlay */}
            <Box p="m" backgroundColor="backdrop">
              <Box flexDirection="row" alignItems="center" gap="s">
                <ButtonIcon
                  icon={modalPaused ? PlayIcon : PauseIcon}
                  onPress={togglePlayPause}
                  color="white"
                  loading={!startedPlay}
                />
                <Text variant="body3" color="white">
                  {formatTime(currentTime)}
                </Text>
                <Box flex={1}>
                  <Slider
                    style={css.slider}
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#888888"
                    thumbTintColor="#FFFFFF"
                    onValueChange={onSliderValueChange}
                    onSlidingComplete={onSliderSlidingComplete}
                  />
                </Box>
                <Text variant="body3" color="white">
                  {formatTime(duration)}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const css = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  modalRoot: {
    backgroundColor: 'black',
  },
  modalVideo: {
    width: '100%',
    height: '100%',
  },
  closeText: {
    color: 'white',
    fontSize: 14,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default VideoComp;
