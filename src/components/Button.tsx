import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Box, Text, Theme } from './Theme';

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: keyof Theme['colors'];
  width?: number;
  size?: 's' | 'm';
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
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={1}
        borderColor="border"
        backgroundColor={backgroundColor}
        borderRadius="full"
        alignItems="center"
        height={size === 'm' ? 40 : 30}
        width={width}
        justifyContent="center"
        px="l"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text variant={size === 'm' ? 'button' : 'button2'} color={textColor}>
            {title}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
