import { Box, Text, useTheme } from '@/components/Theme';
import { Icon as IconType } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

interface Props {
  icon: IconType;
  title: string;
  onPress: () => void;
}

const SingleContact = ({ title, icon: Icon, onPress }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="m" py="xs">
        <Icon size={theme.icon.m} />
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleContact;
