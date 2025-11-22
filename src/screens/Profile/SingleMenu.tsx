import { useTheme } from '@shopify/restyle';
import { ArrowRight2, Icon as IconType } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

import { Box, Text } from '@/components/Theme';

interface Props {
  title: string;
  icon: IconType;
  onPress: () => void;
}

const SingleMenu = ({ title, icon: Icon, onPress }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="xs">
        <Box flex={1} flexDirection="row" alignItems="center" gap="xs">
          <Icon size={theme.icon.m} color={theme.colors.baseBlue} />
          <Text>{title}</Text>
        </Box>
        <ArrowRight2 size={theme.icon.m} />
      </Box>
    </TouchableOpacity>
  );
};

export default SingleMenu;
