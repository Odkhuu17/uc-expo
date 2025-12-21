import { Box, Text } from '@/components/Theme';

interface Props {
  label: string;
  value: string | number | undefined;
}

const SingleRow = ({ label, value }: Props) => {
  return (
    <Box flexDirection="row" gap="s">
      <Text variant="body2">{label}</Text>
      <Box flex={1}>
        <Text variant="label" textAlign="right">
          {value}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleRow;
