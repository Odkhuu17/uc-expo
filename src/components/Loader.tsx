import { ActivityIndicator } from 'react-native';

import { Box, useTheme } from './Theme';

interface Props {
  color?: string;
}

const Loader = ({ color }: Props) => {
  const theme = useTheme();

  return (
    <Box p="m" alignItems="center">
      <ActivityIndicator size="small" color={color || theme.colors.primary} />
    </Box>
  );
};

export default Loader;
