import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native';
import { TouchableOpacity } from 'react-native';

import { Box, Text, Theme, useTheme } from '@/components/Theme';

interface Props {
  icon: IconSvgElement;
  title: string;
  onPress: () => void;
  color: keyof Theme['colors'];
}

const SingleContact = ({ title, icon, onPress, color }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="m" py="xs">
        <HugeiconsIcon
          icon={icon}
          size={theme.icon.m}
          color={theme.colors[color]}
        />
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleContact;
