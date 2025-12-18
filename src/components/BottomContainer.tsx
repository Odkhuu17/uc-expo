import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, useTheme } from './Theme';

interface Props {
  children: ReactNode;
}

const BottomContainer = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Box px="m" style={{ paddingBottom: insets.bottom + theme.spacing.m }}>
      {children}
    </Box>
  );
};

export default BottomContainer;
