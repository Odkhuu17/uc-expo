import { Box, Text, Theme, useTheme } from '@/components/Theme';
import { Icon as IconType } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

interface Props {
  icon: IconType;
  title: string;
  onPress: () => void;
  color: keyof Theme['colors'];
}

const SingleContact = ({ title, icon: Icon, onPress, color }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="m" py="xs">
        <Icon size={theme.icon.m} color={theme.colors[color]} />
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleContact;
