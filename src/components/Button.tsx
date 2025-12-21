import {
  ActivityIndicator,
  TouchableOpacity,
  DimensionValue,
} from 'react-native';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native';
import { ResponsiveValue } from '@shopify/restyle';

import { Box, Text, Theme, useTheme } from './Theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  size?: keyof Theme['button'];
  loading?: boolean;
  fullWidth?: boolean;
  width?: ResponsiveValue<
    DimensionValue | undefined,
    { phone: number; tablet: number }
  >;
  icon?: IconSvgElement;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  title,
  onPress,
  variant = 'contained',
  color = 'primary',
  size = 'm',
  loading,
  width,
  icon,
  iconPosition = 'left',
}: Props) => {
  const theme = useTheme();

  const getBackgroundColor = (): keyof Theme['colors'] => {
    if (variant === 'text' || variant === 'outlined') return 'transparent';

    switch (color) {
      case 'secondary':
        return 'secondary';
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getTextColor = (): keyof Theme['colors'] => {
    if (variant === 'contained') return 'white';

    switch (color) {
      case 'secondary':
        return 'secondary';
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getBorderColor = (): keyof Theme['colors'] => {
    if (variant === 'text') return 'transparent';

    switch (color) {
      case 'secondary':
        return 'secondary';
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getTextVariant = () => {
    switch (size) {
      case 's':
        return 'button3';
      case 'l':
        return 'button';
      default:
        return 'button2';
    }
  };

  return (
    <Box width={width}>
      <TouchableOpacity onPress={onPress} disabled={loading}>
        <Box
          borderWidth={variant === 'outlined' ? 1 : 0}
          borderColor={getBorderColor()}
          backgroundColor={getBackgroundColor()}
          borderRadius="s"
          alignItems="center"
          height={theme.button[size]}
          justifyContent="center"
          px="l"
        >
          {loading ? (
            <ActivityIndicator color={theme.colors[getTextColor()]} />
          ) : (
            <Box
              flexDirection={iconPosition === 'left' ? 'row' : 'row-reverse'}
              gap="s"
            >
              {icon && (
                <HugeiconsIcon
                  icon={icon}
                  color={theme.colors[getTextColor()]}
                  size={theme.icon[size]}
                />
              )}
              <Text
                numberOfLines={1}
                variant={getTextVariant()}
                color={getTextColor()}
              >
                {title}
              </Text>
            </Box>
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Button;
