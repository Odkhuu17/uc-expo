import { Image } from 'expo-image';
import { Trash } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import { ScrollView } from 'react-native';

import { IconButton } from '@/components';
import { Box, makeStyles, useTheme } from '@/components/Theme';

interface Props {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
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

const Images = ({ image, setImage }: Props) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.scrollView}
    >
      {image && (
        <Box
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
                setImage(null);
              }}
            />
          </Box>
        </Box>
      )}
    </ScrollView>
  );
};

export default Images;
