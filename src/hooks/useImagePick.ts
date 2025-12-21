import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

interface Props {
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
}

const useImagePick = ({ setImage, onlyCamera }: Props) => {
  const onLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.6,
      cameraType: ImagePicker.CameraType.front,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') return;
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.6,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        },
      },
      { text: 'Буцах', style: 'cancel' },
    ]);
  };

  return {
    onPickImage,
  };
};

export default useImagePick;
