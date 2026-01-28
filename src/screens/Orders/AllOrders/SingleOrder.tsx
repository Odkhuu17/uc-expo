import { ReactNode, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Box, Text } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { isRentOrder } from '@/utils/helpers';
import { Label, BoxContainer, ModalMsg, SingleOrderBody } from '@/components';
import { GetOrdersQuery } from '@/gql/queries/getOrders.generated';
import { INavigation } from '@/navigations';

interface Props {
  item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
  children?: ReactNode;
  canOpen?: boolean;
}

const SingleOrder = ({ item, children }: Props) => {
  const navigation = useNavigation<INavigation>();
  const { mode } = useAppSelector(state => state.general);
  const [msgModal, setMsgModal] = useState(false);

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
              <Text
                color={isRent ? 'rent' : 'primary'}
                variant="title"
                textDecorationLine={
                  item?.status === 'accepted' || item?.status === 'completed'
                    ? 'line-through'
                    : 'none'
                }
              >
                {isRent ? item?.carType : item?.packageType}
              </Text>
            </Box>
            {item?.status === 'accepted' || item?.status === 'completed' ? (
              <Label text="Идэвхгүй" backgroundColor="grey2" />
            ) : (
              <Label
                text={isRent ? 'Техник түрээс' : 'Ачаа тээвэр'}
                backgroundColor={isRent ? 'rent' : 'delivery'}
              />
            )}
          </Box>
          <SingleOrderBody item={item} />
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
