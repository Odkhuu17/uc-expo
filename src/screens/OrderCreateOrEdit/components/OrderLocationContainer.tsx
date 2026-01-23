import { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Location05Icon } from '@hugeicons/core-free-icons';

import { Box, useTheme } from '@/components/Theme';
import { BoxContainer } from '@/components';

interface Props {
  location1: ReactNode;
  location2?: ReactNode;
}

const OrderLocationContainer = ({ location1, location2 }: Props) => {
  const theme = useTheme();

  return (
    <BoxContainer borderWidth={2} borderColor="primary">
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box flex={1}>
          {location1}
          {location2 && (
            <>
              <Box width="100%" height={1} backgroundColor="border" my="s" />
              {location2}
            </>
          )}
        </Box>
        <Box alignItems="center" gap="xs" py="m">
          {location2 && (
            <>
              <Box
                height={15}
                width={15}
                borderRadius="full"
                borderWidth={2}
                borderColor="primary"
              />
              <Box width={1} flex={1} backgroundColor="border" />
            </>
          )}
          <HugeiconsIcon icon={Location05Icon} size={theme.icon.m} />
        </Box>
      </Box>
    </BoxContainer>
  );
};

export default OrderLocationContainer;
