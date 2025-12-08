import * as ImagePicker from 'expo-image-picker';
import { Image } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import OrderIconButton from './OrderIconButton';

interface Props {
  setImages: Dispatch<SetStateAction<string[]>>;
}

const OrderImage = ({ setImages }: Props) => {
  const onPickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, result.assets[0].uri]);
    }
  };

  return (
    <OrderIconButton icon={Image} title="Зураг нэмэх" onPress={onPickImage} />
  );
};

export default OrderImage;
