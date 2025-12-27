import { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import {
  Book02Icon,
  CallIcon,
  ContainerTruck01Icon,
} from '@hugeicons/core-free-icons';
import { useFocusEffect } from '@react-navigation/native';

import {
  BoxContainer,
  Button,
  Container,
  Loader,
  HeaderNormal,
  Progress,
  ContentScrollable,
  Warning,
  BottomContainer,
} from '@/components';
import { Box } from '@/components/Theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import { SingleMenu, UserInfo } from './components';
import { useGetMeLazyQuery } from '@/gql/queries/getMe.generated';
import { INavigationProps } from '@/navigations';

interface Props {
  navigation: INavigationProps<'Profile'>['navigation'];
}

const ProfileScreen = ({ navigation }: Props) => {
  const [getUser, { data: userData, loading: userLoading }] = useGetMeLazyQuery(
    {
      fetchPolicy: 'no-cache',
    },
  );

  const dispatch = useAppDispatch();
  const [hasPendingUserVerification, setHasPendingUserVerification] =
    useState(false);

  const { mode } = useAppSelector(state => state.general);

  const hasVerifiedTruck = userData?.me?.trucks?.some(truck => truck.verified);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
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
        return navigation.navigate('MsgModal', {
          type: 'success',
          msg: 'Таны бүртгэл амжилттай баталгаажлаа.',
        });
      }
    }
  }, [userData, hasPendingUserVerification]);

  const onPressProfile = () => {
    navigation.navigate('ProfileUpdate');
  };

  const onPressVerification = () => {
    navigation.navigate('DriverVerify');
  };

  const onLogout = () => {
    Alert.alert('Гарах', 'Та системээс гарахдаа итгэлтэй байна уу?', [
      {
        text: 'Буцах',
        style: 'cancel',
      },
      {
        text: 'Тийм',
        style: 'destructive',
        onPress: () => {
          dispatch(authSlice.actions.logout());
        },
      },
    ]);
  };

  const onPressMyTrucks = () => {
    navigation.navigate('TrucksMy');
  };

  const onPressContact = () => {
    navigation.navigate('Contact');
  };

  const onPressTerms = () => {
    navigation.navigate('Terms');
  };

  return (
    <Container>
      <HeaderNormal title="Миний мэдээлэл" />
      {userLoading ? (
        <Loader />
      ) : (
        <>
          <ContentScrollable
            edges={['bottom']}
            refreshControl={
              <RefreshControl onRefresh={getUser} refreshing={userLoading} />
            }
          >
            <Box gap="m">
              <BoxContainer gap="m">
                <UserInfo userData={userData?.me} onPress={onPressProfile} />
                {!userData?.me?.verified && mode === 'driver' && (
                  <>
                    {userData?.me?.verifications?.edges?.[0]?.node?.status ===
                    'pending' ? (
                      <Progress sec={15} onFinish={getUser} />
                    ) : (
                      <Warning description="Таны бүртгэл баталгаажаагүй байна! Та бүртгэлээ баталгаажуулсны дараа манай системийг ашиглах боломжтой." />
                    )}
                    {userData?.me?.verifications?.edges?.[0]?.node?.field5 && (
                      <Warning
                        type="error"
                        description={
                          userData?.me?.verifications?.edges?.[0]?.node?.field5
                        }
                      />
                    )}
                    {!userData?.me?.verified &&
                      userData?.me?.verifications?.edges?.[0]?.node?.status !==
                        'pending' && (
                        <Button
                          title="Бүртгэл баталгаажуулах"
                          onPress={onPressVerification}
                        />
                      )}
                  </>
                )}
              </BoxContainer>
              {mode === 'driver' && (
                <BoxContainer gap="m">
                  <Box gap="m">
                    <SingleMenu
                      title="Миний машин"
                      icon={ContainerTruck01Icon}
                      onPress={onPressMyTrucks}
                    />
                    {!hasVerifiedTruck && (
                      <Warning description="Танд баталгаажсан машин байхгүй байна! Та машинаа баталгаажуулсны дараагаар манай системийг ашиглах боломжтой." />
                    )}
                  </Box>
                </BoxContainer>
              )}
              <BoxContainer gap="m">
                <SingleMenu
                  title="Холбоо барих"
                  icon={CallIcon}
                  onPress={onPressContact}
                />
                <SingleMenu
                  title="Үйлчилгээний нөхцөл"
                  icon={Book02Icon}
                  onPress={onPressTerms}
                />
              </BoxContainer>
            </Box>
          </ContentScrollable>
          <BottomContainer noInsets>
            <Button title="Гарах" onPress={onLogout} variant="outlined" />
          </BottomContainer>
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
