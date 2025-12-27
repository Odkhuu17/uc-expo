import { Label } from '@/components';
import { Box, Text, Theme } from '@/components/Theme';

interface Props {
  label: string;
  value: string | number | undefined;
  backgroundColor?: keyof Theme['colors'];
}

const SingleRow = ({ label, value, backgroundColor }: Props) => {
  return (
    <Box flexDirection="row" gap="s" justifyContent="space-between">
      <Text variant="body2">{label}</Text>
      {backgroundColor ? (
        <Label
          backgroundColor={backgroundColor}
          textColor="white"
          text={value?.toString() ?? ''}
        />
      ) : (
        <Box flex={1}>
          <Text variant="label" textAlign="right">
            {value}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleRow;
