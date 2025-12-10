import { useTheme } from '@shopify/restyle';
import { Trash, Truck } from 'iconsax-react-nativejs';
import { Alert } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useDestroyTruckMutation } from '@/gql/mutations/destroyTruckMutation.generated';
import { GetMyTrucksQuery } from '@/gql/query/getMyTrucks.generated';
import VerificationImages from './VerificationImages';

interface Props {
  item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
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
            {item?.verified && (
              <Box backgroundColor="green" px="s" py="xs2" borderRadius="xs">
                <Text variant="body3" color="white">
                  Баталгаажсан
                </Text>
              </Box>
            )}
            <Text variant="body2">{item?.taxon?.name}</Text>
            <Text variant="body2">{item?.mark?.name}</Text>
            <Text variant="body2">{item?.model?.name}</Text>
          </Box>
        </Box>
        <IconButton
          icon={Trash}
          backgroundColor="white"
          loading={loading}
          onPress={onPressDelete}
        />
      </Box>
      {!item?.verified &&
        item?.verifications?.edges?.map((v, i) => {
          return <VerificationImages key={i} images={v?.node?.images || []} />;
        })}
    </BoxContainer>
  );
};

export default SingleTruck;
