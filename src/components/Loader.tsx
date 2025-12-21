import { ActivityIndicator } from 'react-native';

import { Box, useTheme } from './Theme';

const Loader = () => {
  const theme = useTheme();

  return (
    <Box p="m" alignItems="center">
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </Box>
  );
};

export default Loader;
