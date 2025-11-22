import { AddCircle } from 'iconsax-react-nativejs';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Marquee } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { SearchAddressQuery } from '@/gql/query/searchAddressQuery.generated';

interface Props {
  selected: boolean;
  title: string;
  data: NonNullable<SearchAddressQuery['searchAddress']>[0] | null;
  onPress: () => void;
  loading?: boolean;
}

const SingleAddress = ({ data, title, selected, onPress, loading }: Props) => {
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
              {data?._source?.nameFullMn || ''}
            </Text>
          </Marquee>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SingleAddress;
