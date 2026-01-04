import { ReactNode } from 'react';

import { Box, Text } from '@/components/Theme';

interface Props {
  label: string;
  value?: string | number | undefined;
  children?: ReactNode;
}

const RowValue = ({ label, value, children }: Props) => {
  return (
    <Box flexDirection="row" gap="s" justifyContent="space-between" alignItems="center">
      <Text variant="body2">{label}</Text>
      {children || (
        <Box flex={1}>
          <Text variant="label" textAlign="right">
            {value}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default RowValue;
