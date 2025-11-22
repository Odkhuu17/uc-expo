import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/roboto';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { InstantSearch } from 'react-instantsearch';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloClientProvider } from '@/apollo/apollo.client';
import { theme } from '@/components/Theme';
import Navigations from '@/Navigations';
import { persistor, store } from '@/redux/store.instance';
import searchClient from '@/utils/searchkit';

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
    Roboto_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloClientProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <BottomSheetModalProvider>
                  <InstantSearch
                    indexName="supp_tracks"
                    searchClient={searchClient}
                  >
                    <Navigations />
                  </InstantSearch>
                  <StatusBar style="auto" />
                </BottomSheetModalProvider>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApolloClientProvider>
  );
}
