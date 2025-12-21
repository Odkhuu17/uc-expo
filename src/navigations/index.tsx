import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { IAuthReduxState } from '@/redux/slices/auth';

import { useTheme } from '@/components/Theme';
import AuthChooseType from '@/screens/AuthChooseType';
import AuthLogin from '@/screens/AuthLogin';
import MsgModal from '@/screens/MsgModal';
import AuthRegister from '@/screens/AuthRegister';
import AuthForgot from '@/screens/AuthForgot';
import Tabs from './Tabs';
import { useAppSelector } from '@/redux/hooks';

export type TAppRoutes = {
  AuthChooseType: undefined;
  AuthLogin: undefined;
  AuthRegister: undefined;
  AuthForgot: undefined;
  MsgModal: {
    type: 'error' | 'success';
    msg: string;
  };
  Tabs: undefined;
};

export interface INavigationProps<RouteName extends keyof TAppRoutes> {
  navigation: StackNavigationProp<TAppRoutes, RouteName>;
  route: RouteProp<TAppRoutes, RouteName>;
}

export type INavigation = StackNavigationProp<TAppRoutes>;

const Stack = createStackNavigator<TAppRoutes>();

const AppNavigator = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  console.log('isAuthenticated', isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthChooseType" component={AuthChooseType} />
          <Stack.Screen name="AuthLogin" component={AuthLogin} />
          <Stack.Screen name="AuthRegister" component={AuthRegister} />
          <Stack.Screen name="AuthForgot" component={AuthForgot} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.backdrop,
          },
          presentation: 'transparentModal',
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="MsgModal" component={MsgModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
