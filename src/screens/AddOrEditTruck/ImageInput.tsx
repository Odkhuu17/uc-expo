import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Add, Trash } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';

interface Props {
  label: string;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
}

const ImageInput = ({ image, setImage, label, onlyCamera }: Props) => {
  const theme = useTheme();

  const onLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      cameraType: onlyCamera
        ? ImagePicker.CameraType.front
        : ImagePicker.CameraType.back,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
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
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        },
      },
      { text: 'Буцах', style: 'cancel' },
    ]);
  };

  const onDeleteImage = () => {
    setImage(null);
  };

  return (
    <BoxContainer
      borderWidth={2}
      borderStyle="dashed"
      borderRadius="m"
      height={180}
      p={undefined}
    >
      {image ? (
        <Box width="100%" height="100%">
          <Box overflow="hidden" borderRadius="s" width="100%" height="100%">
            <Image source={{ uri: image }} style={css.img} contentFit="cover" />
          </Box>
          <Box
            position="absolute"
            top={theme.spacing.m}
            right={theme.spacing.m}
          >
            <IconButton
              icon={Trash}
              backgroundColor="white"
              onPress={onDeleteImage}
            />
          </Box>
        </Box>
      ) : (
        <TouchableOpacity onPress={handlePickImage}>
          <Box
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            gap="s"
            p="m"
          >
            <Text textAlign="center">{label}</Text>
            <Add size={theme.icon.xl} />
          </Box>
        </TouchableOpacity>
      )}
    </BoxContainer>
  );
};

const css = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
