import { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Delete03Icon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { BoxContainer, ButtonIcon } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import useImagePick from '@/hooks/useImagePick';
import InputLabel from './InputLabel';

interface Props {
  label: string;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  onlyCamera?: boolean;
  isRequired?: boolean;
  cropping?: boolean;
}

const InputImage = ({
  image,
  setImage,
  label,
  onlyCamera,
  isRequired,
  cropping,
}: Props) => {
  const theme = useTheme();
  const { onPickImage } = useImagePick({ setImage, onlyCamera, cropping });

  const onDeleteImage = () => {
    setImage(null);
  };

  return (
    <Box>
      <InputLabel label={label} isRequired={isRequired} />
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
              <Image
                source={{ uri: image }}
                style={css.img}
                resizeMode="contain"
              />
            </Box>
            <Box
              position="absolute"
              top={theme.spacing.m}
              right={theme.spacing.m}
            >
              <ButtonIcon icon={Delete03Icon} onPress={onDeleteImage} />
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
              <HugeiconsIcon icon={PlusSignIcon} size={theme.icon.xl} />
            </Box>
          </TouchableOpacity>
        )}
      </BoxContainer>
    </Box>
  );
};

const css = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default InputImage;
