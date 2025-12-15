import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useAppSelector } from '@/redux/hooks';

export default function DrawerLayout() {
  const { user } = useAppSelector(state => state.auth);
  const { mode } = useAppSelector(state => state.general);

  const hasVerifiedTruck = user?.trucks?.some(truck => truck.verified);

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: 'white',
          width: 280,
        },
      }}
    >
      <Drawer.Protected guard={mode !== 'driver' || !!hasVerifiedTruck}>
        <Drawer.Screen name="orders" />
        <Drawer.Screen name="membership" />
      </Drawer.Protected>
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
