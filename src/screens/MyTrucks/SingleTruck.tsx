import { useTheme } from '@shopify/restyle';
import { Trash, Truck } from 'iconsax-react-nativejs';
import { Alert } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useDestroyTruckMutation } from '@/gql/mutations/destroyTruckMutation.generated';
import { GetMyTrucksQuery } from '@/gql/query/getMyTrucks.generated';

interface Props {
  item: GetMyTrucksQuery['trucks']['nodes'][number];
}

const SingleTruck = ({ item }: Props) => {
  const [destroyTruck, { loading }] = useDestroyTruckMutation();
  const theme = useTheme();

  const onPressDelete = () => {
    Alert.alert(
      'Захиалга устгах',
      'Та энэ захиалгыг устгахдаа итгэлтэй байна уу?',
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Устгах',
          style: 'destructive',
          onPress: () => {
            destroyTruck({ variables: { id: item?.id || '' } });
          },
        },
      ]
    );
  };

  return (
    <BoxContainer gap="m" flexDirection="row">
      <Box flexDirection="row" alignItems="center" gap="m" flex={1}>
        <Box>
          <Truck size={theme.icon.xl2} color={theme.colors.grey2} />
        </Box>
        <Box gap="xs">
          <Text fontFamily="Roboto_500Medium" color="baseBlue">
            {item?.plateNumber}
          </Text>
          <Text>{item?.taxon?.name}</Text>
          <Text>{item?.mark?.name}</Text>
          <Text>{item?.model?.name}</Text>
        </Box>
      </Box>
      <IconButton
        icon={Trash}
        backgroundColor="white"
        loading={loading}
        onPress={onPressDelete}
      />
    </BoxContainer>
  );
};

export default SingleTruck;
