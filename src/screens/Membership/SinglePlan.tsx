import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { CustomBottomSheetModal } from '@/components';
import { Box, Text } from '@/components/Theme';
import { PaymentMethodEnum } from '@/gql/graphql';
import { useCreatePaymentMutation } from '@/gql/mutations/createPaymentMutation.generated';
import { GetSubscriptionPlansQuery } from '@/gql/query/getSubscriptionPlans.generated';
import { moneyFormat } from '@/utils/helpers';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  node: GetSubscriptionPlansQuery['subscriptionPlans']['edges'][0]['node'];
}

const SinglePlan = ({ node }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const [createPayment, { data, loading }] = useCreatePaymentMutation();
  const insets = useSafeAreaInsets();

  const onPress = async () => {
    createPayment({
      variables: {
        action: 'q_pay_merchant' as PaymentMethodEnum,
        subscriptionPlanId: node?.id as string,
      },
    }).then(() => {
      bottomSheetModalRef.current?.present();
    });
  };

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
          {data?.createPayment?.banks?.map(
            (
              bank: {
                description: string;
                link: string;
                logo: string;
                name: string;
              },
              index: number
            ) => {
              console.log(bank.link, 'banklink');
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
