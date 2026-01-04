import { Box, Text, Theme } from '@/components/Theme';

interface Props {
  title: string;
  color?: keyof Theme['colors'];
}

const Title = ({ title, color = 'delivery' }: Props) => {
  return (
    <Box borderBottomWidth={1} borderColor="border" pb="s">
      <Text color={color} variant="title">
        {title}
      </Text>
    </Box>
  );
};

export default Title;
