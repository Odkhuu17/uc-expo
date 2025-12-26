import React, { useMemo } from 'react';
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import { Box, Theme, useTheme } from './Theme';
import useInputStyle from '@/hooks/useInputStyle';
import InputLabel from './InputLabel';
import InputError from './InputError';
import InputContainer from './InputContainer';

interface Props extends TextInputProps {
  keyboardAvoiding?: boolean;
  width?: ViewStyle['width'];
  error?: string;
  label?: string;
  isRequired?: boolean;
  size?: keyof Theme['button'];
  height: number;
}

const InputTextArea = ({
  width,
  error,
  label,
  isRequired,
  keyboardAvoiding,
  size = 'm',
  height = 100,
  ...textInputProps
}: Props) => {
  const theme = useTheme();
  const { getTextVariant } = useInputStyle({
    size,
  });

  const style = useMemo(
    () => [
      {
        padding: theme.spacing.s,
        height: '100%',
        ...theme.textVariants[getTextVariant()],
        fontWeight: 'normal',
      } as TextStyle,
    ],
    [],
  );

  return (
    <Box>
      {label && <InputLabel isRequired={isRequired} label={label} />}
      <InputContainer width={width} height={height}>
        {keyboardAvoiding ? (
          <BottomSheetTextInput
            {...textInputProps}
            style={style}
            multiline
            placeholderTextColor={theme.colors.grey3}
          />
        ) : (
          <TextInput
            {...textInputProps}
            style={style}
            multiline
            placeholderTextColor={theme.colors.grey3}
          />
        )}
      </InputContainer>
      {error && <InputError error={error} />}
    </Box>
  );
};

export default InputTextArea;
