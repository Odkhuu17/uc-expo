import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

interface Props {
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
}

const useImagePick = ({ setImage, onlyCamera }: Props) => {
  const onLaunchCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const onLauncImageLibrary = async () => {
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
