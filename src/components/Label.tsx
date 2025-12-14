import { Box, Text, Theme } from './Theme';

interface Props {
  text: string;
  backgroundColor?: keyof Theme['colors'];
  textColor?: keyof Theme['colors'];
}

const Label = ({
  text,
  backgroundColor = 'baseBlue',
  textColor = 'white',
}: Props) => {
  return (
    <Box backgroundColor={backgroundColor} px="xs" py="xs" borderRadius="xs">
      <Text variant="body2" color={textColor} fontFamily="Roboto_500Medium">
        {text}
      </Text>
    </Box>
  );
};

export default Label;
