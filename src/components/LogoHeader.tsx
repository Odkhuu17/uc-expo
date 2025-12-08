import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-nativejs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FitImage from './FitImage';
import RoundButton from './RoundButton';
import { Box, useTheme } from './Theme';

interface Props {
  hasBack?: boolean;
  variant?: 'logo-light' | 'logo-dark';
  onBackPress?: () => void;
}

const LogoHeader = ({ variant, hasBack, onBackPress }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const onBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
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
            <RoundButton
              onPress={onBack}
              icon={ArrowLeft}
              size="m"
              borderColor="white"
              backgroundColor="baseBlue"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LogoHeader;
