import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { IconSvgElement } from '@hugeicons/react-native';

import { Box, Theme, useTheme } from './Theme';
import InputContainer from './InputContainer';
import InputLabel from './InputLabel';
import InputError from './InputError';
import InputIcon from './InputIcon';
import useInputStyle from '@/hooks/useInputStyle';

interface Props extends TextInputProps {
  keyboardAvoiding?: boolean;
  width?: ViewStyle['width'];
  error?: string;
  label?: string;
  isRequired?: boolean;
  icon?: IconSvgElement;
  size?: keyof Theme['button'];
  ref?: React.Ref<TextInput>;
}

const Input = ({
  width,
  error,
  icon,
  label,
  isRequired,
  keyboardAvoiding,
  size = 'm',
  ...textInputProps
}: Props) => {
  const theme = useTheme();
  const { getTextVariant, style: hookStyle } = useInputStyle({
    size,
    hasLeftIcon: !!icon,
  });

  const style = useMemo(
    () => [
      {
        ...theme.textVariants[getTextVariant()],
      } as TextStyle,
      [css.input],
      ...hookStyle,
    ],
    [],
  );

  return (
    <Box>
      {label && <InputLabel isRequired={isRequired} label={label} />}
      <InputContainer width={width} size={size}>
        {icon && <InputIcon position="left" icon={icon} />}
        {keyboardAvoiding ? (
          <BottomSheetTextInput
            {...textInputProps}
            style={style}
            placeholderTextColor={theme.colors.grey3}
          />
        ) : (
          <TextInput
            {...textInputProps}
            style={style}
            placeholderTextColor={theme.colors.grey3}
          />
        )}
      </InputContainer>
      {error && <InputError error={error} />}
    </Box>
  );
};

const css = StyleSheet.create({
  input: {
    flex: 1,
    fontWeight: 'normal',
  },
});

export default Input;
