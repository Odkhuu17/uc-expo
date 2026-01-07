import { StyleSheet, TouchableOpacity } from 'react-native';

import { Container, Content, HeaderLogo } from '@/components';
import { Box, Text } from '@/components/Theme';
import { useAppDispatch } from '@/redux/hooks';
import generalSlice from '@/redux/slices/general';
import SingleButton from './SingleButton';
import { INavigationProps } from '@/navigations';

interface Props {
  navigation: INavigationProps<'AuthChooseType'>['navigation'];
}

const AuthChooseType = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const handlePressDriver = () => {
    dispatch(generalSlice.actions.changeMode('driver'));
    navigation.navigate('AuthLogin');
  };

  const handlePressShipper = () => {
    dispatch(generalSlice.actions.changeMode('shipper'));
    navigation.navigate('AuthLogin');
  };

  return (
    <Container bg="dark-car">
      <HeaderLogo variant="logo-light" />
      <Content edges={['bottom']}>
        <Box gap="xl" alignItems="center" flex={1} justifyContent="center">
          <TouchableOpacity onPress={handlePressDriver}>
            <SingleButton img={require('@/assets/images/driver.png')}>
              <Box
                backgroundColor="secondary"
                px="l"
                py="m"
                borderRadius="full"
                style={css.button}
              >
                <Text variant="title" color="white">
                  Жолооч
                </Text>
              </Box>
            </SingleButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressShipper}>
            <SingleButton img={require('@/assets/images/shipper.png')}>
              <Box
                backgroundColor="secondary"
                px="l"
                py="m"
                borderRadius="full"
                style={css.button}
              >
                <Text variant="title" color="white">
                  Ачаа илгээгч
                </Text>
              </Box>
            </SingleButton>
          </TouchableOpacity>
        </Box>
      </Content>
    </Container>
  );
};

const css = StyleSheet.create({
  button: {
    marginTop: -10,
  },
});

export default AuthChooseType;
