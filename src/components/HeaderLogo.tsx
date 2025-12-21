import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircleArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import FitImage from './FitImage';
import { Box, useTheme } from './Theme';

interface Props {
  hasBack?: boolean;
  variant?: 'logo-light' | 'logo-dark';
  handlePressBack?: () => void;
}

const HeaderLogo = ({ variant, hasBack, handlePressBack }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress2 = () => {
    if (handlePressBack) {
      handlePressBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Box style={{ paddingTop: insets.top + theme.spacing.m }}>
      <Box alignItems="center">
        {(variant === 'logo-dark' || variant === 'logo-light') && (
          <FitImage
            source={
              variant === 'logo-dark'
                ? require('assets/images/logo-dark.png')
                : require('assets/images/logo-light.png')
            }
            width={190}
          />
        )}
        {hasBack && (
          <Box position="absolute" top={0} left={theme.spacing.m}>
            <TouchableOpacity onPress={handleBackPress2}>
              <HugeiconsIcon
                icon={CircleArrowLeft01Icon}
                size={theme.icon.xl}
                color={
                  variant === 'logo-dark'
                    ? theme.colors.primary
                    : theme.colors.white
                }
              />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeaderLogo;
