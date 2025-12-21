import { INavigationProps } from '@/navigations';
import ModalMsgContent from '@/components/ModalMsgContent';

interface Props {
  navigation: INavigationProps<'MsgModal'>['navigation'];
  route: INavigationProps<'MsgModal'>['route'];
}

const MsgModal = ({ navigation, route }: Props) => {
  const { type, msg } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return <ModalMsgContent type={type} msg={msg} handleClose={handleClose} />;
};

export default MsgModal;
