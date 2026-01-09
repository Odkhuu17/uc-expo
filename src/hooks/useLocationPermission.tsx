import { useEffect, useRef } from 'react';
import { check, PERMISSIONS } from 'react-native-permissions';
import { AppState, Platform } from 'react-native';

import { useAppDispatch } from '@/redux/hooks';
import settingsSlice from '@/redux/slices/settings';

const useLocationPermission = () => {
  const dispatch = useAppDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const permission = Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        });

        if (permission) {
          check(permission).then(result => {
            dispatch(
              settingsSlice.actions.changeLocationPermission(
                result === 'granted',
              ),
            );
          });
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default useLocationPermission;
