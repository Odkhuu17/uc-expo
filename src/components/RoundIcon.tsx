import { IconProps, Icon as IconType } from 'iconsax-react-nativejs';
import React from 'react';

import { Box, Theme, useTheme } from './Theme';

export interface RoundIconProps {
  icon: IconType;
  backgroundColor: keyof Theme['colors'];
  borderColor: keyof Theme['colors'];
  iconColor?: keyof Theme['colors'];
  size: keyof Theme['icon'];
  variant?: IconProps['variant'];
}

function RoundIcon({
  backgroundColor,
  borderColor,
  size,
  iconColor,
  icon: Icon,
  variant,
}: RoundIconProps) {
  const theme = useTheme();

  return (
    <Box
      borderRadius="full"
      borderWidth={1}
      borderColor={borderColor}
      p="xs"
      backgroundColor={backgroundColor}
      overflow="hidden"
    >
      <Box
        width={theme.icon[size]}
        height={theme.icon[size]}
        justifyContent="center"
        alignItems="center"
      >
        <Icon
          color={
            (iconColor && theme.colors[iconColor]) || theme.colors[borderColor]
          }
          variant={variant}
          size={theme.icon[size]}
        />
      </Box>
    </Box>
  );
}

export default RoundIcon;
