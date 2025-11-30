import { Stack } from 'expo-router';

const OrderLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="index" />
      <Stack.Screen name="[number]" />
      <Stack.Screen name="[number]/edit" />
    </Stack>
  );
};

export default OrderLayout;
