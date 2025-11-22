import { Icon as IconType, TickCircle } from 'iconsax-react-nativejs';
import React, { useRef } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from './CustomBottomSheetModal';
import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface Props<G = any> extends TextInputProps {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconType;
  options: { value: G; label: string }[];
  setSelectedOption: (value: G) => void;
  selectedOption?: G;
  label?: string;
  isRequired?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    textAlign: 'right',
    flex: 1,
    paddingHorizontal: theme.spacing.s,
  },
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
  },
}));

function Select(props: Props) {
  const {
    width,
    error,
    selectedOption,
    setSelectedOption,
    options,
    label,
    isRequired,
    ...textInputProps
  } = props;
  const styles = useStyles();
  const ref = useRef<BottomSheetModal | null>(null);
  const theme = useTheme();

  const IconComp = props.icon;

  return (
    <>
      <Box>
        {label && (
          <Box flexDirection="row" gap="xs">
            <Text variant="label" color="black" mb="xs">
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
          <TextInput
            {...textInputProps}
            style={styles.input}
            editable={false}
            placeholderTextColor={theme.colors.grey2}
            onPress={() => ref.current?.present()}
          />
        </Box>
        {error && (
          <Text color="red" mt="xs" textAlign="right" px="s" variant="error">
            {error}
          </Text>
        )}
      </Box>
      <CustomBottomSheetModal ref={ref}>
        <BottomSheetScrollView>
          <Box px="m" gap="s">
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  ref.current?.dismiss();
                  setSelectedOption(option.value);
                }}
              >
                <Box
                  justifyContent="space-between"
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="grey"
                  borderRadius="xl"
                  p="m"
                >
                  <Text key={option.value}>{option.label}</Text>
                  {option.value === selectedOption && (
                    <TickCircle
                      size={theme.icon.m}
                      color={theme.colors.baseBlue}
                    />
                  )}
                </Box>
              </TouchableOpacity>
            ))}
          </Box>
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    </>
  );
}

export default Select;
