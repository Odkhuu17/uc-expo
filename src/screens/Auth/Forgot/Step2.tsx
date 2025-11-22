import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Lock1, Profile2User } from 'iconsax-react-nativejs';
import { useState } from 'react';
import * as yup from 'yup';

import { Button, MessageModal } from '@/components';
import Input from '@/components/Input';
import { useResetPasswordMutation } from '@/gql/auth/resetPassword.generated';

interface Props {
  phoneNumber: string;
}

const schema = yup.object().shape({
  token: yup.string().required('Энэ талбар хоосон байна!'),
  password: yup.string().required('Энэ талбар хоосон байна!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг таарахгүй байна!'),
});

const Step2 = ({ phoneNumber }: Props) => {
  const [resetPassword, { loading }] = useResetPasswordMutation();
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        token: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        await resetPassword({
          variables: {
            login: phoneNumber,
            password: values.password,
            token: values.token,
          },
        });
        setSuccessModal(true);
      },
    });

  return (
    <>
      <Input
        placeholder="Нууц үг"
        width={270}
        icon={Lock1}
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        secureTextEntry
        error={
          touched.password && errors.password ? errors.password : undefined
        }
      />
      <Input
        placeholder="Нууц үг давтан оруулна уу!"
        width={270}
        icon={Lock1}
        value={values.passwordConfirmation}
        onBlur={handleBlur('passwordConfirmation')}
        onChangeText={handleChange('passwordConfirmation')}
        secureTextEntry
        error={
          touched.passwordConfirmation && errors.passwordConfirmation
            ? errors.passwordConfirmation
            : undefined
        }
      />
      <Input
        placeholder="Таны утсанд ирсэн код"
        width={270}
        icon={Profile2User}
        value={values.token}
        onBlur={handleBlur('token')}
        onChangeText={handleChange('token')}
        error={touched.token && errors.token ? errors.token : undefined}
      />
      <Button
        title="Нууц үг сэргээх"
        backgroundColor="baseBlue"
        width={180}
        loading={loading}
        onPress={handleSubmit}
      />
      <MessageModal
        type="success"
        message="Таны нууц үг амжилттай солигдлоо"
        onClose={() => {
          router.dismissTo('/auth/login');
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default Step2;
