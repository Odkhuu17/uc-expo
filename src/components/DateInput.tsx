import { Icon as IconType } from 'iconsax-react-nativejs';
import React, { useRef } from 'react';
import { Pressable, TextInput, ViewStyle } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface Props extends MaskInputProps {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconType;
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: theme.spacing.s,
  },
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
  },
}));

function DateInput({
  width,
  error,
  icon: IconComp,
  label,
  ...textInputProps
}: Props) {
  const styles = useStyles();
  const theme = useTheme();
  const inputRef = useRef<TextInput | null>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <Box
        height={theme.button.m}
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
        <Box flex={1} alignItems="center">
          <Text mx="s" variant="body2" color="grey2">
            {label}
          </Text>
        </Box>
        <MaskInput
          {...textInputProps}
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={theme.colors.grey2}
        />
      </Box>
      {error && (
        <Text color="red" mt="xs" textAlign="right" px="s" variant="error">
          {error}
        </Text>
      )}
    </Pressable>
  );
}

export default DateInput;
