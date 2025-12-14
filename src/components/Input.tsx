import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Icon as IconType } from 'iconsax-react-nativejs';
import React, { ComponentRef, useRef } from 'react';
import { Pressable, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface BaseProps extends TextInputProps {
  width?: ViewStyle['width'];
  error?: string;
  unit?: string;
  icon?: IconType;
  label?: string;
  labelColor?: keyof Theme['colors'];
  isRequired?: boolean;
  keyboardAvoiding?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.s,
  },
}));

function Input(props: BaseProps) {
  const {
    width,
    error,
    unit,
    icon,
    label,
    labelColor,
    isRequired,
    keyboardAvoiding,
    ...textInputProps
  } = props;
  const styles = useStyles();
  const theme = useTheme();
  const inputRef = useRef<TextInput | null>(null);
  const inputRef2 = useRef<ComponentRef<typeof BottomSheetTextInput> | null>(
    null
  );

  const IconComp = props.icon;

  const onPress = () => {
    inputRef.current?.focus();
    inputRef2.current?.focus();
  };

  return (
    <Pressable onPress={onPress}>
      {label && (
        <Box flexDirection="row" gap="xs">
          <Text variant="label" color={labelColor || 'black'} mb="xs">
            {label}
          </Text>
          {isRequired && <Text color="error">*</Text>}
        </Box>
      )}
      <Box
        height={40}
        width={width}
        borderRadius="xl"
        borderColor="border"
        borderWidth={1}
        backgroundColor="white"
        flexDirection="row"
        alignItems="center"
        overflow="hidden"
      >
        {IconComp && (
          <Box ml="s">
            <IconComp size={theme.icon.m} color={theme.colors.baseBlue} />
          </Box>
        )}
        {keyboardAvoiding ? (
          <BottomSheetTextInput
            {...textInputProps}
            ref={inputRef2}
            style={styles.input}
            placeholderTextColor={theme.colors.grey2}
          />
        ) : (
          <TextInput
            {...textInputProps}
            ref={inputRef}
            style={styles.input}
            placeholderTextColor={theme.colors.grey2}
          />
        )}
        {unit && (
          <Box
            alignItems="center"
            justifyContent="center"
            backgroundColor="grey3"
            height="100%"
            px="s"
          >
            <Text variant="body2" fontFamily="Roboto_500Medium">
              {unit}
            </Text>
          </Box>
        )}
      </Box>
      {error && (
        <Text color="red" mt="xs" variant="error" textAlign="right">
          {error}
        </Text>
      )}
    </Pressable>
  );
}

export default Input;
