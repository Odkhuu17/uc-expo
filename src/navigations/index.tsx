import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';

import { useTheme } from '@/components/Theme';
import AuthChooseType from '@/screens/AuthChooseType';
import AuthLogin from '@/screens/AuthLogin';
import MsgModal from '@/screens/MsgModal';
import AuthRegister from '@/screens/AuthRegister';
import AuthForgot from '@/screens/AuthForgot';
import Tabs from './Tabs';
import { useAppSelector } from '@/redux/hooks';
import OrderDetail from '@/screens/OrderDetail';
import OrderCreateOrEdit from '@/screens/OrderCreateOrEdit';
import Contact from '@/screens/Contact';
import Terms from '@/screens/Terms';
import ProfileUpdate from '@/screens/ProfileUpdate';
import TrucksMy from '@/screens/TrucksMy';
import TruckAddOrEdit from '@/screens/TruckAddOrEdit';
import TruckSubscription from '@/screens/TruckSubscription';
import TrackTruck from '@/screens/TrackTruck';
import OrderRequests from '@/screens/OrderRequests';
import DriverVerify from '@/screens/DriverVerify';
import useFeedLocation from '@/hooks/useFeedLocation';
import useLinkDevice from '@/hooks/useLinkDevice';
import useUpdateUser from '@/hooks/useUpdateUser';
import useLocationPermission from '@/hooks/useLocationPermission';

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
  OrderDetail: {
    number: string;
  };
  OrderCreateOrEdit: {
    number?: string;
  };
  OrderRequests: {
    number: string;
  };
  Profile: undefined;
  ProfileUpdate: undefined;
  Contact: undefined;
  Terms: undefined;
  TrucksMy: undefined;
  TruckAddOrEdit: {
    id?: string;
  };
  TruckSubscription: {
    truckId: string;
  };
  TrackTruck: {
    number: string;
  };
  DriverVerify: undefined;
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

  useFeedLocation();
  useLinkDevice();
  useUpdateUser();
  useLocationPermission();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="AuthChooseType" component={AuthChooseType} />
          <Stack.Screen name="AuthLogin" component={AuthLogin} />
          <Stack.Screen name="AuthRegister" component={AuthRegister} />
          <Stack.Screen name="AuthForgot" component={AuthForgot} />
        </Stack.Group>
      ) : (
        <Stack.Group
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Stack.Screen name="TrucksMy" component={TrucksMy} />
          <Stack.Screen name="TruckAddOrEdit" component={TruckAddOrEdit} />
          <Stack.Screen
            name="TruckSubscription"
            component={TruckSubscription}
          />
          <Stack.Screen name="TrackTruck" component={TrackTruck} />
          <Stack.Screen
            name="OrderCreateOrEdit"
            component={OrderCreateOrEdit}
          />
          <Stack.Screen name="OrderRequests" component={OrderRequests} />
          <Stack.Screen name="DriverVerify" component={DriverVerify} />
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.backdrop,
          },
          presentation: 'transparentModal',
          ...TransitionPresets.ModalFadeTransition,
        }}
      >
        <Stack.Screen name="MsgModal" component={MsgModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
