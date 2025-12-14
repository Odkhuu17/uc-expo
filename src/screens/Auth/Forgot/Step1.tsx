import { useFormik } from 'formik';
import { Call } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';

import { Button } from '@/components';
import Input from '@/components/Input';
import { useSendOtpMutation } from '@/gql/mutations/sendOtp.generated';

interface Props {
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const schema = yup.object().shape({
  login: yup.string().required('Энэ талбар хоосон байна!'),
});

const Step1 = ({ setStep, setPhoneNumber }: Props) => {
  const [sendOtp, { loading }] = useSendOtpMutation();

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        login: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        sendOtp({
          variables: {
            login: values.login,
          },
        }).then(() => {
          setStep(2);
          setPhoneNumber(values.login);
        });
      },
    });

  return (
    <>
      <Input
        placeholder="Утасны дугаар"
        keyboardType="number-pad"
        width={270}
        icon={Call}
        value={values.login}
        onBlur={handleBlur('login')}
        onChangeText={handleChange('login')}
        error={touched.login && errors.login ? errors.login : undefined}
      />
      <Button
        title="Нууц үг сэргээх"
        width={180}
        loading={loading}
        onPress={handleSubmit}
      />
    </>
  );
};

export default Step1;
