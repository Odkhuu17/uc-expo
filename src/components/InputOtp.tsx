import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { Box, Text } from './Theme';

interface Props {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  description: string;
  length?: number;
}

const InputOtp = ({ otp, setOtp, description, length = 4 }: Props) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const onPressContainer = () => {
    setInputIsFocused(true);
    textInputRef?.current?.focus();
  };

  const onBlur = () => {
    setInputIsFocused(false);
  };

  return (
    <Box alignItems="center" justifyContent="center" gap="m">
      <Text textAlign="center" variant="body2">
        {description}
      </Text>
      <TextInput
        onChangeText={setOtp}
        maxLength={length}
        keyboardType="number-pad"
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        style={css.hiddenInput}
        ref={textInputRef}
        onBlur={onBlur}
        autoFocus
      />
      <Pressable onPress={onPressContainer}>
        <Box
          flexDirection="row"
          alignItems="center"
          gap="m"
          justifyContent="center"
        >
          {Array.from({ length }).map((_, index) => {
            const emptyInputChar = ' ';
            const digit = otp[index] || emptyInputChar;

            const isCurrentDigit = index === otp.length;
            const isLastDigit = index === length - 1;
            const isCodeFull = otp.length === length;
            const isFocused =
              isCurrentDigit || (isLastDigit && isCodeFull && inputIsFocused);

            return (
              <Box
                key={index}
                width={60}
                height={60}
                borderWidth={2}
                borderColor={isFocused ? 'primary' : 'grey4'}
                backgroundColor={isFocused ? 'blue1' : 'transparent'}
                borderRadius="s"
                justifyContent="center"
                alignItems="center"
              >
                <Text variant="title">{digit}</Text>
              </Box>
            );
          })}
        </Box>
      </Pressable>
    </Box>
  );
};

const css = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
});

export default InputOtp;
