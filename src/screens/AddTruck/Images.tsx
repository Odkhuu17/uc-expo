import { Image } from 'expo-image';
import { Trash } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { ScrollView } from 'react-native';

import { IconButton } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';

interface Props {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
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

const Images = ({ images, setImages }: Props) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.scrollView}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius="m"
          borderColor="border"
          overflow="hidden"
        >
          <Image source={{ uri: image }} style={styles.img} />
          <Box
            position="absolute"
            top={theme.spacing.xs}
            right={theme.spacing.xs}
          >
            <IconButton
              icon={Trash}
              color="white"
              backgroundColor="backdrop"
              onPress={() => {
                setImages(prevImages =>
                  prevImages.filter((_, i) => i !== index)
                );
              }}
            />
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
};

export default Images;
