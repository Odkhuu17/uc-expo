import { useState } from 'react';

import {
  BottomContainer,
  Button,
  Container,
  HeaderNormal,
  ContentScrollable,
} from '@/components';
import { Box } from '@/components/Theme';
import { imageToFile } from '@/utils/fileHelpers';
import { InputImage } from '@/components';
import { INavigationProps } from '@/navigations';
import { useVerifyDriverMutation } from '@/gql/mutations/verifyDriver.generated';

interface Props {
  navigation: INavigationProps<'DriverVerify'>['navigation'];
}

const DriverVerify = ({ navigation }: Props) => {
  const [passportFront, setPassportFront] = useState<string | null>(null);
  const [passportBack, setPassportBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);

  const [verifyDriver, { loading }] = useVerifyDriverMutation();

  const onPressNext = async () => {
    if (!passportFront || !passportBack) {
      return navigation.navigate('MsgModal', {
        type: 'error',
        msg: 'Та иргэний үнэмлэхний зургаа оруулна уу',
      });
    }
    if (!selfie) {
      return navigation.navigate('MsgModal', {
        type: 'error',
        msg: 'Та өөрийн зургаа оруулна уу',
      });
    }

    const passportFrontImage = imageToFile(passportFront!);
    const passportBackImage = imageToFile(passportBack!);
    const selfieImage = imageToFile(selfie!);

    await verifyDriver({
      variables: {
        passport: passportFrontImage,
        passportBack: passportBackImage,
        selfie: selfieImage,
      },
    });

    navigation.goBack();
  };

  return (
    <Container>
      <HeaderNormal title="Баталгаажуулалт" hasBack />
      <ContentScrollable edges={[]}>
        <Box gap="m">
          <InputImage
            isRequired
            image={passportFront}
            setImage={setPassportFront}
            label="Иргэний үнэмлэхний зураг (Урд тал)"
          />
          <InputImage
            isRequired
            image={passportBack}
            setImage={setPassportBack}
            label="Иргэний үнэмлэхний зураг (Ар тал)"
          />
          <InputImage
            isRequired
            image={selfie}
            setImage={setSelfie}
            label="Өөрийн зураг"
          />
        </Box>
      </ContentScrollable>
      <BottomContainer>
        <Button title="Үргэлжлүүлэх" onPress={onPressNext} loading={loading} />
      </BottomContainer>
    </Container>
  );
};

export default DriverVerify;
