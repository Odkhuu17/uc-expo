import React, { useState } from 'react';
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

import { Container, HeaderNormal } from '@/components';
import AllOrders from './AllOrders';
import MyOrders from './MyOrders';
import { useTheme } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';

const renderScene = SceneMap({
  first: AllOrders,
  second: MyOrders,
});

const routes = [
  { key: 'first', title: 'Бүх захиалгууд' },
  { key: 'second', title: 'Миний захиалгууд' },
];

const renderTabBar = (props: TabBarProps<any>) => {
  const theme = useTheme();

  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.white }}
      style={{ backgroundColor: theme.colors.primary }}
    />
  );
};

const Orders = () => {
  const { mode } = useAppSelector(state => state.general);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <Container>
      <HeaderNormal title="Захиалгууд" />
      {mode === 'driver' ? (
        <AllOrders />
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      )}
    </Container>
  );
};

export default Orders;
