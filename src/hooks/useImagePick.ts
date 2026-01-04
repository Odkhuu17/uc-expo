import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { Alert, Keyboard } from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

interface Props {
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
  cameraType?: 'front' | 'back';
}

const useImagePick = ({ setImage, onlyCamera, cameraType = 'back' }: Props) => {
  const checkAndRequestCameraPermission = async (): Promise<boolean> => {
    Keyboard.dismiss();
    const permission = PERMISSIONS.IOS.CAMERA;
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        return true;
      } else if (requestResult === RESULTS.BLOCKED) {
        showSettingsAlert('камер');
        return false;
      }
      return false;
    } else if (result === RESULTS.BLOCKED) {
      showSettingsAlert('камер');
      return false;
    }
    return false;
  };

  const checkAndRequestPhotoLibraryPermission = async (): Promise<boolean> => {
    Keyboard.dismiss();
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    const result = await check(permission);

    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (
        requestResult === RESULTS.GRANTED ||
        requestResult === RESULTS.LIMITED
      ) {
        return true;
      } else if (requestResult === RESULTS.BLOCKED) {
        showSettingsAlert('зургийн сан');
        return false;
      }
      return false;
    } else if (result === RESULTS.BLOCKED) {
      showSettingsAlert('зургийн сан');
      return false;
    }
    return false;
  };

  const showSettingsAlert = (permissionType: string) => {
    Alert.alert(
      `${
        permissionType.charAt(0).toUpperCase() + permissionType.slice(1)
      }ийн зөвшөөрөл хэрэгтэй`,
      `Та тохиргоо руу орж ${permissionType}ийн зөвшөөрөл олгоно уу.`,
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Тохиргоо руу очих',
          onPress: () => openSettings(),
        },
      ],
    );
  };

  const onLaunchCamera = async () => {
    const hasPermission = await checkAndRequestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'photo',
      cameraType,
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const onLauncImageLibrary = async () => {
    const hasPermission = await checkAndRequestPhotoLibraryPermission();
    if (!hasPermission) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const onPickImage = async () => {
    if (onlyCamera) {
      return onLaunchCamera();
    }

    Alert.alert('Зураг оруулах', 'Зураг оруулах төрлөө сонгоно уу!', [
      {
        text: 'Камер нээх',
        onPress: onLaunchCamera,
      },
      {
        text: 'Зураг сонгох',
        onPress: onLauncImageLibrary,
      },
      { text: 'Буцах', style: 'cancel' },
    ]);
  };

  return {
    onPickImage,
  };
};

export default useImagePick;
