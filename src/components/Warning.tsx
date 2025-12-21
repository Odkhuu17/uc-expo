import { HugeiconsIcon } from '@hugeicons/react-native';
import { Alert02Icon } from '@hugeicons/core-free-icons';

import BoxContainer from './BoxContainer';
import { Box, Text } from './Theme';

interface Props {
  description?: string;
  type?: 'warning' | 'error';
}

const Warning = ({ description, type = 'warning' }: Props) => {
  return (
    <BoxContainer
      backgroundColor={type === 'warning' ? 'amber1' : 'red1'}
      flexDirection="row"
      gap="s"
    >
      <HugeiconsIcon icon={Alert02Icon} />
      <Box flex={1}>
        <Text variant="body2">{description}</Text>
      </Box>
    </BoxContainer>
  );
};

export default Warning;
