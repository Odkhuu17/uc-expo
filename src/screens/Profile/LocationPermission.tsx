import { openSettings, PERMISSIONS, request } from 'react-native-permissions';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import settingsSlice from '@/redux/slices/settings';
import { BoxContainer, Button, Warning } from '@/components';

const LocationPermission = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.general);

  const { locationPermission } = useAppSelector(state => state.settings);

  const onPressLocationPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(res => {
        if (res === 'granted') {
          dispatch(settingsSlice.actions.changeLocationPermission(true));
        } else {
          openSettings('application');
        }
      })
      .catch(() => console.warn('Cannot request location accuracy'));
  };

  if (!locationPermission && mode === 'driver') {
    return (
      <BoxContainer gap="m">
        <Warning
          type="error"
          description="Таны байрлалын зөвшөөрөл олдоогүй байна! Та байрлалын зөвшөөрөл олгосны дараа манай системийг ашиглах боломжтой."
        />
        <Button title="Зөвшөөрөл олгох" onPress={onPressLocationPermission} />
      </BoxContainer>
    );
  }

  return null;
};

export default LocationPermission;
