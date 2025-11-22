import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="orders/index" />
      <Stack.Screen name="orders/[number]" />
      <Stack.Screen name="trucks/index" />
      <Stack.Screen name="trucks/add" />
    </Stack>
  );
}
