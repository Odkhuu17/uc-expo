import { Stack } from 'expo-router';

import { useAppSelector } from '@/redux/hooks';

export default function ProfileLayout() {
  const { mode } = useAppSelector(state => state.general);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="user/update" />
      <Stack.Protected guard={mode === 'shipper'}>
        <Stack.Screen name="orders/index" />
        <Stack.Screen name="orders/[number]" />
      </Stack.Protected>
      <Stack.Protected guard={mode === 'driver'}>
        <Stack.Screen name="user/verify" />
        <Stack.Screen name="trucks/index" />
        <Stack.Screen name="trucks/add" />
        <Stack.Screen name="trucks/[id]/edit" />
      </Stack.Protected>
    </Stack>
  );
}
