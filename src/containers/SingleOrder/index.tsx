import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Location05Icon, PackageIcon } from '@hugeicons/core-free-icons';

import { Box, makeStyles, Text, useTheme } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl, isRentOrder } from '@/utils/helpers';
import { Label, BoxContainer, ModalMsg } from '@/components';
import { GetOrdersQuery } from '@/gql/queries/getOrders.generated';
import { INavigation } from '@/navigations';

interface Props {
  item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
  children?: ReactNode;
}

const useStyles = makeStyles(theme => ({
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadii.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  carImage: {
    width: 50,
    height: 50,
  },
}));

const SingleOrder = ({ item, children }: Props) => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation<INavigation>();
  const { mode } = useAppSelector(state => state.general);
  const [msgModal, setMsgModal] = useState(false);

  const hasImages = item?.images && item?.images.length > 0;
  const isRent = isRentOrder(item?.carType);

  const onNavigateToDetail = () => {
    if (mode === 'shipper') {
      if (item?.my) {
        return navigation.navigate('OrderDetail', { number: item?.number! });
      } else {
        navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Та бусдын захиалгыг харах боломжгүй байна.',
        });
      }
    } else if (item?.subscribed) {
      navigation.navigate('OrderDetail', { number: item?.number! });
    } else {
      setMsgModal(true);
    }
  };

  const handleCloseMsgModal = () => {
    setMsgModal(false);
  };

  const handleConfirmMsgModal = () => {
    setMsgModal(false);
    navigation.navigate('TrucksMy');
  };

  return (
    <>
      <TouchableOpacity onPress={onNavigateToDetail}>
        <BoxContainer
          borderWidth={1}
          borderColor="border"
          overflow="hidden"
          gap="s"
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex={1}>
              <Text color={isRent ? 'rent' : 'primary'} variant="title">
                {isRent ? item?.carType : item?.packageType}
              </Text>
            </Box>
            <Label
              text={isRent ? 'Техник түрээс' : 'Ачаа тээвэр'}
              backgroundColor={isRent ? 'rent' : 'delivery'}
            />
          </Box>
          <Box flexDirection="row" alignItems="center" gap="s">
            <Box
              width={100}
              height={100}
              alignItems="center"
              justifyContent="center"
            >
              {hasImages ? (
                <Image
                  source={{
                    uri: getImageUrl(item.images![0]),
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
              ) : (
                <HugeiconsIcon
                  icon={PackageIcon}
                  size={theme.icon.xl2}
                  color={theme.colors.grey2}
                />
              )}
            </Box>
            <Box flex={1} gap="m">
              <Box>
                <Box flexDirection="row" alignItems="center" gap="xs">
                  <Box alignItems="center">
                    <HugeiconsIcon icon={Location05Icon} size={theme.icon.s} />
                  </Box>
                  <Box flex={1}>
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
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box flexDirection="row" alignItems="center" gap="xs">
                      <Box>
                        <HugeiconsIcon
                          icon={Location05Icon}
                          size={theme.icon.s}
                        />
                      </Box>
                      <Box flex={1}>
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
                    <Text variant="body3">
                      {isRent ? 'Ажил эхлэх өдөр:' : 'Ачих:'}
                    </Text>
                  </Box>
                  <Box>
                    <Text variant="body3" color="grey4">
                      {isRent
                        ? dayjs(item?.travelAt).format('YYYY-MM-DD')
                        : dayjs(item?.travelAt).format('YYYY-MM-DD HH:mm')}
                    </Text>
                  </Box>
                </Box>
                <Box flexDirection="row" alignItems="center" gap="xs">
                  <Box flex={1}>
                    <Text variant="body3">Захиалсан:</Text>
                  </Box>
                  <Box>
                    <Text variant="body3" color="grey4">
                      {dayjs(item?.updatedAt).format('YYYY-MM-DD')}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {children}
        </BoxContainer>
      </TouchableOpacity>
      <ModalMsg
        type="error"
        visible={msgModal}
        msg="Таны эрх дууссан байна! Та эрхээ сунгах уу?"
        handleClose={handleCloseMsgModal}
        handleConfirm={handleConfirmMsgModal}
      />
    </>
  );
};

export default SingleOrder;
