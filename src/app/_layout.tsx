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
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { InstantSearch } from 'react-instantsearch';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloClientProvider } from '@/apollo/apollo.client';
import { theme } from '@/components/Theme';
import { useAuthStore } from '@/stores';
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
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

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
          <ThemeProvider theme={theme}>
            <BottomSheetModalProvider>
              <InstantSearch
                indexName="supp_tracks"
                searchClient={searchClient}
              >
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="auth/login" />
                    <Stack.Screen name="auth/register" />
                    <Stack.Screen name="auth/forgot" />
                  </Stack.Protected>
                  <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(drawer)" />
                  </Stack.Protected>
                  <Stack.Screen
                    name="modal"
                    options={{
                      animation: 'fade',
                      presentation: 'containedTransparentModal',
                    }}
                  />
                </Stack>
              </InstantSearch>
              <StatusBar style="auto" />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApolloClientProvider>
  );
}
