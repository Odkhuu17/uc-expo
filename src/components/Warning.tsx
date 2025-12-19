import { Warning2 } from 'iconsax-react-nativejs';

import BoxContainer from './BoxContainer';
import { Box, Text, useTheme } from './Theme';

interface Props {
  description?: string;
  type?: 'warning' | 'error';
}

const Warning = ({ description, type = 'warning' }: Props) => {
  const theme = useTheme();

  return (
    <BoxContainer
      backgroundColor={type === 'warning' ? 'yellowLight' : 'redLight'}
      flexDirection="row"
      gap="s"
    >
      <Warning2 size={theme.icon.l} />
      <Box flex={1}>
        <Text variant="body2">{description}</Text>
      </Box>
    </BoxContainer>
  );
};

export default Warning;
