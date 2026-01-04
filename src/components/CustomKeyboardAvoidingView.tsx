import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
} from 'react-native';
import { ReactNode } from 'react';

interface Props extends KeyboardAvoidingViewProps {
  children: ReactNode;
}

const CustomKeyboardAvoidingView = ({ children, ...rest }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={css.container}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
