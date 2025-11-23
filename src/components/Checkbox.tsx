import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from './Theme';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const Checkbox = ({ value, onChange, label }: Props) => {
  const onChangeValue = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity onPress={onChangeValue}>
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box
          borderRadius="full"
          height={25}
          width={25}
          borderWidth={1}
          borderColor="baseBlue"
          backgroundColor="white"
          style={css.container}
        >
          {value && (
            <Box flex={1} backgroundColor="baseBlue" borderRadius="full" />
          )}
        </Box>
        <Text variant="body2">{label}</Text>
      </Box>
    </TouchableOpacity>
  );
};

const css = StyleSheet.create({
  container: {
    padding: 2,
  },
});

export default Checkbox;
