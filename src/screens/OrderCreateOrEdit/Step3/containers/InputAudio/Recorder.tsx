import { Mic01FreeIcons, PauseIcon } from '@hugeicons/core-free-icons';
import React from 'react';

import { ButtonIcon } from '@/components';
import { Box, Text } from '@/components/Theme';

interface Props {
  isRecording: boolean;
  isLoading: boolean;
  recordTime: string;
  onToggleRecord: () => void;
}

const Recorder = ({
  isRecording,
  isLoading,
  recordTime,
  onToggleRecord,
}: Props) => {
  return (
    <Box flexDirection="row" alignItems="center" gap="s">
      <ButtonIcon
        loading={isLoading}
        icon={isRecording ? PauseIcon : Mic01FreeIcons}
        onPress={onToggleRecord}
      />
      <Text variant="body2" color="grey4">
        {isRecording ? recordTime : 'Дуу бичлэг нэмэх'}
      </Text>
    </Box>
  );
};

export default Recorder;
