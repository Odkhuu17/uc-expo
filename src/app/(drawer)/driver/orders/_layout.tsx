import { Stack } from 'expo-router';

const OrderLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[number]" />
    </Stack>
  );
};

export default OrderLayout;
