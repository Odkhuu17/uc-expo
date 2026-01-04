import { Call } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Linking, TouchableOpacity } from 'react-native';

import { Box, Text, useTheme } from '@/components/Theme';

interface Props {
  label: string;
  value: string | number | undefined;
}

const RowValueCall = ({ label, value }: Props) => {
  const theme = useTheme();

  const onPressCall = () => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <Box flexDirection="row" gap="s" alignItems="center">
      <Text variant="body2">{label}</Text>
      <Box flex={1} alignItems="flex-end">
        <TouchableOpacity onPress={onPressCall}>
          <Box
            backgroundColor="grey2"
            p="s"
            borderRadius="xs"
            flexDirection="row"
            alignItems="center"
            gap="xs"
          >
            <HugeiconsIcon icon={Call} size={theme.icon.s} />
            <Text variant="body2" textAlign="right">
              {value}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default RowValueCall;
