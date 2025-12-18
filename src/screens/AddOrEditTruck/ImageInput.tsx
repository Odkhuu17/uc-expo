import { Image } from 'expo-image';
import { Add, Trash } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { BoxContainer, IconButton } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import useImagePick from '@/hooks/useImagePick';

interface Props {
  label: string;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
}

const ImageInput = ({ image, setImage, label, onlyCamera }: Props) => {
  const theme = useTheme();
  const { onPickImage } = useImagePick({ setImage, onlyCamera });

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
            <Image source={{ uri: image }} style={css.img} contentFit="contain" />
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
        <TouchableOpacity onPress={onPickImage}>
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
