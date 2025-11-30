import { Add, Icon as IconType } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

import { Box, Text, useTheme } from '@/components/Theme';

interface Props {
  icon: IconType;
  onPress: () => void;
  title: string;
}

const OrderIconButton = ({ icon: Icon, onPress, title }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box gap="s" alignItems="center">
        <Box
          width={theme.button.l}
          height={theme.button.l}
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          borderWidth={2}
          borderColor="baseBlue"
          backgroundColor="white"
        >
          <Icon size={theme.icon.l} color={theme.colors.baseBlue} />
          <Box
            borderRadius="full"
            backgroundColor="darkBlue"
            position="absolute"
            bottom={-theme.icon.m / 2}
          >
            <Add size={theme.icon.m} color={theme.colors.white} />
          </Box>
        </Box>
        <Text variant="body2" textAlign="center">
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default OrderIconButton;
