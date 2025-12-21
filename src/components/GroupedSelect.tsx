import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  ArrowDown2,
  Icon as IconType,
  TickCircle,
} from 'iconsax-react-nativejs';
import React, { useRef } from 'react';
import { Pressable, TouchableOpacity, ViewStyle } from 'react-native';

import { Image } from 'expo-image';
import CustomBottomSheetModal from './CustomBottomSheetModal';
import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface Props<G = any> {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconType;
  options: {
    title: string;
    options: { value: G; label: string; image?: number }[];
  }[];
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
  img: {
    width: 40,
    height: 40,
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
          <Box px="m" gap="s">
            {options.map((option, index) => {
              return (
                <Box gap="s" key={index}>
                  <Text
                    textAlign="center"
                    fontFamily="Roboto_500Medium"
                    variant="body2"
                  >
                    {option.title}
                  </Text>
                  {option?.options.map(o => {
                    return (
                      <TouchableOpacity
                        key={o.value}
                        onPress={() => {
                          ref.current?.dismiss();
                          setSelectedOption(o.value);
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
                          <Box
                            flex={1}
                            flexDirection="row"
                            alignItems="center"
                            gap="s"
                          >
                            {o.image && (
                              <Image
                                source={o.image}
                                style={styles.img}
                                contentFit="contain"
                              />
                            )}
                            <Text key={o.value}>{o.label}</Text>
                          </Box>
                          {o.value === selectedOption && (
                            <TickCircle
                              size={theme.icon.m}
                              color={theme.colors.baseBlue}
                            />
                          )}
                        </Box>
                      </TouchableOpacity>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    </>
  );
}

export default Select;
