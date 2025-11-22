import { Warning2 } from 'iconsax-react-nativejs';

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
      <Warning2 size={theme.icon.xl2} color={theme.colors.baseBlue} />
      <Text variant="body1" fontWeight={600}>
        {title}
      </Text>
      <Text variant="body2" color="grey2">
        {description}
      </Text>
    </BoxContainer>
  );
};

export default Empty;
