import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { CloseCircle, Pause, Play } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { formatDuration } from '@/utils/helpers';
import useOnRemoveAudio from '../hooks/useOnRemoveAudio';

interface Props {
  audio: string;
  setAudio: Dispatch<SetStateAction<string>>;
}

const OrderAudioPlayer = ({ audio, setAudio }: Props) => {
  const player = useAudioPlayer(audio);
  const status = useAudioPlayerStatus(player);
  const theme = useTheme();
  const { onRemoveAudio } = useOnRemoveAudio({ setAudio });

  const onTogglePlay = () => {
    if (status.playing) {
      player.pause();
    } else {
      if (status.didJustFinish || status.currentTime >= status.duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const onSlidingComplete = (value: number) => {
    player.seekTo(value);
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
          Дуу хоолой
        </Text>
        <TouchableOpacity onPress={() => onRemoveAudio({})}>
          <CloseCircle size={theme.icon.m} />
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <IconButton
          color="baseBlue"
          icon={status.playing ? Pause : Play}
          size="m"
          backgroundColor="transparent"
          onPress={onTogglePlay}
        />
        <Box flex={1}>
          <Slider
            value={status.currentTime}
            minimumValue={0}
            maximumValue={status.duration || 0}
            onSlidingComplete={onSlidingComplete}
            minimumTrackTintColor={theme.colors.baseBlue}
            maximumTrackTintColor={theme.colors.grey}
            thumbTintColor={theme.colors.baseBlue}
          />
        </Box>
        <Text variant="body2" color="grey2">
          {formatDuration(status.currentTime * 1000)} /{' '}
          {formatDuration(status.duration * 1000)}
        </Text>
      </Box>
    </BoxContainer>
  );
};

export default OrderAudioPlayer;
