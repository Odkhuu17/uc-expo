import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  ArrowDown2,
  Icon as IconType,
  TickCircle,
} from 'iconsax-react-nativejs';
import React, { useRef } from 'react';
import { Pressable, TouchableOpacity, ViewStyle } from 'react-native';

import CustomBottomSheetModal from './CustomBottomSheetModal';
import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface Props<G = any> {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconType;
  options: { value: G; label: string }[];
  setSelectedOption: (value: G) => void;
  selectedOption?: G;
  placeholder: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    textAlign: 'center',
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
  icon: IconComp,
  placeholder,
}: Props) {
  const styles = useStyles();
  const ref = useRef<BottomSheetModal | null>(null);
  const theme = useTheme();

  return (
    <>
      <Pressable onPress={() => ref.current?.present()}>
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
          <Text
            style={styles.input}
            color={selectedOption ? 'black' : 'grey2'}
            variant="body2"
          >
            {selectedOption || placeholder}
          </Text>
          <Box mr="s">
            <ArrowDown2 size={theme.icon.m} />
          </Box>
        </Box>
        {error && (
          <Text color="red" mt="xs" textAlign="right" px="s" variant="error">
            {error}
          </Text>
        )}
      </Pressable>
      <CustomBottomSheetModal ref={ref}>
        <BottomSheetScrollView>
          <Text variant="label" textAlign="center" mb="m">
            {placeholder}
          </Text>
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
                  backgroundColor="white"
                  borderRadius="xl"
                  py="s"
                  px="m"
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
