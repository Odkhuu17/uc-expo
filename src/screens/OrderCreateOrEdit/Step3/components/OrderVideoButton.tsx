import * as ImagePicker from 'expo-image-picker';
import { VideoPlay } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import OrderIconButton from './OrderIconButton';

interface Props {
  setVideo: Dispatch<SetStateAction<string>>;
}

const OrderVideoButton = ({ setVideo }: Props) => {
  const onPickVideo = async () => {
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
      mediaTypes: ['videos'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  return (
    <OrderIconButton
      icon={VideoPlay}
      title="Бичлэг нэмэх"
      onPress={onPickVideo}
    />
  );
};

export default OrderVideoButton;
