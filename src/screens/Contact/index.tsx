import { Linking } from 'react-native';

import {
  BoxContainer,
  Container,
  HeaderNormal,
  ContentScrollable,
} from '@/components';
import SingleContact from './SingleContact';
import {
  CallOutgoing04Icon,
  Facebook01Icon,
  MailSend02Icon,
} from '@hugeicons/core-free-icons';

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
      <HeaderNormal title="Холбоо барих" hasBack />
      <ContentScrollable edges={['bottom']}>
        <BoxContainer gap="m">
          <SingleContact
            title="76115522"
            icon={CallOutgoing04Icon}
            onPress={onPressCall}
            color="green4"
          />
          <SingleContact
            title="Facebook"
            icon={Facebook01Icon}
            onPress={onPressFacebook}
            color="facebook"
          />
          <SingleContact
            title="unlimitedcarrier2021@gmail.com"
            icon={MailSend02Icon}
            onPress={onPressMail}
            color="red4"
          />
        </BoxContainer>
      </ContentScrollable>
    </Container>
  );
};

export default Contact;
