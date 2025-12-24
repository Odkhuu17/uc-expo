import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { PlusSignIcon } from '@hugeicons/core-free-icons';

import { Box, useTheme } from '@/components/Theme';
import { useAttachOrderImageMutation } from '@/gql/mutations/attachOrderImageInput.generated';
import useImagePick from '@/hooks/useImagePick';
import { imageToFile } from '@/utils/fileHelpers';
import { Loader } from '@/components';
import { ImageObject } from '@/gql/graphql';

interface Props {
  number: string;
  setImageObject: Dispatch<SetStateAction<ImageObject[]>>;
}

const InputImage = ({ number, setImageObject }: Props) => {
  const theme = useTheme();
  const [attachOrderImage, { loading }] = useAttachOrderImageMutation();
  const [image, setImage] = useState<string | null>(null);
  const { onPickImage } = useImagePick({ setImage });

  useEffect(() => {
    if (image) {
      createImage();
    }
  }, [image]);

  const createImage = async () => {
    const { data } = await attachOrderImage({
      variables: {
        number: number,
        images: [imageToFile(image!)],
      },
    });
    setImage(null);
    setImageObject(data?.attachOrderImage?.imageObjects || []);
  };

  return (
    <TouchableOpacity onPress={onPickImage}>
      <Box
        p="m"
        height={100}
        width={60}
        borderRadius="s"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="border"
        borderStyle="dashed"
      >
        {loading ? (
          <Loader />
        ) : (
          <HugeiconsIcon icon={PlusSignIcon} size={theme.icon.m} />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default InputImage;
