import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Call } from 'iconsax-react-nativejs';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';

import { Button } from '@/components';
import Input from '@/components/Input';
import { useAuthCheckLoginMutation } from '@/gql/auth/authCheckLogin.generated';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
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
            setPhoneNumber(values.login);
            setStep(2);
          } else {
            router.push({
              pathname: '/modal',
              params: {
                type: 'error',
                message: 'Та бүртгэлтэй байна.',
              },
            });
          }
        });
      },
    });

  return (
    <>
      <Input
        placeholder="Утасны дугаар"
        width={270}
        keyboardType="number-pad"
        icon={Call}
        value={values.login}
        onBlur={handleBlur('login')}
        onChangeText={handleChange('login')}
        error={touched.login && errors.login ? errors.login : undefined}
      />
      <Button
        title="Бүртгүүлэх"
        backgroundColor="baseBlue"
        width={180}
        loading={loading}
        onPress={handleSubmit}
      />
    </>
  );
};

export default Step1;
