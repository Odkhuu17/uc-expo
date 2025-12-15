import { useTheme } from '@shopify/restyle';
import { Trash, Truck } from 'iconsax-react-nativejs';
import { Alert, TouchableOpacity } from 'react-native';

import { BoxContainer, Button, IconButton, Label } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useDestroyTruckMutation } from '@/gql/mutations/destroyTruckMutation.generated';
import { GetMyTrucksQuery } from '@/gql/query/getMyTrucks.generated';
import ImageInput from './ImageInput';
import { useState } from 'react';
import { useVerifyTruckMutation } from '@/gql/mutations/verifyTruckMutation.generated';
import { imageToFile } from '@/utils/fileHelpers';
import { useRouter } from 'expo-router';

interface Props {
  item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
}

const SingleTruck = ({ item }: Props) => {
  const [destroyTruck, { loading }] = useDestroyTruckMutation();
  const theme = useTheme();
  const [passport, setPassport] = useState<string | null>(null);
  const [verifyTruck] = useVerifyTruckMutation();
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

  const pendingVerification = item?.verifications?.edges?.length !== 0;

  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/profile/trucks/${item?.id}/edit`)}
    >
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
        {pendingVerification && (
          <Box alignItems="flex-end">
            <Label
              text="Баталгаажуулалт хүлээгдэж байна"
              backgroundColor={item.verified ? 'success' : 'warning'}
            />
          </Box>
        )}
      </BoxContainer>
    </TouchableOpacity>
  );
};

export default SingleTruck;
