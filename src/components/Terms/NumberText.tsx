import { Box, Text } from '@/components/Theme';

interface Props {
  number: string;
  text: string;
}

const NumberText = ({ number, text }: Props) => {
  return (
    <Box flexDirection="row" gap="s">
      <Text variant="label">{number}.</Text>
      <Box flex={1}>
        <Text variant="body2">{text}</Text>
      </Box>
    </Box>
  );
};

export default NumberText;
