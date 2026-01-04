import { ReactNode, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, useTheme } from './Theme';

interface Props {
  children: ReactNode;
  noInsets?: boolean;
  listenKeyboard?: boolean;
}

const BottomContainer = ({ children, noInsets, listenKeyboard }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (listenKeyboard) {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, [listenKeyboard]);

  return (
    <Box
      px="m"
      style={{
        paddingBottom: isKeyboardVisible
          ? theme.spacing.m
          : noInsets
          ? theme.spacing.m
          : insets.bottom + theme.spacing.m,
      }}
    >
      {children}
    </Box>
  );
};

export default BottomContainer;
