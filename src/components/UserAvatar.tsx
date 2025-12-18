import { Image } from 'expo-image';
import { UserOctagon } from 'iconsax-react-nativejs';

import { getImageUrl } from '@/utils/helpers';
import { makeStyles, useTheme } from './Theme';

interface Props {
  avatar?: string;
}

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.icon.xl,
    height: theme.icon.xl,
    borderRadius: theme.borderRadii.full,
  },
}));

const UserAvatar = ({ avatar }: Props) => {
  const theme = useTheme();
  const styles = useStyles();

  return avatar ? (
    <Image source={{ uri: getImageUrl(avatar) }} style={styles.avatar} />
  ) : (
    <UserOctagon size={theme.icon.xl} />
  );
};

export default UserAvatar;
