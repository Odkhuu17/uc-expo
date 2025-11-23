import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { HamburgerMenu } from 'iconsax-react-nativejs';
import { TouchableOpacity } from 'react-native';

import { Box, makeStyles, Text, useTheme } from '@/components/Theme';

const CONTAINER_HEIGHT = 100;
const CONTAINER_WIDTH = 40;

const useStyles = makeStyles(theme => ({
  container: {
    height: CONTAINER_HEIGHT,
  },
  gradient: {
    width: CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    height: CONTAINER_WIDTH,
    borderTopRightRadius: theme.borderRadii.m,
    borderTopLeftRadius: theme.borderRadii.m,
    transform: [{ rotate: '90deg' }, { translateX: -CONTAINER_WIDTH }],
    transformOrigin: 'left bottom',
  },
}));

const MenuButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = useStyles();

  const onShowDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={onShowDrawer} style={styles.container}>
      <LinearGradient style={styles.gradient} colors={theme.gradients.primary}>
        <Box flexDirection="row" alignItems="center" gap="s">
          <Text color="white" variant="label">
            Цэсүүд
          </Text>
          <HamburgerMenu size={theme.icon.m} color={theme.colors.white} />
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MenuButton;
