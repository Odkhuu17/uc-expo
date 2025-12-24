import { Pressable, ViewStyle } from 'react-native';
import { IconSvgElement } from '@hugeicons/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import dayjs from 'dayjs';

import InputLabel from './InputLabel';
import { Box, Text, Theme } from './Theme';
import InputContainer from './InputContainer';
import InputIcon from './InputIcon';
import useInputStyle from '@/hooks/useInputStyle';
import ModalBottomSheet from './ModalBottomSheet';
import Button from './Button';

interface Props {
  width?: ViewStyle['width'];
  error?: string;
  label?: string;
  isRequired?: boolean;
  icon?: IconSvgElement;
  size?: keyof Theme['button'];
  value?: string;
  placeholder?: string;
  onChange?: (date: string) => void;
}

const InputDate = ({
  label,
  isRequired,
  width,
  size = 'm',
  icon,
  value,
  placeholder,
  onChange: onChangeDate,
}: Props) => {
  const { getTextVariant, style } = useInputStyle({
    size,
    hasLeftIcon: !!icon,
  });
  const ref = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const onOpen = () => {
    ref.current?.present();
  };

  const onClose = () => {
    ref.current?.dismiss();
  };

  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate && onChangeDate) {
      onChangeDate(dayjs(selectedDate).format('YYYY-MM-DD'));
    }
  };

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
                {dayjs(value).format('YYYY/MM/DD') || placeholder}
              </Text>
            </Box>
          </InputContainer>
        </Pressable>
      </Box>
      <ModalBottomSheet ref={ref}>
        <Box backgroundColor="white" alignItems="center">
          <DateTimePicker
            minimumDate={dayjs().toDate()}
            value={dayjs(value).toDate()}
            display="spinner"
            onChange={onChange}
          />
          <Button width="100%" title="Хаах" onPress={onClose} />
        </Box>
      </ModalBottomSheet>
    </>
  );
};

export default InputDate;
