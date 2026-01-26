import React from 'react';
import { PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';

import { Box, Text } from '@/components/Theme';
import { ButtonIcon } from '@/components';
import useSound from '@/hooks/useSound';

interface Props {
  audio: string;
}

const Player = ({ audio }: Props) => {
  const { play, stop, isLoaded, isPlaying, durationSec, currentTimeSec } =
    useSound(audio);

  const onTogglePlay = () => {
    isPlaying ? stop() : play();
  };

  return (
    <Box flex={1} flexDirection="row" alignItems="center" gap="s">
      <ButtonIcon
        loading={!isLoaded}
        icon={isPlaying ? PauseIcon : PlayIcon}
        onPress={onTogglePlay}
      />
      <Text variant="body2" color="grey4">
        {Math.floor(currentTimeSec)} cек / {Math.floor(durationSec)} cек
      </Text>
    </Box>
  );
};

export default Player;
