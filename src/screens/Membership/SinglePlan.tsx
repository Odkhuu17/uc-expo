import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomBottomSheetModal } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useCreateSubscriptionMutation } from '@/gql/mutations/createSubscription.generated';
import { GetSubscriptionPlansQuery } from '@/gql/query/getSubscriptionPlans.generated';
import { useAppSelector } from '@/redux/hooks';
import { moneyFormat } from '@/utils/helpers';

interface Props {
  node: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0]['node'];
}

const SinglePlan = ({ node }: Props) => {
  const { id } = useLocalSearchParams();
  const { user } = useAppSelector(state => state.auth);
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const [createSubscription, { data, loading }] =
    useCreateSubscriptionMutation();
  const insets = useSafeAreaInsets();
  const appState = useRef(AppState.currentState);

  const onPress = async () => {
    createSubscription({
      variables: {
        truckId: id as string,
        subscriptionPlanId: node?.id as string,
        userId: user?.id as string,
      },
    }).then(() => {
      bottomSheetModalRef.current?.present();
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        bottomSheetModalRef.current?.dismiss();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Box
          backgroundColor="baseBlue"
          p="s"
          borderRadius="m"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="white" fontFamily="Roboto_500Medium">
            {node?.name}
          </Text>
          <Box borderRadius="m" backgroundColor="white" p="s">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text fontFamily="Roboto_500Medium">
                {moneyFormat(node?.price || 0)}
              </Text>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      <CustomBottomSheetModal ref={bottomSheetModalRef}>
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
              index: number
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
                          `Танд ${bank.name} апп байхгүй байна.`
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
            }
          )}
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
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
