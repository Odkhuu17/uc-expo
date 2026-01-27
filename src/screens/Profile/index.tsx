import { Alert, RefreshControl } from 'react-native';
import {
  Book02Icon,
  CallIcon,
  Notification02Icon,
} from '@hugeicons/core-free-icons';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  BoxContainer,
  Button,
  Container,
  HeaderNormal,
  ContentScrollable,
  BottomContainer,
} from '@/components';
import { Box } from '@/components/Theme';
import { SingleMenu, UserInfo } from './components';
import { useGetMeLazyQuery } from '@/gql/queries/getMe.generated';
import { INavigationProps } from '@/navigations';
import useLogout from '@/hooks/useLogout';
import LocationPermission from './LocationPermission';
import UserVerify from './UserVerify';
import UserTrucks from './UserTrucks';

interface Props {
  navigation: INavigationProps<'Profile'>['navigation'];
}

const ProfileScreen = ({ navigation }: Props) => {
  const [getMe, { data: userData, loading: userLoading }] = useGetMeLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const { logout } = useLogout();

  const onPressProfile = () => {
    navigation.navigate('ProfileUpdate');
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
        onPress: logout,
      },
    ]);
  };

  const onPressContact = () => {
    navigation.navigate('Contact');
  };

  const onPressTerms = () => {
    navigation.navigate('Terms');
  };

  const onPressNotifications = () => {
    navigation.navigate('Notifications');
  };

  useFocusEffect(
    useCallback(() => {
      getMe();
    }, []),
  );

  return (
    <Container>
      <HeaderNormal title="Миний мэдээлэл" />
      <ContentScrollable
        edges={['bottom']}
        refreshControl={
          <RefreshControl onRefresh={getMe} refreshing={userLoading} />
        }
      >
        {userData?.me && (
          <Box gap="m">
            <LocationPermission />
            <BoxContainer gap="m">
              <UserInfo userData={userData?.me} onPress={onPressProfile} />
              <UserVerify userData={userData?.me} refetch={getMe} />
            </BoxContainer>
            <UserTrucks userData={userData?.me} />
            <BoxContainer>
              <SingleMenu
                title="Мэдэгдлүүд"
                icon={Notification02Icon}
                onPress={onPressNotifications}
              />
            </BoxContainer>
            <BoxContainer>
              <SingleMenu
                title="Холбоо барих"
                icon={CallIcon}
                onPress={onPressContact}
              />
            </BoxContainer>
            <BoxContainer>
              <SingleMenu
                title="Үйлчилгээний нөхцөл"
                icon={Book02Icon}
                onPress={onPressTerms}
              />
            </BoxContainer>
          </Box>
        )}
      </ContentScrollable>
      <BottomContainer noInsets>
        <Button title="Системээс гарах" onPress={onLogout} variant="outlined" />
      </BottomContainer>
    </Container>
  );
};

export default ProfileScreen;
