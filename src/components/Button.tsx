import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Box, Text, Theme, useTheme } from './Theme';

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: keyof Theme['colors'];
  width?: number;
  size?: keyof Theme['button'];
  textColor?: keyof Theme['colors'];
  loading?: boolean;
}

const Button = ({
  title,
  onPress,
  backgroundColor = 'baseBlue',
  width,
  size = 'm',
  textColor = 'white',
  loading,
}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={1}
        borderColor="border"
        backgroundColor={backgroundColor}
        borderRadius="full"
        alignItems="center"
        height={theme.button[size]}
        width={width}
        justifyContent="center"
        px="l"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            numberOfLines={1}
            variant={size === 'm' ? 'button' : 'button2'}
            color={textColor}
          >
            {title}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
