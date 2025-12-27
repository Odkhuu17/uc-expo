import { Box, Text, Theme } from './Theme';

interface Props {
  text: string;
  backgroundColor?: keyof Theme['colors'];
  textColor?: keyof Theme['colors'];
}

const Label = ({
  text,
  backgroundColor = 'primary',
  textColor = 'white',
}: Props) => {
  return (
    <Box backgroundColor={backgroundColor} px="xs" py="xs" borderRadius="xs">
      <Text variant="label" color={textColor}>
        {text}
      </Text>
    </Box>
  );
};

export default Label;
