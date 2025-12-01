import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { ArrowLeft2, Setting2 } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';

interface Props {
  title: string;
  hasBack?: boolean;
  onPressBack?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
  },
}));

const NormalHeader = ({ title, hasBack, onPressBack }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const navigation = useNavigation();

  const onShowDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const canGoBack = (router.canGoBack() && hasBack) || onPressBack;

  const onPressBack2 = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      router.back();
    }
  };

  return (
    <Box style={{ paddingTop: insets.top }} backgroundColor="white">
      <Box height={40} alignItems="center" justifyContent="center">
        {canGoBack && (
          <TouchableOpacity onPress={onPressBack2} style={styles.backButton}>
            <ArrowLeft2 size={theme.icon.m} />
          </TouchableOpacity>
        )}
        <Text variant="header">{title}</Text>
        <TouchableOpacity onPress={onShowDrawer} style={styles.settingsButton}>
          <Setting2 color={theme.colors.darkGrey} size={theme.icon.m} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default NormalHeader;
