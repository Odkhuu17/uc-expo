import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  PackageReceive01Icon,
  PackageSearchIcon,
  PackageSentIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';

import { useAppSelector } from '@/redux/hooks';
import Orders from '@/screens/Orders';
import Profile from '@/screens/Profile';
import DeliveryRequestsMy from '@/screens/DeliveryRequestsMy';
import OrdersMy from '@/screens/OrdersMy';
import { useTheme } from '@/components/Theme';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useTheme();
  const { mode } = useAppSelector(state => state.general);
  const { user } = useAppSelector(state => state.auth);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey4,
      }}
    >
      {user?.verified && (
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Захиалгууд',
            tabBarIcon: ({ color, size }) => (
              <HugeiconsIcon
                icon={PackageSearchIcon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
      {user?.verified && (
        <>
          {mode === 'shipper' ? (
            <Tab.Screen
              name="My orders"
              component={OrdersMy}
              options={{
                tabBarLabel: 'Миний захиалгууд',
                tabBarIcon: ({ color, size }) => (
                  <HugeiconsIcon
                    icon={PackageSentIcon}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="My delivery requests"
              component={DeliveryRequestsMy}
              options={{
                tabBarLabel: 'Миний хүсэлтүүд',
                tabBarIcon: ({ color, size }) => (
                  <HugeiconsIcon
                    icon={PackageReceive01Icon}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          )}
        </>
      )}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Профайл',
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={UserIcon} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
