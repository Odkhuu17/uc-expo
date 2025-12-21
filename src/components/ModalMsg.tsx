import { Modal, ModalProps } from 'react-native';

import ModalMsgContent from './ModalMsgContent';

interface Props extends ModalProps {
  type: 'error' | 'success';
  msg: string;
  handleClose: () => void;
  handleConfirm?: () => void;
}
const ModalMsg = ({
  msg,
  type,
  handleClose,
  handleConfirm,
  ...props
}: Props) => {
  return (
    <Modal animationType="fade" {...props} transparent>
      <ModalMsgContent
        type={type}
        msg={msg}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Modal>
  );
};

export default ModalMsg;
