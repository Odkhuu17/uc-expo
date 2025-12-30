import { Keyboard, Pressable, ViewStyle } from 'react-native';
import { IconSvgElement } from '@hugeicons/react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import dayjs from 'dayjs';

import InputLabel from './InputLabel';
import { Box, Text, Theme } from './Theme';
import InputContainer from './InputContainer';
import InputIcon from './InputIcon';
import useInputStyle from '@/hooks/useInputStyle';
import ModalBottomSheet from './ModalBottomSheet';
import Button from './Button';
import BottomContainer from './BottomContainer';

interface Props {
  width?: ViewStyle['width'];
  error?: string;
  label?: string;
  isRequired?: boolean;
  icon?: IconSvgElement;
  size?: keyof Theme['button'];
  value?: string;
  placeholder?: string;
  onChange: (date: string) => void;
  mode?: 'date' | 'time';
}

const InputDate = ({
  label,
  isRequired,
  width,
  size = 'm',
  icon,
  value,
  placeholder,
  onChange,
  mode = 'date',
}: Props) => {
  const { getTextVariant, style } = useInputStyle({
    size,
    hasLeftIcon: !!icon,
  });
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => [], []);

  const onOpen = () => {
    Keyboard.dismiss();
    ref.current?.present();
  };

  const onClose = () => {
    if (!value) {
      onChange(dayjs().format('YYYY/MM/DD'));
    }
    ref.current?.dismiss();
  };

  const onChangeDate = (event: DateTimePickerEvent) => {
    const ts = event?.nativeEvent?.timestamp;
    if (mode === 'date') {
      onChange(dayjs(ts).format('YYYY/MM/DD'));
    } else {
      onChange(dayjs(ts).format('HH:mm'));
    }
  };

  const pickerValue = (() => {
    if (mode === 'date') {
      return value ? dayjs(value).toDate() : dayjs().toDate();
    }
    // mode === 'time'
    if (value) {
      const [h, m] = value.split(':');
      const hours = Number(h);
      const minutes = Number(m);
      if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
        return dayjs()
          .hour(hours)
          .minute(minutes)
          .second(0)
          .millisecond(0)
          .toDate();
      }
    }
    return dayjs().toDate();
  })();

  return (
    <>
      <Box>
        {label && <InputLabel isRequired={isRequired} label={label} />}
        <Pressable onPress={onOpen}>
          <InputContainer width={width} size={size}>
            {icon && <InputIcon position="left" icon={icon} />}
            <Box style={style} flex={1} justifyContent="center">
              <Text
                variant={getTextVariant()}
                fontWeight="normal"
                color={value ? 'black' : 'grey3'}
              >
                {value
                  ? mode === 'time'
                    ? dayjs(pickerValue).format('HH:mm')
                    : dayjs(value).format('YYYY/MM/DD')
                  : placeholder}
              </Text>
            </Box>
          </InputContainer>
        </Pressable>
      </Box>
      <ModalBottomSheet ref={ref} snapPoints={snapPoints} enableDynamicSizing>
        <BottomSheetView>
          <Box backgroundColor="white" alignItems="center">
            <DateTimePicker
              value={pickerValue}
              display="spinner"
              onChange={onChangeDate}
              mode={mode}
            />
          </Box>
          <BottomContainer>
            <Button title="Хаах" onPress={onClose} />
          </BottomContainer>
        </BottomSheetView>
      </ModalBottomSheet>
    </>
  );
};

export default InputDate;
