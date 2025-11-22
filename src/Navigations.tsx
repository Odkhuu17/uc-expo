import { Stack } from 'expo-router';

import { useAppSelector } from './redux/hooks';

const Navigations = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

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
