import { useEffect } from 'react';
import { Platform } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';

import { useAppSelector } from '@/redux/hooks';
import { useLinkDeviceMutation } from '@/gql/mutations/linkDevice.generated';

const useLinkDevice = () => {
  const { user } = useAppSelector(state => state.auth);
  const [linkDevice] = useLinkDeviceMutation();

  useEffect(() => {
    init();
  }, [user]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = await OneSignal.User.pushSubscription.getIdAsync();

    if (token) {
      linkDevice({
        variables: {
          token: token,
          subscribed: true,
          deviceType: DeviceInfo.getDeviceType() || 'UNKNOWN',
          deviceModel: DeviceInfo.getModel() || 'UNKNOWN',
          deviceOs: Platform.OS === 'ios' ? 'iOS' : 'Android',
        },
      });
    }
  };
};

export default useLinkDevice;
