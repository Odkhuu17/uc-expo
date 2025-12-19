import { Box, Text } from '@/components/Theme';

interface Props {
  number: string;
  text: string;
}

const NumberText = ({ number, text }: Props) => {
  return (
    <Box flexDirection="row" gap="s">
      <Text fontFamily="Roboto_500Medium" variant="body2">
        {number}.
      </Text>
      <Box flex={1}>
        <Text variant="body2">{text}</Text>
      </Box>
    </Box>
  );
};

export default NumberText;
