import { Modal, ModalProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, makeStyles, useTheme } from '@/components/Theme';
import { Button, Terms } from '@/components';

interface Props extends ModalProps {
  handleClose: () => void;
  handleConfirm?: () => void;
}

const useStyles = makeStyles(theme => ({
  listContainer: {
    padding: theme.spacing.m,
  },
}));

const TermsModal = ({ handleClose, handleConfirm, ...props }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  return (
    <Modal animationType="fade" {...props} transparent>
      <Box
        flex={1}
        backgroundColor="backdrop"
        alignItems="center"
        justifyContent="center"
        px="xl"
        style={{
          paddingTop: insets.top + theme.spacing.xl,
          paddingBottom: insets.bottom + theme.spacing.xl,
        }}
      >
        <Box backgroundColor="white" width="100%" borderRadius="s">
          <ScrollView contentContainerStyle={styles.listContainer}>
            <Terms />
          </ScrollView>
          <Box flexDirection="row" gap="m" p="m">
            <Box flex={1}>
              <Button
                onPress={handleClose}
                title="Үгүй"
                variant={handleConfirm ? 'outlined' : undefined}
                size="sm"
              />
            </Box>
            {handleConfirm && (
              <Box flex={1}>
                <Button onPress={handleConfirm} title="Тийм" size="sm" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsModal;
