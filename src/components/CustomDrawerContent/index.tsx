import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
  Box as BoxIcon,
  Call,
  Note1,
  Truck,
  User,
  UserAdd,
} from 'iconsax-react-nativejs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, FitImage } from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import SingleLinkButton from './SingleLinkButton';
import UserInfo from './UserInfo';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { mode } = useAppSelector(state => state.general);

  const onLogout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    dispatch(authSlice.actions.logout());
    router.replace('/auth/login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={css.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        locations={theme.gradients.primaryLocations}
        style={[
          css.gradient,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Box flex={1} p="m" gap="m">
          <Box alignSelf="center">
            <FitImage
              source={require('assets/images/logo-light.png')}
              width={144}
            />
          </Box>
          <UserInfo />
          <Box justifyContent="space-around" flex={1}>
            <Box gap="l">
              <SingleLinkButton
                icon={User}
                title="Миний мэдээлэл"
                href="/profile"
              />
              {mode === 'shipper' && (
                <>
                  <SingleLinkButton
                    icon={Truck}
                    title="Жолооч хайх"
                    href="/shipper"
                  />
                  <SingleLinkButton
                    icon={BoxIcon}
                    title="Миний захиалгууд"
                    href="/profile/orders"
                  />
                </>
              )}
              {mode === 'driver' && (
                <>
                  <SingleLinkButton
                    icon={BoxIcon}
                    title="Захиалгууд"
                    href="/driver/orders"
                  />

                  <SingleLinkButton
                    icon={UserAdd}
                    title="Гишүүнчлэл"
                    href="/driver/membership"
                  />
                </>
              )}
            </Box>
            <Box gap="l">
              <SingleLinkButton
                icon={Note1}
                title="Үйлчилгээний нөхцөл"
                href="/"
              />
              <SingleLinkButton icon={Call} title="Холбоо барих" href="/" />
            </Box>
            <Button title="Гарах" onPress={onLogout} />
          </Box>
        </Box>
      </LinearGradient>
    </DrawerContentScrollView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 0,
    paddingEnd: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  gradient: {
    flex: 1,
  },
});

export default CustomDrawerContent;
