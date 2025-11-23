import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Icon as IconType } from 'iconsax-react-nativejs';
import { Box, Theme, useTheme } from './Theme';

interface Props {
  onPress: () => void;
  backgroundColor?: keyof Theme['colors'];
  size?: keyof Theme['button'];
  loading?: boolean;
  icon: IconType;
  color?: keyof Theme['colors'];
}

const IconButton = ({
  onPress,
  backgroundColor = 'baseBlue',
  color = 'black',
  size = 'm',
  loading,
  icon: Icon,
}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={1}
        borderColor={color}
        backgroundColor={backgroundColor}
        borderRadius="full"
        alignItems="center"
        height={theme.button[size]}
        width={theme.button[size]}
        justifyContent="center"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Icon
            size={size === 'm' ? theme.icon.m : theme.icon.s}
            color={theme.colors[color]}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default IconButton;
