import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function DrawerLayout() {
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
      <Drawer.Screen name="orders" />
      <Drawer.Screen name="driver/membership" />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
