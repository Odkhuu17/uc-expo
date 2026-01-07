import { Image, StyleSheet } from 'react-native';
import { Delete03Icon } from '@hugeicons/core-free-icons';
import { Dispatch, SetStateAction } from 'react';

import { Box, useTheme } from '@/components/Theme';
import { ButtonIcon } from '@/components';
import { getImageUrl } from '@/utils/helpers';
import { useDestroyOrderImageMutation } from '@/gql/mutations/destroyOrderImage.generated';
import { ImageObject } from '@/gql/graphql';

interface Props {
  number: string;
  imageObject: ImageObject;
  setImageObjects?: Dispatch<SetStateAction<ImageObject[]>>;
}

const SingleImage = ({ number, imageObject, setImageObjects }: Props) => {
  const theme = useTheme();
  const [destroyOrderImage, { loading }] = useDestroyOrderImageMutation();

  const onDeleteImage = async () => {
    const { data } = await destroyOrderImage({
      variables: {
        number: number,
        imageId: imageObject.id,
      },
    });
    setImageObjects?.(data?.destroyOrderImage?.imageObjects || []);
  };

  return (
    <Box width={100} height={100} overflow="hidden" borderRadius="s">
      <Image
        source={{ uri: getImageUrl(imageObject?.url || '') }}
        style={css.image}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="backdrop"
        alignItems="center"
        justifyContent="center"
      >
        <Box position="absolute">
          <ButtonIcon
            size="sm"
            color="white"
            variant="outlined"
            icon={Delete03Icon}
            loading={loading}
            onPress={onDeleteImage}
          />
        </Box>
      </Box>
    </Box>
  );
};

const css = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default SingleImage;
