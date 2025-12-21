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
    Linking.openURL('https://www.facebook.com/UC.logistic');
  };

  const onPressMail = () => {
    Linking.openURL('mailto:unlimitedcarrier2021@gmail.com');
  };

  return (
    <Container>
      <NormalHeader title="Холбоо барих" hasBack />
      <ScrollableContent edges={['bottom']}>
        <BoxContainer gap="m">
          <SingleContact
            title="76115522"
            icon={Call}
            onPress={onPressCall}
            color="success"
          />
          <SingleContact
            title="Facebook"
            icon={Facebook}
            onPress={onPressFacebook}
            color="baseBlue"
          />
          <SingleContact
            title="unlimitedcarrier2021@gmail.com"
            icon={SmsTracking}
            onPress={onPressMail}
            color="red"
          />
        </BoxContainer>
      </ScrollableContent>
    </Container>
  );
};

export default Contact;
