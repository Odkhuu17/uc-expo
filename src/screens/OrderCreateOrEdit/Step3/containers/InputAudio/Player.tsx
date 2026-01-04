import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Sound from 'react-native-nitro-sound';
import { Delete03Icon, PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';

import { getImageUrl } from '@/utils/helpers';
import { Box, Text } from '@/components/Theme';
import { ButtonIcon } from '@/components';
import { useDestroyOrderAudioMutation } from '@/gql/mutations/destroyOrderAudio.generated';

interface Props {
  audio: string;
  number: string;
  setAudio: Dispatch<SetStateAction<string | null>>;
}

const Player = ({ audio, number, setAudio }: Props) => {
  const [destroyOrderAudio, { loading: destroying }] =
    useDestroyOrderAudioMutation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');

  const onDestroyAudio = async () => {
    await destroyOrderAudio({ variables: { number } });
    onStopPlay();
    setAudio(null);
  };
  // Initialize duration when audio changes
  useEffect(() => {
    const initDuration = async () => {
      try {
        // Start player briefly to get duration
        await Sound.startPlayer(getImageUrl(audio));
        Sound.addPlayBackListener(e => {
          if (e.duration) {
            setDuration(Sound.mmssss(Math.floor(e.duration)));
            Sound.removePlayBackListener();
            Sound.stopPlayer();
          }
        });
      } catch (error) {
        console.error('Failed to load duration:', error);
      }
    };

    if (audio) {
      initDuration();
    }

    return () => {
      Sound.removePlayBackListener();
    };
  }, [audio]);

  const onStartPlay = async () => {
    setIsLoading(true);
    try {
      await Sound.startPlayer(getImageUrl(audio));
      Sound.addPlayBackListener(e => {
        setPlayTime(Sound.mmssss(Math.floor(e.currentPosition)));
      });

      // Use the proper playback end listener
      Sound.addPlaybackEndListener(e => {
        setIsPlaying(false);
        setPlayTime('00:00:00');
      });

      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start playback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStopPlay = async () => {
    setIsLoading(true);
    try {
      await Sound.stopPlayer();
      Sound.removePlayBackListener();
      Sound.removePlaybackEndListener();
      setIsPlaying(false);
      setPlayTime('00:00:00');
    } catch (error) {
      console.error('Failed to stop playback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTogglePlay = () => {
    if (isPlaying) {
      onStopPlay();
    } else {
      onStartPlay();
    }
  };

  return (
    <Box flexDirection="row" alignItems="center" gap="s">
      <Box flex={1} flexDirection="row" alignItems="center" gap="s">
        <ButtonIcon
          loading={isLoading}
          icon={isPlaying ? PauseIcon : PlayIcon}
          onPress={onTogglePlay}
        />
        <Text variant="body2" color="grey4">
          {playTime} / {duration}
        </Text>
      </Box>
      <ButtonIcon
        icon={Delete03Icon}
        onPress={onDestroyAudio}
        loading={destroying}
      />
    </Box>
  );
};

export default Player;
