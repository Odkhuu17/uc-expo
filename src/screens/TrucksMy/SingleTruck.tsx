import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Delete03Icon } from '@hugeicons/core-free-icons';
import { useNavigation } from '@react-navigation/native';

import {
  BoxContainer,
  Button,
  ButtonIcon,
  Label,
  Progress,
  Warning,
} from '@/components';
import { Box, Text } from '@/components/Theme';
import { GetMyTrucksQuery } from '@/gql/queries/getMyTruck.generated';
import { useDestroyTruckMutation } from '@/gql/mutations/destroyTruck.generated';
import { INavigation } from '@/navigations';
import { isRentOrder } from '@/utils/helpers';
import { deliveryCarTypes, rentCarTypes } from '@/constants/transportTypes';

interface Props {
  item: NonNullable<GetMyTrucksQuery['me']>['trucks'][0];
  refetch: () => void;
}

const SingleTruck = ({ item, refetch }: Props) => {
  const navigation = useNavigation<INavigation>();
  const [destroyTruck, { loading }] = useDestroyTruckMutation();
  const [hasPendingUserVerification, setHasPendingUserVerification] =
    useState(false);

  useEffect(() => {
    if (item?.verifications?.edges?.[0]?.node?.status === 'pending') {
      setHasPendingUserVerification(true);
    }
  }, [item]);

  useEffect(() => {
    if (hasPendingUserVerification) {
      if (item?.verified) {
        setHasPendingUserVerification(false);
        return navigation.navigate('MsgModal', {
          type: 'success',
          msg: 'Таны машин амжилттай баталгаажлаа.',
        });
      }
    }
  }, [item, hasPendingUserVerification]);

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
      ],
    );
  };

  const onPress = () => {
    if (
      !item?.verified &&
      item?.verifications?.edges?.[0]?.node?.status !== 'pending'
    ) {
      navigation.navigate('TruckAddOrEdit', { id: item?.id });
    }
  };

  const isRent = isRentOrder(item?.taxon?.name);

  const onPressExtendSubscription = () => {
    navigation.navigate('TruckSubscription', { truckId: item?.id });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <BoxContainer gap="m">
        <Box flexDirection="row" gap="m">
          <Box flexDirection="row" alignItems="center" gap="m" flex={1}>
            <Image
              source={
                isRent
                  ? rentCarTypes?.find(i => i.name === item?.taxon?.name)?.image
                  : deliveryCarTypes?.find(i => i.name === item?.taxon?.name)
                      ?.image
              }
              resizeMode="contain"
              style={css.img}
            />
            <Box gap="xs">
              <Text variant="title" color="primary">
                {item?.plateNumber}
              </Text>
              <Text variant="body2">{item?.taxon?.name}</Text>
              <Text variant="body2">{item?.mark}</Text>
              <Text variant="body2">{item?.model}</Text>
            </Box>
          </Box>
          <ButtonIcon
            icon={Delete03Icon}
            backgroundColor="white"
            loading={loading}
            onPress={onPressDelete}
          />
        </Box>
        {item?.verifications?.edges?.[0]?.node?.status === 'pending' && (
          <Progress sec={15} onFinish={refetch} />
        )}
        {!item?.verified && item?.verifications?.edges?.[0]?.node?.field5 && (
          <Warning
            type="error"
            description={item?.verifications?.edges?.[0]?.node?.field5}
          />
        )}
        {item?.verified && (
          <>
            <Box alignItems="flex-end">
              <Label text="Баталгаажсан" backgroundColor="success" />
            </Box>
          </>
        )}
        {item?.subscribed ? (
          <Text variant="label" textAlign="right">
            Эрх дуусах хугацаа:{' '}
            {dayjs(item?.subscribedUntil).format('YYYY-MM-DD')}
          </Text>
        ) : (
          <Button
            title="Эрх сунгах"
            variant="outlined"
            onPress={onPressExtendSubscription}
          />
        )}
      </BoxContainer>
    </TouchableOpacity>
  );
};

const css = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
});

export default SingleTruck;
