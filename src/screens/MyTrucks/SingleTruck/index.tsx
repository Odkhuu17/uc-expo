import { useTheme } from '@shopify/restyle';
import { useRouter } from 'expo-router';
import { Trash, Truck } from 'iconsax-react-nativejs';
import { Alert, TouchableOpacity } from 'react-native';

import { BoxContainer, IconButton, Label, Progress } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useDestroyTruckMutation } from '@/gql/mutations/destroyTruckMutation.generated';
import { GetMyTrucksQuery } from '@/gql/query/getMyTrucks.generated';

interface Props {
  item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
  refetch: () => void;
}

const SingleTruck = ({ item, refetch }: Props) => {
  const [destroyTruck, { loading }] = useDestroyTruckMutation();

  const theme = useTheme();
  const router = useRouter();

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

  const onPress = () => {
    if (
      !item?.verified &&
      item?.verifications?.edges?.[0]?.node?.status !== 'pending'
    ) {
      router.navigate(`/profile/trucks/${item?.id}/edit`);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <BoxContainer gap="m">
        <Box flexDirection="row" gap="m">
          <Box flexDirection="row" alignItems="center" gap="m" flex={1}>
            <Box>
              <Truck size={theme.icon.xl2} color={theme.colors.grey2} />
            </Box>
            <Box gap="xs">
              <Text fontFamily="Roboto_500Medium" color="baseBlue">
                {item?.plateNumber}
              </Text>
              <Text variant="body2">{item?.taxon?.name}</Text>
              <Text variant="body2">{item?.mark}</Text>
              <Text variant="body2">{item?.model}</Text>
            </Box>
          </Box>
          <IconButton
            icon={Trash}
            backgroundColor="white"
            loading={loading}
            onPress={onPressDelete}
          />
        </Box>
        {item?.verifications?.edges?.[0]?.node?.status === 'pending' && (
          <Progress sec={30} onFinish={refetch} />
        )}
        {item?.verified && (
          <Box alignItems="flex-end">
            <Label text="Баталгаажсан" backgroundColor="success" />
          </Box>
        )}
      </BoxContainer>
    </TouchableOpacity>
  );
};

export default SingleTruck;
