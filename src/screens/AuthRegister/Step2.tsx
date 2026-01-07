import { Dispatch, SetStateAction } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Box } from '@/components/Theme';
import { useAuthCheckTokenMutation } from '@/gql/mutations/authCheckToken.generated';
import { Button, InputOtp } from '@/components';
import { INavigation } from '@/navigations';

interface Props {
  phoneNumber: string;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const MAX_OTP_LENGTH = 4;

const Step2 = ({ phoneNumber, setToken, token, setStep }: Props) => {
  const [authCheckToken, { loading }] = useAuthCheckTokenMutation();
  const navigation = useNavigation<INavigation>();

  const onSubmit = async () => {
    if (token.length < MAX_OTP_LENGTH) {
      return navigation.navigate('MsgModal', {
        type: 'error',
        msg: 'Баталгаажуулах код дутуу байна.',
      });
    } else {
      const { data } = await authCheckToken({
        variables: {
          login: phoneNumber,
          token,
        },
      });

      if (!data?.valid) {
        return navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Баталгаажуулах код буруу байна.',
        });
      } else {
        setStep(3);
      }
    }
  };

  return (
    <>
      <Box flex={2} justifyContent="center" gap="m">
        <InputOtp
          otp={token}
          setOtp={setToken}
          length={MAX_OTP_LENGTH}
          description={`Таны ${phoneNumber} руу илгээсэн кодыг оруулна уу`}
        />
        <Button title="Үргэлжлүүлэх" onPress={onSubmit} loading={loading} />
      </Box>
      <Box flex={1} />
    </>
  );
};

export default Step2;
