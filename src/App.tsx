import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OneSignal, LogLevel } from 'react-native-onesignal';

import { theme } from '@/components/Theme';
import ApolloProvider from '@/apollo/Provider';
import { persistor, store } from '@/redux/store.instance';
import AppNavigator from './navigations';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { Appearance } from 'react-native';

Appearance.setColorScheme('light');

const App = () => {
  useEffect(() => {
    try {
      // Enable verbose logging for debugging (remove in production)
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      // Initialize with your OneSignal App ID
      OneSignal.initialize('468ef767-c53a-4cdb-a593-2993cee373d1');
      // Use this method to prompt for push notifications.
      // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
      OneSignal.Notifications.requestPermission(false);

      console.log('OneSignal initialized successfully');
    } catch (error) {
      console.error('OneSignal initialization error:', error);
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <BottomSheetModalProvider>
                  <NavigationContainer>
                    <ApolloProvider>
                      <AppNavigator />
                    </ApolloProvider>
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
    </>
  );
};

export default App;
