import ImagePicker from 'react-native-image-crop-picker';
import { Dispatch, SetStateAction } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
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
  cropping?: boolean;
}

const useImagePick = ({
  setImage,
  onlyCamera,
  cameraType = 'back',
  cropping,
}: Props) => {
  const checkAndRequestCameraPermission = async (): Promise<boolean> => {
    Keyboard.dismiss();
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    if (!permission) return false;

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

    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else if (Platform.OS === 'android') {
      permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }

    if (!permission) return false;

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

    try {
      const result = await ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        mediaType: 'photo',
        cameraType,
        quality: 0.8,
        compressImageQuality: 1,
        cropping: cropping || false,
        freeStyleCropEnabled: true,
      });

      if (result) {
        setImage(result.path || null);
      }
    } catch (error) {
      console.log('Camera launch error:', error);
    }
  };

  const onLauncImageLibrary = async () => {
    const hasPermission = await checkAndRequestPhotoLibraryPermission();
    if (!hasPermission) return;
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'photo',
        quality: 0.8,
        width: 1000,
        height: 1000,
        compressImageQuality: 1,
        cropping: cropping || false,
        freeStyleCropEnabled: true,
      });
      if (result) {
        setImage(result.path || null);
      }
    } catch (error) {
      console.log('Image library launch error:', error);
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
