import { HugeiconsIcon } from '@hugeicons/react-native';
import { ShieldUserIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Image, TouchableOpacity } from 'react-native';

import { getImageUrl } from '@/utils/helpers';
import { Box, makeStyles, Text, useTheme } from '@/components/Theme';
import { GetMeQuery } from '@/gql/queries/getMe.generated';

interface Props {
  onPress: () => void;
  userData: GetMeQuery['me'];
}

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.icon.xl,
    height: theme.icon.xl,
    borderRadius: theme.borderRadii.full,
  },
}));

const UserAvatar = ({ onPress, userData }: Props) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" alignItems="center" gap="s">
        {userData?.avatar ? (
          <Image
            source={{ uri: getImageUrl(userData.avatar) }}
            style={styles.avatar}
          />
        ) : (
          <HugeiconsIcon icon={ShieldUserIcon} size={theme.icon.xl} />
        )}
        <Box flex={1} gap="xs">
          <Text variant="header" numberOfLines={1}>
            {`${userData?.lastName}`} {userData?.firstName}
          </Text>
          <Text variant="body2" opacity={0.8}>
            {userData?.mobile}
          </Text>
        </Box>
        <HugeiconsIcon icon={ArrowRight01Icon} size={theme.icon.m} />
      </Box>
    </TouchableOpacity>
  );
};

export default UserAvatar;
