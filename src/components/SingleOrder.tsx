import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Box as BoxIcon, LocationDiscover } from 'iconsax-react-nativejs';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { Box, makeStyles, Text, useTheme } from '@/components/Theme';
import { GetOrdersQuery } from '@/gql/query/getOrders.generated';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl, isRentOrder } from '@/utils/helpers';
import BoxContainer from './BoxContainer';
import Button from './Button';
import Label from './Label';

interface Props {
  item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
}

const useStyles = makeStyles(theme => ({
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadii.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
}));

const SingleOrder = ({ item }: Props) => {
  const theme = useTheme();
  const styles = useStyles();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const router = useRouter();
  const { mode } = useAppSelector(state => state.general);

  const hasImages = item?.images && item?.images.length > 0;

  const onPressEdit = () => {
    router.navigate(`/orders/${item?.number}/edit`);
  };

  const onPressImage = () => {
    setIsImageViewVisible(true);
  };

  const isRent = isRentOrder(item?.carType);

  return (
    <>
      <Link href={`/orders/${item?.number}`} asChild>
        <TouchableOpacity>
          <BoxContainer p={undefined} overflow="hidden">
            <Box alignItems="flex-end" pt="s" pr="s">
              <Label
                text={isRent ? 'Техник түрээс' : 'Ачаа тээвэр'}
                backgroundColor={isRent ? 'yellow' : 'baseBlue'}
              />
            </Box>
            <Box flexDirection="row" alignItems="center" gap="s" p="m">
              <Box
                width={100}
                height={100}
                alignItems="center"
                justifyContent="center"
              >
                {hasImages ? (
                  <TouchableOpacity onPress={onPressImage}>
                    <Image
                      source={{
                        uri: getImageUrl(item.images![0]),
                      }}
                      contentFit="cover"
                      style={styles.image}
                    />
                  </TouchableOpacity>
                ) : (
                  <BoxIcon size={theme.icon.xl2} color={theme.colors.grey2} />
                )}
              </Box>
              <Box flex={1} gap="m">
                {!isRent && (
                  <Text color="lightBlue2" fontFamily="Roboto_500Medium">
                    {item?.packageType}
                  </Text>
                )}
                <Box>
                  <Box flexDirection="row" alignItems="center" gap="xs">
                    <Box alignItems="center">
                      <LocationDiscover
                        color={theme.colors.lightBlue2}
                        size={theme.icon.s}
                      />
                    </Box>
                    <Box>
                      <Text variant="body2">{item?.origin?.address1}</Text>
                    </Box>
                  </Box>
                  {!isRent && (
                    <>
                      <Box
                        alignItems="center"
                        width={theme.icon.s}
                        justifyContent="center"
                      >
                        <Box height={15}>
                          <Box
                            width={1}
                            overflow="hidden"
                            top={-5}
                            bottom={-5}
                            position="absolute"
                          >
                            <Box
                              borderWidth={1}
                              width={1}
                              height="100%"
                              borderStyle="dashed"
                              borderColor="baseBlue"
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box flexDirection="row" alignItems="center" gap="xs">
                        <Box>
                          <LocationDiscover
                            color={theme.colors.lightBlue2}
                            size={theme.icon.s}
                          />
                        </Box>
                        <Box>
                          <Text variant="body2">
                            {item?.destination?.address1}
                          </Text>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
                <Box gap="xs">
                  <Box flexDirection="row" alignItems="center" gap="xs">
                    <Box flex={1}>
                      <Text color="baseBlue" variant="body2">
                        {isRent ? 'Ажил эхлэх өдөр:' : 'Ачих:'}
                      </Text>
                    </Box>
                    <Box>
                      <Text variant="body2" color="grey2">
                        {isRent
                          ? dayjs(item?.travelAt).format('YYYY/MM/DD')
                          : dayjs(item?.travelAt).format('YYYY/MM/DD HH:mm')}
                      </Text>
                    </Box>
                  </Box>
                  <Box flexDirection="row" alignItems="center" gap="xs">
                    <Box flex={1}>
                      <Text color="baseBlue" variant="body2">
                        Захиалсан:
                      </Text>
                    </Box>
                    <Box>
                      <Text variant="body2" color="grey2">
                        {dayjs(item?.createdAt).format('YYYY/MM/DD')}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              backgroundColor={
                item?.status === 'pending' ? 'darkBlue' : 'grey4'
              }
              p="xs"
              px="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                color={item?.status === 'pending' ? 'lightBlue' : 'white'}
                variant="label"
              >
                {item?.status === 'pending' ? 'Идэвхтэй' : 'Идэвхгүй'}
              </Text>
              {mode === 'shipper' && item?.my && item?.status === 'pending' ? (
                <Button title="Засах" size="s" onPress={onPressEdit} />
              ) : (
                <Box height={theme.button.s} />
              )}
            </Box>
          </BoxContainer>
        </TouchableOpacity>
      </Link>
      {hasImages && (
        <ImageView
          images={item?.images?.map(img => ({ uri: getImageUrl(img) })) || []}
          imageIndex={0}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
        />
      )}
    </>
  );
};

export default SingleOrder;
