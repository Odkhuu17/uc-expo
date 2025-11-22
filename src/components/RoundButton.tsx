import { ActivityIndicator, TouchableOpacity } from 'react-native';

import RoundIcon, { RoundIconProps } from './RoundIcon';
import { Box, theme } from './Theme';

interface Props extends RoundIconProps {
  onPress: () => void;
  loading?: boolean;
}

const RoundButton = ({
  onPress,
  loading,
  icon,
  backgroundColor,
  borderColor,
  size,
  variant,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {loading ? (
        <Box
          width={theme.icon[size] + theme.spacing.xs * 2}
          height={theme.icon[size] + theme.spacing.xs * 2} // Assuming padding of 8 on each side
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderRadius="full"
          overflow="hidden"
        >
          <ActivityIndicator />
        </Box>
      ) : (
        <RoundIcon
          icon={icon}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          size={size}
          variant={variant}
        />
      )}
    </TouchableOpacity>
  );
};

export default RoundButton;
