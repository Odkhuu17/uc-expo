import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '@/redux/hooks';
import Orders from '@/screens/Orders';
import Profile from '@/screens/Profile';
import DeliveryRequestsMy from '@/screens/DeliveryRequestsMy';
import OrdersMy from '@/screens/OrdersMy';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { mode } = useAppSelector(state => state.general);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Orders" component={Orders} />
      {mode === 'shipper' ? (
        <Tab.Screen name="My orders" component={OrdersMy} />
      ) : (
        <Tab.Screen
          name="My delivery requests"
          component={DeliveryRequestsMy}
        />
      )}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
