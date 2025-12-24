import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { PencilEdit02Icon } from '@hugeicons/core-free-icons';

import { Box, Text, useTheme } from '@/components/Theme';
import { Marquee } from '@/components';

interface Props {
  selected: boolean;
  title: string;
  location?: string;
  loading?: boolean;
  onPress: () => void;
}

const SingleLocation = ({
  location,
  title,
  selected,
  onPress,
  loading,
}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="xs">
        {selected && loading ? (
          <Box
            alignItems="center"
            justifyContent="center"
            height={theme.icon.l}
            width={theme.icon.l}
          >
            <ActivityIndicator />
          </Box>
        ) : (
          <HugeiconsIcon
            icon={PencilEdit02Icon}
            size={theme.icon.l}
            color={selected ? theme.colors.primary : theme.colors.black}
          />
        )}
        <Box flex={1} gap="xs">
          <Text color={selected ? 'primary' : 'black'} variant="label">
            {title}
          </Text>
          <Marquee duration={5000}>
            <Text paddingRight="xl" variant="body2" color="grey4">
              {location || ''}
            </Text>
          </Marquee>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleLocation;
