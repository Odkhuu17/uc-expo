import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { theme } from '@/components/Theme';
import ApolloProvider from '@/apollo/Provider';
import { persistor, store } from '@/redux/store.instance';
import AppNavigator from './navigations';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
