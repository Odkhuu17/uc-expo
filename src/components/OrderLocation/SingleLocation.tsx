import { AddCircle } from 'iconsax-react-nativejs';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Box, Text, useTheme } from '@/components/Theme';
import Marquee from '../Marquee';

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
          <AddCircle
            size={theme.icon.l}
            color={selected ? theme.colors['baseBlue'] : theme.colors['black']}
            variant={selected ? 'Bold' : 'Outline'}
          />
        )}
        <Box flex={1} gap="xs">
          <Text
            color={selected ? 'baseBlue' : 'black'}
            variant="body2"
            fontFamily="Roboto_500Medium"
          >
            {title}
          </Text>
          <Marquee duration={5000}>
            <Text paddingRight="xl" variant="body2" color="grey2">
              {location || ''}
            </Text>
          </Marquee>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleLocation;
