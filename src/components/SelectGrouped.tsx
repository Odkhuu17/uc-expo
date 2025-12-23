import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

import ModalBottomSheet from './ModalBottomSheet';
import { Box, makeStyles, Text, Theme, useTheme } from './Theme';
import SelectOption from './SelectOption';

interface Props<G = any> {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconSvgElement;
  options: {
    title: string;
    options: { value: G; label: string; image?: number }[];
  }[];
  setSelectedOption: (value: G) => void;
  selectedOption?: G;
  placeholder: string;
  label?: string;
  isRequired?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.s,
  },
}));

function Select({
  width,
  error,
  selectedOption,
  setSelectedOption,
  options,
  icon,
  placeholder,
  label,
  isRequired,
}: Props) {
  const styles = useStyles();
  const ref = useRef<BottomSheetModal | null>(null);
  const theme = useTheme();

  const onPress = () => {
    ref.current?.present();
  };

  return (
    <>
      <Box>
        <Box flexDirection="row" gap="xs" alignItems="center">
          <Text variant="label" mb="xs">
            {label}
          </Text>
          {isRequired && <Text color="error">*</Text>}
        </Box>
        <Pressable onPress={onPress}>
          <Box
            height={theme.button.m}
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
                <HugeiconsIcon
                  icon={icon}
                  size={theme.icon.m}
                  color={theme.colors.primary}
                />
              </Box>
            )}
            <Text
              style={styles.input}
              color={selectedOption ? 'black' : 'grey3'}
              variant="body2"
            >
              {selectedOption || placeholder}
            </Text>
            <Box mr="s">
              <HugeiconsIcon icon={ArrowDown01Icon} size={theme.icon.m} />
            </Box>
          </Box>
          {error && (
            <Text
              color="error"
              mt="xs"
              textAlign="right"
              px="s"
              variant="error"
            >
              {error}
            </Text>
          )}
        </Pressable>
      </Box>
      <ModalBottomSheet ref={ref}>
        <BottomSheetScrollView>
          <Box px="m" gap="s">
            {options.map((option, index) => {
              return (
                <Box gap="s" key={index}>
                  <Text textAlign="center" variant="title">
                    {option.title}
                  </Text>
                  {option?.options.map(o => {
                    const onPressOption = () => {
                      ref.current?.dismiss();
                      setSelectedOption(o.value);
                    };

                    return (
                      <SelectOption
                        key={o.value}
                        image={o.image}
                        label={o.label}
                        selected={o.value === selectedOption}
                        onPress={onPressOption}
                      />
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </BottomSheetScrollView>
      </ModalBottomSheet>
    </>
  );
}

export default Select;
