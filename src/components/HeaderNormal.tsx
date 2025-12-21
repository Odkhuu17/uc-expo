import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

import { Box, makeStyles, Text, Theme, useTheme } from './Theme';
import { INavigation } from '@/navigations';

interface Props {
  title: string;
  hasBack?: boolean;
  handlePressBack?: () => void;
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
}));

const HeaderNormal = ({ title, hasBack, handlePressBack }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation<INavigation>();

  const canGoBack = (navigation.canGoBack() && hasBack) || handlePressBack;

  const onPressBack2 = () => {
    if (handlePressBack) {
      handlePressBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Box style={{ paddingTop: insets.top }} backgroundColor="white">
      <Box height={40} alignItems="center" justifyContent="center">
        {canGoBack && (
          <TouchableOpacity onPress={onPressBack2} style={styles.backButton}>
            <HugeiconsIcon icon={ArrowLeft01Icon} />
          </TouchableOpacity>
        )}
        <Text variant="header">{title}</Text>
      </Box>
    </Box>
  );
};

export default HeaderNormal;
