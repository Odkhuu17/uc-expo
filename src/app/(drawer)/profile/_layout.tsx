import { useAppSelector } from '@/redux/hooks';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  const { mode } = useAppSelector(state => state.general);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={mode === 'shipper'}>
        <Stack.Screen name="orders/index" />
        <Stack.Screen name="orders/[number]" />
      </Stack.Protected>
      <Stack.Protected guard={mode === 'driver'}>
        <Stack.Screen name="trucks/index" />
        <Stack.Screen name="trucks/add" />
      </Stack.Protected>
    </Stack>
  );
}
