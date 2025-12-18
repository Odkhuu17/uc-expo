import { Icon as IconType } from 'iconsax-react-nativejs';
import React, { useState } from 'react';
import { Pressable, ViewStyle, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

import { Box, Text, useTheme } from './Theme';

interface Props {
  width?: ViewStyle['width'];
  error?: string;
  icon?: IconType;
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  mode?: 'date' | 'time';
}

function DateInput({
  width,
  error,
  icon: IconComp,
  label,
  value,
  onChangeText,
  placeholder,
  mode,
}: Props) {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onPress = () => {
    setShowPicker(true);
  };

  const onChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      if (mode === 'time') {
        onChangeText?.(dayjs(selectedDate).format('HH:mm'));
      } else {
        onChangeText?.(dayjs(selectedDate).format('YYYY/MM/DD'));
      }
    }
  };

  return (
    <>
      <Pressable onPress={onPress}>
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
          <Box mr="s">
            <Text variant="body2" color={value ? 'black' : 'grey2'}>
              {value || placeholder}
            </Text>
          </Box>
        </Box>
        {error && (
          <Text color="red" mt="xs" textAlign="right" px="s" variant="error">
            {error}
          </Text>
        )}
      </Pressable>
      {showPicker && Platform.OS === 'ios' && (
        <Modal animationType="fade" transparent>
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="backdrop"
            p="xl2"
          >
            <Box backgroundColor="white">
              <DateTimePicker
                locale="mn-MN"
                accentColor={theme.colors.baseBlue}
                display="inline"
                mode={mode || 'date'}
                value={date}
                onChange={onChange}
              />
            </Box>
          </Box>
        </Modal>
      )}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          locale="mn-MN"
          accentColor={theme.colors.baseBlue}
          display="default"
          mode={mode || 'date'}
          value={date}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default DateInput;
