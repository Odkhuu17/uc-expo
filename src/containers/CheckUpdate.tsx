import { SystemUpdate02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useEffect, useState } from 'react';
import { Modal, Linking, Alert, Platform } from 'react-native';
import { checkVersion } from 'react-native-check-version';

import { BoxContainer, Button } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';

const CheckUpdate = () => {
  const theme = useTheme();
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const version = await checkVersion();

    setStoreUrl(version.url);
    setNeedsUpdate(version.needsUpdate);
  };

  const onConfirm = async () => {
    const supported = await Linking.canOpenURL(storeUrl);

    if (supported) {
      await Linking.openURL(storeUrl).catch(e => console.log(e));
    } else {
      Alert.alert(
        'Алдаа',
        `Танд ${
          Platform.OS === 'ios' ? 'App Store' : 'Google Play'
        } апп байхгүй байна.`,
      );
    }
  };

  return (
    <Modal animationType="fade" transparent visible={needsUpdate}>
      <BoxContainer
        flex={1}
        backgroundColor="backdrop"
        alignItems="center"
        justifyContent="center"
        p="xl2"
      >
        <Box
          backgroundColor="white"
          width="100%"
          gap="m"
          p="m"
          borderRadius="s"
        >
          <Text textAlign="center" variant="title">
            Шинэчлэлт
          </Text>
          <Box alignItems="center">
            <HugeiconsIcon
              icon={SystemUpdate02Icon}
              color={theme.colors.success}
              size={theme.icon.xl2}
            />
          </Box>
          <Text textAlign="center" variant="body2">
            Шинэ хувилбар гарсан байна. Апп-ыг шинэчилнэ үү.
          </Text>
          <Box flexDirection="row" gap="m">
            <Box flex={1}>
              <Button onPress={onConfirm} title="Шинэчлэх" size="sm" />
            </Box>
          </Box>
        </Box>
      </BoxContainer>
    </Modal>
  );
};

export default CheckUpdate;
