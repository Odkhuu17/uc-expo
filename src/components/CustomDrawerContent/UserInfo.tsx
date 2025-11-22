import { UserOctagon } from 'iconsax-react-nativejs';

import { useAppSelector } from '@/redux/hooks';
import { Box, Text, useTheme } from '../Theme';

const UserInfo = () => {
  const { user } = useAppSelector(state => state.auth);
  const theme = useTheme();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      gap="m"
      backgroundColor="white"
      borderRadius="full"
      p="s"
    >
      <UserOctagon size={theme.icon.l} />
      <Box>
        <Text variant="header" numberOfLines={1}>
          {`${user?.lastName?.charAt(0).toUpperCase()}`}.{user?.firstName}
        </Text>
        <Text variant="body1" opacity={0.8}>
          {user?.mobile}
        </Text>
      </Box>
    </Box>
  );
};

export default UserInfo;
