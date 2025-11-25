import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Box, makeStyles, Text, Theme } from './Theme';

interface Props extends TextInputProps {
  width?: ViewStyle['width'];
  error?: string;
  errorColor?: keyof Theme['colors'];
  height?: ViewStyle['height'];
  label?: string;
  isRequired?: boolean;
  labelColor?: keyof Theme['colors'];
  keyboardAvoiding?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'white',
    borderRadius: theme.spacing.xl,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.s,
  },
}));

function TextArea(props: Props) {
  const {
    width,
    error,
    errorColor,
    height = 100,
    label,
    labelColor,
    isRequired,
    keyboardAvoiding,
    ...textInputProps
  } = props;
  const styles = useStyles();

  return (
    <Box>
      {label && (
        <Box flexDirection="row" gap="xs">
          <Text variant="label" color={labelColor || 'black'} mb="xs">
            {label}
          </Text>
          {isRequired && <Text color="error">*</Text>}
        </Box>
      )}
      <Box width={width} height={height}>
        {keyboardAvoiding ? (
          <BottomSheetTextInput
            {...textInputProps}
            style={styles.input}
            multiline
          />
        ) : (
          <TextInput {...textInputProps} style={styles.input} multiline />
        )}
      </Box>
      {error && (
        <Text color={errorColor || 'red'} mt="xs" px="s" variant="error">
          {error}
        </Text>
      )}
    </Box>
  );
}

export default TextArea;
