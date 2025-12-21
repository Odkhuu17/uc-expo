import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Orders from '@/screens/Orders';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Orders" component={Orders} />
    </Tab.Navigator>
  );
};

export default Tabs;
