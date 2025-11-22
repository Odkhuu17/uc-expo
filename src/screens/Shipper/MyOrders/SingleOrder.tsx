import { BoxContainer, IconButton } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useDestroyOrderMutation } from '@/gql/mutations/destroyOrderMutation.generated';
import { GetMyOrdersQuery } from '@/gql/query/getMyOrdersQuery.generated';
import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import {
  Box as BoxIcon,
  LocationDiscover,
  Trash,
} from 'iconsax-react-nativejs';
import { Alert, TouchableOpacity } from 'react-native';

interface Props {
  item: NonNullable<GetMyOrdersQuery['me']>['orders']['edges'][0]['node'];
}

const SingleOrder = ({ item }: Props) => {
  const [destroyOrder, { loading }] = useDestroyOrderMutation();
  const theme = useTheme();

  const onPressDelete = () => {
    Alert.alert(
      'Захиалга устгах',
      'Та энэ захиалгыг устгахдаа итгэлтэй байна уу?',
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Устгах',
          style: 'destructive',
          onPress: () => {
            destroyOrder({ variables: { id: item?.id || '' } });
          },
        },
      ]
    );
  };

  return (
    <Link href={`/profile/orders/${item?.number}`} asChild>
      <TouchableOpacity>
        <BoxContainer gap="s">
          <Box flexDirection="row" alignItems="center">
            <Box flex={1} gap="xs">
              <Text color="lightBlue2" fontFamily="Roboto_500Medium">
                {item?.title}
              </Text>
              <Box flexDirection="row" gap="xs">
                <Text variant="body3" color="grey2">
                  {dayjs(item?.createdAt).format('YYYY-MM-DD')}
                </Text>
              </Box>
            </Box>
            <IconButton
              icon={Trash}
              backgroundColor="white"
              loading={loading}
              onPress={onPressDelete}
            />
          </Box>
          <Box flexDirection="row" alignItems="center" gap="s">
            <Box>
              <BoxIcon size={theme.icon.xl2} color={theme.colors.grey2} />
            </Box>
            <Box flex={1}>
              <Box flexDirection="row" alignItems="center" gap="xs">
                <Box alignItems="center">
                  <LocationDiscover
                    color={theme.colors.lightBlue2}
                    size={theme.icon.s}
                  />
                </Box>
                <Box>
                  <Text variant="body2">{item?.origin?.address?.address1}</Text>
                  <Text variant="body2">{item?.origin?.address?.address2}</Text>
                </Box>
              </Box>
              <Box
                alignItems="center"
                width={theme.icon.s}
                justifyContent="center"
              >
                <Box height={20}>
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
                    ></Box>
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
                    {item?.destination?.address?.address1}
                  </Text>
                  <Text variant="body2">
                    {item?.destination?.address?.address2}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </BoxContainer>
      </TouchableOpacity>
    </Link>
  );
};

export default SingleOrder;
