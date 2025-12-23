import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native';

import { Box, Theme, useTheme } from './Theme';

interface Props {
  onPress: () => void;
  backgroundColor?: keyof Theme['colors'];
  size?: keyof Theme['button'];
  loading?: boolean;
  icon: IconSvgElement;
  color?: 'primary' | 'secondary';
  variant?: 'text' | 'outlined' | 'contained';
}

const ButtonIcon = ({
  onPress,
  variant = 'outlined',
  color = 'primary',
  size = 'm',
  loading,
  icon,
}: Props) => {
  const theme = useTheme();

  const getBackgroundColor = (): keyof Theme['colors'] => {
    if (variant === 'outlined') return 'transparent';

    switch (color) {
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const getTextColor = (): keyof Theme['colors'] => {
    if (variant === 'contained') return 'white';

    switch (color) {
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const getBorderColor = (): keyof Theme['colors'] => {
    switch (color) {
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={1}
        borderColor={getBorderColor()}
        backgroundColor={getBackgroundColor()}
        borderRadius="full"
        alignItems="center"
        height={theme.button[size]}
        width={theme.button[size]}
        justifyContent="center"
      >
        {loading ? (
          <ActivityIndicator color={theme.colors[getTextColor()]} />
        ) : (
          <HugeiconsIcon
            icon={icon}
            size={size === 'm' ? theme.icon.m : theme.icon.s}
            color={theme.colors[getTextColor()]}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default ButtonIcon
