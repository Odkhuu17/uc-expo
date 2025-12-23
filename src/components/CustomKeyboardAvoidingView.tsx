import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  noWrapper?: boolean;
}

const CustomKeyboardAvoidingView = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={css.container}
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
