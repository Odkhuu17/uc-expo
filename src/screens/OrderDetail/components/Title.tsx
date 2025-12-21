import { Box, Text } from '@/components/Theme';

interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return (
    <Box borderBottomWidth={1} borderColor="border" pb="s">
      <Text color="primary" variant="title">
        {title}
      </Text>
    </Box>
  );
};

export default Title;
