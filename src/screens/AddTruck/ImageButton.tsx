import { useTheme } from '@shopify/restyle';
import * as ImagePicker from 'expo-image-picker';
import { Add } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { Box } from '@/components/Theme';

interface Props {
  setImages: Dispatch<SetStateAction<string[]>>;
}

const ImageButton = ({ setImages }: Props) => {
  const theme = useTheme();
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
    <TouchableOpacity onPress={onPickImage}>
      <Box
        width={60}
        height={100}
        alignItems="center"
        justifyContent="center"
        borderWidth={2}
        borderColor="grey2"
        borderRadius="m"
        borderStyle="dashed"
      >
        <Add size={theme.icon.xl} color={theme.colors.grey2} />
      </Box>
    </TouchableOpacity>
  );
};

export default ImageButton;
