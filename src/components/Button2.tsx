import { ArrowLeft, ArrowRight } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

import RoundIcon from './RoundIcon';
import { Box, Text } from './Theme';

interface Props {
  onPress: () => void;
  title: string;
  loading?: boolean;
  icon: 'left' | 'right';
  flexDirection?: 'row' | 'column';
}

const Button2 = ({
  title,
  onPress,
  loading,
  icon = 'right',
  flexDirection = 'row',
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <Box flexDirection={flexDirection} alignItems="center" gap="s">
        <RoundIcon
          size="m"
          icon={icon === 'left' ? ArrowLeft : ArrowRight}
          backgroundColor="baseBlue"
          iconColor="white"
          borderColor="baseBlue"
        />
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button2;
