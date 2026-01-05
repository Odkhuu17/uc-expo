import React, { Dispatch, SetStateAction } from 'react';
import { Delete03Icon, PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';

import { getImageUrl } from '@/utils/helpers';
import { Box, Text } from '@/components/Theme';
import { ButtonIcon } from '@/components';
import useSound from '@/hooks/useSound';
import { useDestroyOrderAudioMutation } from '@/gql/mutations/destroyOrderAudio.generated';

interface Props {
  audio: string;
  number: string;
  setAudio: Dispatch<SetStateAction<string | null>>;
}

const Player = ({ audio, number, setAudio }: Props) => {
  const [destroyOrderAudio, { loading: destroying }] =
    useDestroyOrderAudioMutation();
  const { play, stop, isLoaded, isPlaying, durationSec, currentTimeSec } =
    useSound(getImageUrl(audio));

  const onDestroyAudio = async () => {
    await destroyOrderAudio({ variables: { number } });
    setAudio(null);
  };

  const onTogglePlay = () => {
    isPlaying ? stop() : play();
  };

  return (
    <Box flexDirection="row" alignItems="center" gap="s">
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
      <ButtonIcon
        icon={Delete03Icon}
        onPress={onDestroyAudio}
        loading={destroying}
      />
    </Box>
  );
};

export default Player;
