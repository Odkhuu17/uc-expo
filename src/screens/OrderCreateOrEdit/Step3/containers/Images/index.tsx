import { ScrollView, StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

import { Box } from '@/components/Theme';
import { GetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import { ImageObject } from '@/gql/graphql';
import SingleImage from './SingleImage';

interface Props {
  number: string;
  imageObjects: NonNullable<GetOrderDetailQuery['order']>['imageObjects'];
  setImageObjects?: Dispatch<SetStateAction<ImageObject[]>>;
}

const Images = ({ number, imageObjects, setImageObjects }: Props) => {
  console.log(imageObjects);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box flexDirection="row" gap="m" pl="m">
        {imageObjects?.map((imageObj, index) => (
          <SingleImage
            key={index}
            number={number}
            imageObject={imageObj}
            setImageObjects={setImageObjects}
          />
        ))}
      </Box>
    </ScrollView>
  );
};

const css = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default Images;
