import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useAppSelector } from '@/redux/hooks';

export default function DrawerLayout() {
  const { mode } = useAppSelector(state => state.general);

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
      <Drawer.Protected guard={mode === 'driver'}>
        <Drawer.Screen name="driver/orders" />
        <Drawer.Screen name="driver/membership" />
      </Drawer.Protected>
      <Drawer.Protected guard={mode === 'shipper'}>
        <Drawer.Screen name="shipper" />
      </Drawer.Protected>
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
