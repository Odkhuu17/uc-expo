import { Call, Facebook, SmsTracking } from 'iconsax-react-nativejs';
import { Linking } from 'react-native';

import {
  BoxContainer,
  Container,
  NormalHeader,
  ScrollableContent,
} from '@/components';
import SingleContact from './SingleContact';

const Contact = () => {
  const onPressCall = () => {
    Linking.openURL('tel:76115522');
  };

  const onPressFacebook = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=100075737932454');
  };

  const onPressMail = () => {
    Linking.openURL('mailto:unlimitedcarrier2021@gmail.com');
  };

  return (
    <Container>
      <NormalHeader title="Холбоо барих" hasBack />
      <ScrollableContent edges={['bottom']}>
        <BoxContainer gap="m">
          <SingleContact title="76115522" icon={Call} onPress={onPressCall} />
          <SingleContact
            title="Facebook"
            icon={Facebook}
            onPress={onPressFacebook}
          />
          <SingleContact
            title="unlimitedcarrier2021@gmail.com"
            icon={SmsTracking}
            onPress={onPressMail}
          />
        </BoxContainer>
      </ScrollableContent>
    </Container>
  );
};

export default Contact;
