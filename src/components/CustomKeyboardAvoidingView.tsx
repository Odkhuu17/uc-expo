import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { Box } from './Theme';

interface Props {
  children: React.ReactNode;
  noWrapper?: boolean;
}

const CustomKeyboardAvoidingView = ({ children, noWrapper }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={css.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {noWrapper ? children : <Box flex={1}>{children}</Box>}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  touchableContent: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
