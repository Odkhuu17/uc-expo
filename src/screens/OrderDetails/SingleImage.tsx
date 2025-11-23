

import { Box, makeStyles } from '@/components/Theme';
import { getImageUrl } from '@/utils/helpers';
import { Image } from 'expo-image';

const useStyles = makeStyles(theme => ({
  img: {
    width: 100,
    height: 100,
  },
  scrollView: {
    gap: theme.spacing.m,
  },
}));

const OrderDetail = () => {
  const styles = useStyles();


  return (
    <Box
      borderWidth={1}
      borderRadius="m"
      borderColor="border"
      overflow="hidden"
    >
      <Image source={{ uri: getImageUrl(image) }} style={styles.img} />
    </Box>
  );
};

export default OrderDetail;
