import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Icon as IconType } from 'iconsax-react-nativejs';
import { Box, Theme, useTheme } from './Theme';

interface Props {
  onPress: () => void;
  backgroundColor?: keyof Theme['colors'];
  size?: 's' | 'm';
  loading?: boolean;
  icon: IconType;
}

const IconButton = ({
  onPress,
  backgroundColor = 'baseBlue',
  size = 'm',
  loading,
  icon: Icon,
}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={1}
        borderColor="border"
        backgroundColor={backgroundColor}
        borderRadius="full"
        alignItems="center"
        height={size === 'm' ? 40 : 30}
        width={size === 'm' ? 40 : 30}
        justifyContent="center"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Icon size={size === 'm' ? theme.icon.m : theme.icon.s} />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default IconButton;
