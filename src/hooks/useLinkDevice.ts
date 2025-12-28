import {
  getDeviceType,
  getModel,
  getSystemName,
} from 'react-native-device-info';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import { useAppSelector } from '@/redux/hooks';
import { useLinkDeviceMutation } from '@/gql/mutations/linkDevice.generated';

const useLinkDevice = () => {
  const { user } = useAppSelector(state => state.auth);
  const [linkDevice] = useLinkDeviceMutation();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);

  const init = async () => {
    const token = await OneSignal.User.pushSubscription.getIdAsync();

    if (token) {
      linkDevice({
        variables: {
          token,
          subscribed: true,
          deviceType: getDeviceType() || 'UNKNOWN',
          deviceModel: getModel() || 'UNKNOWN',
          deviceOs: getSystemName() || Platform.OS,
        },
      });
    }
  };
};

export default useLinkDevice;
