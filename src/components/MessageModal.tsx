import { ShieldTick, Warning2 } from 'iconsax-react-nativejs';
import { Modal, ModalProps } from 'react-native';

import { Box, Text, useTheme } from '@/components/Theme';
import Button from './Button';

interface Props extends ModalProps {
  type: 'error' | 'success';
  message: string;
  onClose: () => void;
}

export default function ModalScreen({
  message,
  type,
  onClose,
  ...props
}: Props) {
  const theme = useTheme();

  return (
    <Modal animationType="fade" {...props} transparent>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="backdrop"
        p="xl2"
      >
        <Box
          backgroundColor="white"
          width="100%"
          gap="m"
          p="m"
          borderRadius="s"
        >
          <Text fontFamily="Roboto_500Medium" textAlign="center">
            {type === 'error' ? 'Алдаа' : 'Амжилттай'}
          </Text>
          <Box alignItems="center">
            {type === 'error' ? (
              <Warning2 color={theme.colors.error} size={theme.icon.xl2} />
            ) : (
              <ShieldTick color={theme.colors.success} size={theme.icon.xl2} />
            )}
          </Box>
          <Text textAlign="center">{message}</Text>
          <Button onPress={onClose} title="Хаах" />
        </Box>
      </Box>
    </Modal>
  );
}
