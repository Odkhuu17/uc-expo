import { INavigationProps } from '@/navigations';
import ModalMsgContent from '@/components/ModalMsgContent';
import useLogout from '@/hooks/useLogout';

interface Props {
  navigation: INavigationProps<'MsgModal'>['navigation'];
  route: INavigationProps<'MsgModal'>['route'];
}

const MsgModal = ({ navigation, route }: Props) => {
  const { type, msg } = route.params;
  const { logout } = useLogout();

  const handleClose = async () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      await logout();
      navigation.navigate('AuthChooseType');
    }
  };

  return <ModalMsgContent type={type} msg={msg} handleClose={handleClose} />;
};

export default MsgModal;
