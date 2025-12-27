import { HugeiconsIcon } from '@hugeicons/react-native';
import { Alert02Icon } from '@hugeicons/core-free-icons';

import BoxContainer from './BoxContainer';
import { Text, useTheme } from './Theme';

interface Props {
  title: string;
  description: string;
}

const Empty = ({ title, description }: Props) => {
  const theme = useTheme();

  return (
    <BoxContainer alignItems="center" justifyContent="center" gap="xs">
      <HugeiconsIcon icon={Alert02Icon} />
      <Text variant="body1" fontWeight={600}>
        {title}
      </Text>
      <Text variant="body2" color="grey3">
        {description}
      </Text>
    </BoxContainer>
  );
};

export default Empty;
