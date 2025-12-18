import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowRight2, Box as BoxIcon, Truck } from 'iconsax-react-nativejs';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';

import {
  BoxContainer,
  Button,
  Container,
  Loader,
  NormalHeader,
  Progress,
  ScrollableContent,
  UserAvatar,
  Warning,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useGetUserLazyQuery } from '@/gql/query/getUserQuery.generated';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import SingleMenu from './SingleMenu';

const ProfileScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const [getUser, { data: userData, loading: userLoading }] =
    useGetUserLazyQuery({
      fetchPolicy: 'no-cache',
    });
  const dispatch = useAppDispatch();
  const [hasPendingUserVerification, setHasPendingUserVerification] =
    useState(false);

  const { mode } = useAppSelector(state => state.general);

  const hasVerifiedTruck = userData?.me?.trucks?.some(truck => truck.verified);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  useEffect(() => {
    if (userData) {
      dispatch(authSlice.actions.changeUser(userData.me!));
      if (userData.me?.verifications?.edges?.[0]?.node?.status === 'pending') {
        setHasPendingUserVerification(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData && hasPendingUserVerification) {
      if (userData.me?.verified) {
        setHasPendingUserVerification(false);
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'success',
            message: 'Таны бүртгэл амжилттай баталгаажлаа.',
          },
        });
      }
    }
  }, [userData, hasPendingUserVerification]);

  const onPressProfile = () => {
    router.push('/profile/user/update');
  };

  const onPressVerification = () => {
    router.push('/profile/user/verify');
  };

  return (
    <Container>
      <NormalHeader title="Миний мэдээлэл" hasBack />
      {userLoading ? (
        <Loader />
      ) : (
        <ScrollableContent
          edges={['bottom']}
          refreshControl={
            <RefreshControl onRefresh={getUser} refreshing={userLoading} />
          }
        >
          <Box gap="m">
            <BoxContainer gap="m">
              <TouchableOpacity onPress={onPressProfile}>
                <Box flexDirection="row" alignItems="center" gap="s">
                  <UserAvatar avatar={userData?.me?.avatar} />
                  <Box flex={1}>
                    <Text variant="header" numberOfLines={1}>
                      {`${userData?.me?.lastName}`} {userData?.me?.firstName}
                    </Text>
                    <Text variant="body1" opacity={0.8}>
                      {userData?.me?.mobile}
                    </Text>
                  </Box>
                  <ArrowRight2 size={theme.icon.m} />
                </Box>
              </TouchableOpacity>
              {!userData?.me?.verified && (
                <>
                  {userData?.me?.verifications?.edges?.[0]?.node?.status ===
                  'pending' ? (
                    <Progress sec={30} onFinish={getUser} />
                  ) : (
                    <Warning description="Таны бүртгэл баталгаажаагүй байна! Та бүртгэлээ баталгаажуулсны дараа манай системийг ашиглах боломжтой." />
                  )}
                  {userData?.me?.verifications?.edges?.length === 0 && (
                    <Button
                      title="Бүртгэл баталгаажуулах"
                      onPress={onPressVerification}
                    />
                  )}
                </>
              )}
            </BoxContainer>
            <BoxContainer>
              {mode === 'shipper' && (
                <SingleMenu
                  title="Миний захиалгууд"
                  icon={BoxIcon}
                  onPress={() => router.navigate('/profile/orders')}
                />
              )}
              {mode === 'driver' && (
                <Box gap="m">
                  <SingleMenu
                    title="Миний машин"
                    icon={Truck}
                    onPress={() => router.navigate('/profile/trucks')}
                  />
                  {!hasVerifiedTruck && (
                    <Warning description="Танд баталгаажсан машин байхгүй байна! Та машинаа баталгаажуулсны дараагаар манай системийг ашиглах боломжтой." />
                  )}
                </Box>
              )}
            </BoxContainer>
          </Box>
        </ScrollableContent>
      )}
    </Container>
  );
};

export default ProfileScreen;
