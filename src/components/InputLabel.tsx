import { Box, Text } from './Theme';

interface Props {
  label: string;
  isRequired?: boolean;
}

const InputLabel = ({ label, isRequired }: Props) => {
  return (
    <Box flexDirection="row" gap="xs" alignItems="center">
      <Text variant="label" mb="xs">
        {label}
      </Text>
      {isRequired && <Text color="error">*</Text>}
    </Box>
  );
};

export default InputLabel;
