import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import { TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { IconSvgElement, HugeiconsIcon } from '@hugeicons/react-native';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface BaseProps extends TextInputProps {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconSvgElement;
  label?: string;
  labelColor?: keyof Theme['colors'];
  isRequired?: boolean;
  keyboardAvoiding?: boolean;
  size?: keyof Theme['button'];
  ref?: React.Ref<TextInput>;
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
    icon,
    label,
    isRequired,
    keyboardAvoiding,
    size = 'm',
    ref,
    ...textInputProps
  } = props;
  const styles = useStyles();
  const theme = useTheme();

  const getTextVariant = () => {
    switch (size) {
      case 's':
        return 'button3';
      case 'l':
        return 'button';
      default:
        return 'button2';
    }
  };

  return (
    <Box>
      {label && (
        <Box flexDirection="row" gap="xs" width={width} alignItems="center">
          <Text variant="label" mb="xs">
            {label}
          </Text>
          {isRequired && <Text color="error">*</Text>}
        </Box>
      )}
      <Box
        height={theme.button[size]}
        width={width}
        borderRadius="s"
        borderColor="border"
        borderWidth={1}
        backgroundColor="white"
        flexDirection="row"
        alignItems="center"
        overflow="hidden"
      >
        {icon && (
          <Box ml="s">
            <HugeiconsIcon icon={icon} />
          </Box>
        )}
        {keyboardAvoiding ? (
          <BottomSheetTextInput
            {...textInputProps}
            style={styles.input}
            placeholderTextColor={theme.colors.grey3}
          />
        ) : (
          <TextInput
            {...textInputProps}
            ref={ref}
            style={[
              styles.input,
              {
                ...theme.textVariants[getTextVariant()],
                fontWeight: 'normal',
              } as TextStyle,
            ]}
            placeholderTextColor={theme.colors.grey3}
          />
        )}
      </Box>
      {error && (
        <Text color="error" mt="xs" variant="error">
          {error}
        </Text>
      )}
    </Box>
  );
}

export default Input;
