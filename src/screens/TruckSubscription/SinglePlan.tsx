import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Box, Text } from '@/components/Theme';
import { moneyFormat } from '@/utils/helpers';
import { GetSubscriptionPlansQuery } from '@/gql/queries/getSubscriptionPlans.generated';
import { useCreateSubscriptionMutation } from '@/gql/queries/createSubscription.generated';
import { ModalBottomSheet } from '@/components';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  node: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0]['node'];
  loading?: boolean;
  truckId: string;
}

const SinglePlan = ({ node, truckId }: Props) => {
  const [createSubscription, { data, loading }] =
    useCreateSubscriptionMutation();
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const { user } = useAppSelector(state => state.auth);
  const insets = useSafeAreaInsets();

  const onPress = async () => {
    createSubscription({
      variables: {
        truckId,
        subscriptionPlanId: node?.id as string,
        userId: user?.id as string,
      },
    }).then(() => {
      bottomSheetModalRef.current?.present();
    });
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Box
          backgroundColor="primary"
          p="s"
          borderRadius="m"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="white" fontWeight={600}>
            {node?.name}
          </Text>
          <Box borderRadius="m" backgroundColor="white" p="s">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text fontWeight={600}>{moneyFormat(node?.price || 0)}</Text>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      <ModalBottomSheet ref={bottomSheetModalRef}>
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        >
          {data?.createSubscription?.payments?.[0]?.source?.bank_list?.map(
            (
              bank: {
                description: string;
                link: string;
                logo: string;
                name: string;
              },
              index: number,
            ) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    Linking.canOpenURL(bank.link)
                      .then(() => Linking.openURL(bank.link))
                      .catch(() => {
                        Alert.alert(
                          'Алдаа',
                          `Танд ${bank.name} апп байхгүй байна.`,
                        );
                      })
                  }
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    px="m"
                    py="s"
                    gap="s"
                  >
                    <Image source={{ uri: bank.logo }} style={css.img} />
                    <Text>{bank.description}</Text>
                  </Box>
                </TouchableOpacity>
              );
            },
          )}
        </BottomSheetScrollView>
      </ModalBottomSheet>
    </>
  );
};

const css = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
  },
});

export default SinglePlan;
