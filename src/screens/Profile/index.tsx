import { Alert, RefreshControl } from 'react-native';
import { Book02Icon, CallIcon } from '@hugeicons/core-free-icons';

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
import { useGetMeQuery } from '@/gql/queries/getMe.generated';
import { INavigationProps } from '@/navigations';
import useLogout from '@/hooks/useLogout';
import LocationPermission from './LocationPermission';
import UserVerify from './UserVerify';
import UserTrucks from './UserTrucks';

interface Props {
  navigation: INavigationProps<'Profile'>['navigation'];
}

const ProfileScreen = ({ navigation }: Props) => {
  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useGetMeQuery({
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

  return (
    <Container>
      <HeaderNormal title="Миний мэдээлэл" />
      <ContentScrollable
        edges={['bottom']}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={userLoading} />
        }
      >
        <Box gap="m">
          <LocationPermission />
          <BoxContainer gap="m">
            <UserInfo userData={userData?.me} onPress={onPressProfile} />
            <UserVerify userData={userData?.me} refetch={refetch} />
          </BoxContainer>
          <UserTrucks userData={userData?.me} />
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
    </Container>
  );
};

export default ProfileScreen;
