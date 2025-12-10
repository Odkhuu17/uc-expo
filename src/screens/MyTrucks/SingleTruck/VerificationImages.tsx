import { Image } from 'expo-image';
import { ScrollView, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useState } from 'react';

import { Box, makeStyles } from '@/components/Theme';
import { getImageUrl } from '@/utils/helpers';

interface Props {
  images: string[];
}

const useStyles = makeStyles(theme => ({
  img: {
    width: 100,
    height: 100,
  },
  scrollView: {
    gap: theme.spacing.m,
  },
}));

const VerificationImages = ({ images }: Props) => {
  const styles = useStyles();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const onPressImage = () => {
    setIsImageViewVisible(true);
  };

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollView}
      >
        {images.map((image, index) => (
          <TouchableOpacity onPress={onPressImage} key={index}>
            <Box
              borderWidth={1}
              borderRadius="m"
              borderColor="border"
              overflow="hidden"
            >
              <Image source={{ uri: getImageUrl(image) }} style={styles.img} />
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {images.length > 0 && (
        <ImageView
          images={images?.map(img => ({ uri: getImageUrl(img) })) || []}
          imageIndex={0}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
        />
      )}
    </>
  );
};

export default VerificationImages;
