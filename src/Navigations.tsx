import { Stack } from 'expo-router';
// import { LogLevel, OneSignal } from 'react-native-onesignal';

import useLinkDevice from './hooks/useLinkDevice';
import { useAppSelector } from './redux/hooks';

const Navigations = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  // useEffect(() => {
  //   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  //   OneSignal.initialize('YOUR_APP_ID');
  //   OneSignal.Notifications.requestPermission(false);
  // }, []);

  useLinkDevice();

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
