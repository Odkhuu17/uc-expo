import { BoxProps } from '@shopify/restyle';
import { ReactNode } from 'react';

import { Box, Theme } from './Theme';

interface Props extends BoxProps<Theme> {
  children: ReactNode;
}

const BoxContainer = ({ children, ...props }: Props) => {
  return (
    <Box
      p="m"
      borderRadius="s"
      borderColor="border"
      backgroundColor="white"
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxContainer;
