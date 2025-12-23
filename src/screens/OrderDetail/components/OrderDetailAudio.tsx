import { useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import { AudioContext } from 'react-native-audio-api';
import { PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';

import { BoxContainer, ButtonIcon } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { formatDuration } from '@/utils/helpers';

interface Props {
  audio: string;
}

const OrderDetailAudio = ({ audio }: Props) => {
  const theme = useTheme();
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<any | null>(null);
  const bufferRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  console.log(currentTime, duration);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        // Fetch and decode audio
        const response = await fetch(audio);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        bufferRef.current = audioBuffer;
        setDuration(audioBuffer.duration);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch (e) {
          // Ignore if already stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audio]);

  useEffect(() => {
    if (isPlaying && !isSeeking) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, isSeeking]);

  const updateProgress = () => {
    if (audioContextRef.current && isPlaying && !isSeeking) {
      const elapsed =
        audioContextRef.current.currentTime -
        startTimeRef.current +
        pauseTimeRef.current;
      setCurrentTime(elapsed);

      if (elapsed >= duration) {
        setIsPlaying(false);
        setCurrentTime(0);
        pauseTimeRef.current = 0;
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }
  };

  const onTogglePlay = () => {
    if (!audioContextRef.current || !bufferRef.current) return;

    if (isPlaying) {
      // Pause
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
      pauseTimeRef.current = currentTime;
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      // Play
      const source = audioContextRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      source.connect(audioContextRef.current.destination);

      const offset = pauseTimeRef.current;
      startTimeRef.current = audioContextRef.current.currentTime - offset;
      source.start(0, offset);

      sourceRef.current = source;
      setIsPlaying(true);

      source.onEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        pauseTimeRef.current = 0;
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const onSlidingStart = () => {
    setIsSeeking(true);
  };

  const onValueChange = (value: number) => {
    if (isSeeking) {
      setCurrentTime(value);
    }
  };

  const onSlidingComplete = (value: number) => {
    if (!audioContextRef.current || !bufferRef.current) return;

    setIsSeeking(false);
    const wasPlaying = isPlaying;

    // Stop current playback
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    pauseTimeRef.current = value;
    setCurrentTime(value);

    // Resume if was playing
    if (wasPlaying) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      source.connect(audioContextRef.current.destination);
      setIsPlaying(true);

      startTimeRef.current = audioContextRef.current.currentTime - value;
      source.start(0, value);

      sourceRef.current = source;

      source.onEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        pauseTimeRef.current = 0;
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <BoxContainer gap="s">
      <Box flexDirection="row" alignItems="center">
        <Text variant="title" flex={1}>
          Дуу хоолой
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <ButtonIcon
          color="primary"
          icon={isPlaying ? PauseIcon : PlayIcon}
          size="m"
          backgroundColor="transparent"
          onPress={onTogglePlay}
        />
        <Box flex={1}>
          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={duration || 0}
            onSlidingStart={onSlidingStart}
            onValueChange={onValueChange}
            onSlidingComplete={onSlidingComplete}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.grey2}
            thumbTintColor={theme.colors.primary}
          />
        </Box>
        <Text variant="body2" color="grey4">
          {formatDuration(currentTime * 1000)} /{' '}
          {formatDuration(duration * 1000)}
        </Text>
      </Box>
    </BoxContainer>
  );
};

export default OrderDetailAudio;
