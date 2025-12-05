import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { useLinkDeviceMutation } from '@/gql/mutations/linkDeviceMutation.generated';
import { useAppSelector } from '@/redux/hooks';

const useLinkDevice = () => {
  const { user } = useAppSelector(state => state.auth);
  const [linkDevice] = useLinkDeviceMutation();

  useEffect(() => {
    init();
  }, [user]);

  const init = async () => {
    const token = await Notifications.getDevicePushTokenAsync();

    linkDevice({
      variables: {
        token: token.data,
        deviceType: Device.DeviceType[Device.deviceType || 0],
        deviceModel: Device.modelName || 'UNKNOWN',
        deviceOs: Platform.OS,
      },
    });
  };
};

export default useLinkDevice;
