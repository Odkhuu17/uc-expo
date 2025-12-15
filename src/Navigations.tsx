import { Stack } from 'expo-router';

import useFeedLocation from './hooks/useFeedLocation';
import useInit from './hooks/useInit';
import useLinkDevice from './hooks/useLinkDevice';
import { useAppSelector } from './redux/hooks';

const Navigations = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { mode } = useAppSelector(state => state.general);
  const { user } = useAppSelector(state => state.auth);

  useLinkDevice();
  useFeedLocation();
  useInit();

  console.log(user, '123');

  const pendingVerification =
    isAuthenticated &&
    mode === 'driver' &&
    !user?.verified &&
    user?.verifications?.edges?.length !== 0;

  const notVerified =
    isAuthenticated &&
    mode === 'driver' &&
    !user?.verified &&
    user?.verifications?.edges?.length === 0;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot" />
      </Stack.Protected>
      <Stack.Protected guard={notVerified}>
        <Stack.Screen name="verify" />
      </Stack.Protected>
      <Stack.Protected guard={pendingVerification}>
        <Stack.Screen name="waiting" />
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
