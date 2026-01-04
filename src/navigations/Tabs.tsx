import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  PackageReceive01Icon,
  PackageSearchIcon,
  PlusSignIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';

import { useAppSelector } from '@/redux/hooks';
import Orders from '@/screens/Orders';
import Profile from '@/screens/Profile';
import DeliveryRequestsMy from '@/screens/DeliveryRequestsMy';
import { Box, makeStyles, useTheme } from '@/components/Theme';

const Tab = createBottomTabNavigator();

const useStyles = makeStyles(theme => ({
  middleTab: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadii.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
    marginTop: -10,
  },
}));

const OrderTabButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Box alignItems="center" justifyContent="center">
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.middleTab}
      >
        <HugeiconsIcon
          icon={PlusSignIcon}
          color={theme.colors.white}
          size={theme.icon.l}
        />
      </Pressable>
    </Box>
  );
};

const CreateOrderPlaceholder = () => null;

const Tabs = () => {
  const theme = useTheme();
  const { mode } = useAppSelector(state => state.general);
  const { user } = useAppSelector(state => state.auth);
  const { locationPermission } = useAppSelector(state => state.settings);

  const navigation = useNavigation<any>();

  const goToCreateOrder = () => {
    const parent = navigation.getParent?.();
    if (parent?.navigate) {
      parent.navigate('OrderCreateOrEdit', { number: undefined });
      return;
    }
    navigation.navigate('OrderCreateOrEdit', { number: undefined });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey4,
      }}
    >
      {mode === 'driver' ? (
        <>
          {user?.verified && locationPermission && (
            <>
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
            </>
          )}
        </>
      ) : (
        <>
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
          <Tab.Screen
            name="CreateOrder"
            component={CreateOrderPlaceholder}
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => <OrderTabButton onPress={goToCreateOrder} />,
            }}
          />
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
