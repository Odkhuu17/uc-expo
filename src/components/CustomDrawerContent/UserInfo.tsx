import { useAppSelector } from '@/redux/hooks';
import { Box, Text } from '../Theme';
import UserAvatar from '../UserAvatar';

const UserInfo = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      gap="s"
      backgroundColor="white"
      borderRadius="full"
      p="s"
    >
      <UserAvatar avatar={user?.avatar} />
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
