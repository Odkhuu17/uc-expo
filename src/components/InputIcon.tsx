import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native';

import { Box, useTheme } from './Theme';

interface Props {
  icon: IconSvgElement;
  position: 'left' | 'right';
}

const InputIcon = ({ icon, position }: Props) => {
  const theme = useTheme();

  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      justifyContent="center"
      left={position === 'left' ? theme.spacing.s : undefined}
      right={position === 'right' ? theme.spacing.s : undefined}
    >
      <HugeiconsIcon
        icon={icon}
        size={theme.icon.m}
        color={theme.colors.primary}
      />
    </Box>
  );
};

export default InputIcon;
