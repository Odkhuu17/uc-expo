import { Stack } from 'expo-router';
// import { OneSignal } from 'react-native-onesignal';
import { useEffect } from 'react';

import useFeedLocation from './hooks/useFeedLocation';
import useLinkDevice from './hooks/useLinkDevice';
import { useAppSelector } from './redux/hooks';

const Navigations = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    // OneSignal.initialize('468ef767-c53a-4cdb-a593-2993cee373d1');
    // OneSignal.Notifications.requestPermission(false);
  }, []);

  useLinkDevice();
  useFeedLocation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(drawer)" />
      </Stack.Protected>
      <Stack.Screen
        name="modal"
        options={{
          animation: 'fade',
          presentation: 'containedTransparentModal',
        }}
      />
    </Stack>
  );
};

export default Navigations;
