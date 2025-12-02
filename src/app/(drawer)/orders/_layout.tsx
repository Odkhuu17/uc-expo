import { useAppSelector } from '@/redux/hooks';
import { Stack } from 'expo-router';

const OrderLayout = () => {
  const { mode } = useAppSelector(state => state.general);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={mode === 'shipper'}>
        <Stack.Screen name="create" />
        <Stack.Screen name="[number]/edit" />
        <Stack.Screen name="[number]/requests" />
      </Stack.Protected>
      <Stack.Screen name="index" />
      <Stack.Screen name="[number]" />
    </Stack>
  );
};

export default OrderLayout;
