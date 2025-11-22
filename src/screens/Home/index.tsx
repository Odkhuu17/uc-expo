import { useRouter } from 'expo-router';

import { Button, Container, Content, LogoHeader } from '@/components';
import { Box } from '@/components/Theme';
import { useAppDispatch } from '@/redux/hooks';
import generalSlice from '@/redux/slices/general';
import SingleButton from './SingleButton';

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onPressDriver = () => {
    dispatch(generalSlice.actions.changeMode('driver'));
    router.navigate('/auth/login');
  };

  const onPressShipper = () => {
    dispatch(generalSlice.actions.changeMode('shipper'));
    router.navigate('/auth/login');
  };

  return (
    <Container bg="dark-car">
      <LogoHeader variant="logo-light" />
      <Content edges={['bottom']}>
        <Box gap="xl" alignItems="center" flex={1} justifyContent="center">
          <SingleButton img={require('assets/images/driver.png')}>
            <Button
              textColor="black"
              title="Жолооч"
              backgroundColor="lightBlue2"
              onPress={onPressDriver}
              width={180}
            />
          </SingleButton>
          <SingleButton img={require('assets/images/shipper.png')}>
            <Button
              textColor="black"
              title="Ачаа илгээгч"
              backgroundColor="lightBlue"
              onPress={onPressShipper}
              width={180}
            />
          </SingleButton>
        </Box>
      </Content>
    </Container>
  );
};

export default HomeScreen;
