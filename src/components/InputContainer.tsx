import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { Box, Theme, useTheme } from './Theme';

interface Props {
  width?: ViewStyle['width'];
  size?: keyof Theme['button'];
  height?: number;
  children: ReactNode;
}

const InputContainer = ({ width, size = 'm', height, children }: Props) => {
  const theme = useTheme();

  return (
    <Box
      height={height || theme.button[size]}
      width={width}
      borderRadius="s"
      borderColor="border"
      borderWidth={1}
      backgroundColor="white"
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default InputContainer;
