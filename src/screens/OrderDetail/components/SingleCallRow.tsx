import { Box, Text, useTheme } from '@/components/Theme';
import { Call } from 'iconsax-react-nativejs';
import { Linking, TouchableOpacity } from 'react-native';

interface Props {
  label: string;
  value: string | number | undefined;
}

const SingleCallRow = ({ label, value }: Props) => {
  const theme = useTheme();

  const onPressCall = () => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <Box flexDirection="row" gap="s">
      <Text variant="body2">{label}</Text>
      <Box flex={1} alignItems="flex-end">
        <TouchableOpacity onPress={onPressCall}>
          <Box
            backgroundColor="grey"
            p="s"
            borderRadius="xs"
            flexDirection="row"
            alignItems="center"
            gap="xs"
          >
            <Call size={theme.icon.s} />
            <Text
              variant="body2"
              fontFamily="Roboto_500Medium"
              textAlign="right"
            >
              {value}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default SingleCallRow;
