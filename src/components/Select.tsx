import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Keyboard, Pressable, ViewStyle } from 'react-native';
import { IconSvgElement } from '@hugeicons/react-native';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

import ModalBottomSheet from './ModalBottomSheet';
import { Box, Text, Theme } from './Theme';
import SelectOption from './SelectOption';
import InputLabel from './InputLabel';
import InputContainer from './InputContainer';
import InputIcon from './InputIcon';
import useInputStyle from '@/hooks/useInputStyle';
import InputError from './InputError';

interface Props<G = any> {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconSvgElement;
  options: { value: G; label: string; image?: number }[];
  setSelectedOption: (value: G) => void;
  selectedOption?: G;
  placeholder: string;
  label?: string;
  isRequired?: boolean;
  size?: keyof Theme['button'];
}

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
  size = 'm',
}: Props) {
  const ref = useRef<BottomSheetModal | null>(null);
  const { getTextVariant, style } = useInputStyle({
    size,
    hasLeftIcon: !!icon,
    hasRightIcon: true,
  });

  const onPress = () => {
    Keyboard.dismiss();
    ref.current?.present();
  };

  return (
    <Box>
      {label && <InputLabel isRequired={isRequired} label={label} />}
      <Pressable onPress={onPress}>
        <InputContainer width={width} size={size}>
          {icon && <InputIcon position="left" icon={icon} />}
          <Box style={style} flex={1} justifyContent="center">
            <Text
              variant={getTextVariant()}
              fontWeight="normal"
              color={selectedOption ? 'black' : 'grey3'}
            >
              {selectedOption || placeholder}
            </Text>
          </Box>
          <InputIcon position="right" icon={ArrowDown01Icon} />
        </InputContainer>
        {error && <InputError error={error} />}
      </Pressable>
      <ModalBottomSheet ref={ref}>
        <BottomSheetScrollView>
          <Text textAlign="center" variant="title">
            {label || placeholder}
          </Text>
          <Box px="m" gap="s">
            {options.map(o => {
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
        </BottomSheetScrollView>
      </ModalBottomSheet>
    </Box>
  );
}

export default Select;
