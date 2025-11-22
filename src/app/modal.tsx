import { useLocalSearchParams, useRouter } from 'expo-router';
import { ShieldTick, Warning2 } from 'iconsax-react-nativejs';

import { Button } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';

export default function ModalScreen() {
  const { type, message } = useLocalSearchParams<{
    type: 'error' | 'success';
    message: string;
  }>();
  const router = useRouter();
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
        <Button onPress={router.back} title="Хаах" />
      </Box>
    </Box>
  );
}
