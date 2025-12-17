import { useRouter } from 'expo-router';
import { Box as BoxIcon, Truck, UserOctagon } from 'iconsax-react-nativejs';
import { RefreshControl, TouchableOpacity } from 'react-native';

import {
  BoxContainer,
  Container,
  NormalHeader,
  ScrollableContent,
  Warning,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import SingleMenu from './SingleMenu';
import { useGetUserQuery } from '@/gql/query/getUserQuery.generated';

const ProfileScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const {
    data: userData,
    loading: userLoading,
    refetch: userRefetch,
  } = useGetUserQuery({ fetchPolicy: 'no-cache' });
  const { mode } = useAppSelector(state => state.general);

  const hasVerifiedTruck = userData?.me?.trucks?.some(truck => truck.verified);

  const onPressProfile = () => {
    router.push('/profile/user/update');
  };

  return (
    <Container>
      <NormalHeader title="Миний мэдээлэл" hasBack />
      <ScrollableContent
        edges={['bottom']}
        refreshControl={
          <RefreshControl onRefresh={userRefetch} refreshing={userLoading} />
        }
      >
        <Box gap="m">
          <TouchableOpacity onPress={onPressProfile}>
            <BoxContainer flexDirection="row" alignItems="center" gap="m">
              <UserOctagon size={theme.icon.l} />
              <Box>
                <Text variant="header" numberOfLines={1}>
                  {`${userData?.me?.lastName}`} {userData?.me?.firstName}
                </Text>
                <Text variant="body1" opacity={0.8}>
                  {userData?.me?.mobile}
                </Text>
              </Box>
            </BoxContainer>
          </TouchableOpacity>
          <BoxContainer>
            {mode === 'shipper' && (
              <SingleMenu
                title="Миний захиалгууд"
                icon={BoxIcon}
                onPress={() => router.navigate('/profile/orders')}
              />
            )}
            {mode === 'driver' && (
              <>
                {!hasVerifiedTruck && (
                  <Box gap="s" pb="m">
                    <Warning description="Танд бүртгэлтэй машин байхгүй байна! Та машин нэмсний дараагаар манай системийг ашиглах боломжтой." />
                  </Box>
                )}
                <SingleMenu
                  title="Миний машин"
                  icon={Truck}
                  onPress={() => router.navigate('/profile/trucks')}
                />
              </>
            )}
          </BoxContainer>
        </Box>
      </ScrollableContent>
    </Container>
  );
};

export default ProfileScreen;
