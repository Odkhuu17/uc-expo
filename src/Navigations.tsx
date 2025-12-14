import { Stack } from 'expo-router';

import useFeedLocation from './hooks/useFeedLocation';
import useInit from './hooks/useInit';
import useLinkDevice from './hooks/useLinkDevice';
import { useAppSelector } from './redux/hooks';

const Navigations = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.auth);

  useLinkDevice();
  useFeedLocation();
  useInit();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot" />
      </Stack.Protected>
      {/* <Stack.Protected
        guard={
          isAuthenticated && user?.role === 'driver' && user?.verified === false
        }
      >
        <Stack.Screen name="verify" />
      </Stack.Protected> */}
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
