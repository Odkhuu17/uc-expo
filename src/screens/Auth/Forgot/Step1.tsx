import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Call } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';

import { Button } from '@/components';
import Input from '@/components/Input';
import { useAuthCheckLoginMutation } from '@/gql/auth/authCheckLogin.generated';

interface Props {
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const schema = yup.object().shape({
  login: yup.string().required('Энэ талбар хоосон байна!'),
});

const Step1 = ({ setStep, setPhoneNumber }: Props) => {
  const [authCheckLogin, { loading }] = useAuthCheckLoginMutation();
  const router = useRouter();

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        login: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        authCheckLogin({
          variables: {
            login: values.login,
            sendToken: true,
          },
        }).then(({ data }) => {
          if (!data?.exists.exists) {
            router.push({
              pathname: '/modal',
              params: {
                type: 'error',
                message: 'Та бүртгэлгүй байна.',
              },
            });
          } else {
            setStep(2);
            setPhoneNumber(values.login);
          }
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
