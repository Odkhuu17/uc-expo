import { useMemo } from 'react';

import { Theme, useTheme } from '@/components/Theme';

interface Props {
  size: keyof Theme['button'];
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}

const useInputStyle = ({ size, hasLeftIcon, hasRightIcon }: Props) => {
  const theme = useTheme();

  const getTextVariant = () => {
    switch (size) {
      case 's':
        return 'button3';
      case 'l':
        return 'button';
      default:
        return 'button2';
    }
  };

  const style = useMemo(
    () => [
      {
        paddingLeft: hasLeftIcon
          ? theme.spacing.s * 2 + theme.icon.m
          : theme.spacing.s,
        paddingRight: hasRightIcon
          ? theme.spacing.s * 2 + theme.icon.m
          : theme.spacing.s,
      },
    ],
    [],
  );

  return { getTextVariant, style };
};

export default useInputStyle;
