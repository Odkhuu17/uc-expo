import { LinearGradient } from 'expo-linear-gradient';
import { Dispatch, SetStateAction } from 'react';

import { Button, FitImage } from '@/components';
import { Box, Text, makeStyles, useTheme } from '@/components/Theme';

interface Props {
  setIsRent: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const useStyles = makeStyles(theme => ({
  titleContainer: {
    paddingHorizontal: theme.spacing.xl2,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadii.l,
  },
}));

const Step1 = ({ setIsRent, setStep }: Props) => {
  const theme = useTheme();
  const styles = useStyles();

  const onPress1 = () => {
    setIsRent(false);
    setStep(2);
  };

  const onPress2 = () => {
    setIsRent(true);
    setStep(2);
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box gap="xl3" alignItems="center">
        <LinearGradient
          colors={theme.gradients.primary}
          style={styles.titleContainer}
        >
          <Text textAlign="center" color="white" fontFamily="Roboto_500Medium">
            Ачааны төрөл сонгох
          </Text>
        </LinearGradient>
        <Box gap="xl">
          <Box alignItems="center">
            <FitImage
              source={require('assets/images/trucks.png')}
              width={300}
            />
            <Button title="Ачааны машин" onPress={onPress1} />
          </Box>
          <Box alignItems="center">
            <FitImage source={require('assets/images/rents.png')} width={300} />
            <Button title="Техник түрээс" onPress={onPress2} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Step1;
