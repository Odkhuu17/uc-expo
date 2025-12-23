import { HugeiconsIcon } from '@hugeicons/react-native';
import { Alert02Icon, SecurityCheckIcon } from '@hugeicons/core-free-icons';

import { Box, Text, useTheme } from './Theme';
import Button from './Button';

interface Props {
  type: 'error' | 'success';
  msg: string;
  handleClose: () => void;
  handleConfirm?: () => void;
  handleConfirmTitle?: string;
}

const ModalMsgContent = ({
  type,
  msg,
  handleClose,
  handleConfirm,
  handleConfirmTitle = 'Тийм',
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      backgroundColor="backdrop"
      alignItems="center"
      justifyContent="center"
      p="xl2"
    >
      <Box backgroundColor="white" width="100%" gap="m" p="m" borderRadius="s">
        <Text textAlign="center" variant="title">
          {type === 'error' ? 'Алдаа' : 'Амжилттай'}
        </Text>
        <Box alignItems="center">
          {type === 'error' ? (
            <HugeiconsIcon
              icon={Alert02Icon}
              color={theme.colors.error}
              size={theme.icon.xl2}
            />
          ) : (
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              color={theme.colors.success}
              size={theme.icon.xl2}
            />
          )}
        </Box>
        <Text textAlign="center" variant="body2">
          {msg}
        </Text>
        <Box flexDirection="row" gap="m">
          <Box flex={1}>
            <Button
              onPress={handleClose}
              title="Хаах"
              variant={handleConfirm ? 'outlined' : undefined}
            />
          </Box>
          {handleConfirm && (
            <Box flex={1}>
              <Button onPress={handleConfirm} title={handleConfirmTitle} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ModalMsgContent;
