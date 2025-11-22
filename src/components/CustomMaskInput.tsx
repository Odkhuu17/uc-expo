import { Icon as IconType } from 'iconsax-react-nativejs';
import React from 'react';
import { ViewStyle } from 'react-native';
import MaskInput, { Mask, MaskInputProps } from 'react-native-mask-input';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface BaseProps extends MaskInputProps {
  width?: ViewStyle['width'];
  error?: string;
  errorColor?: keyof Theme['colors'];
  unit?: string;
  icon?: IconType;
  label?: string;
  labelColor?: keyof Theme['colors'];
  isRequired?: boolean;
  mask?: Mask;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.s,
  },
}));

function CustomMaskInput(props: BaseProps) {
  const {
    width,
    error,
    errorColor,
    unit,
    icon,
    label,
    labelColor,
    isRequired,
    ...textInputProps
  } = props;
  const styles = useStyles();
  const theme = useTheme();

  const IconComp = props.icon;

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
            <IconComp size={theme.icon.m} color={theme.colors.grey2} />
          </Box>
        )}
        <MaskInput
          {...textInputProps}
          style={styles.input}
          placeholderTextColor={theme.colors.grey2}
        />
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
        <Text color={errorColor || 'red'} mt="xs" variant="error">
          {error}
        </Text>
      )}
    </Box>
  );
}

export default CustomMaskInput;
