import { Image } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import OrderIconButton from './OrderIconButton';
import useImagePick from '@/hooks/useImagePick';

interface Props {
  setImages: Dispatch<SetStateAction<string[]>>;
}

const OrderImage = ({ setImages }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setImages(prevImages => [...prevImages, image]);
    }
  }, [image]);

  const { onPickImage } = useImagePick({ setImage });

  return (
    <OrderIconButton icon={Image} title="Зураг нэмэх" onPress={onPickImage} />
  );
};

export default OrderImage;
