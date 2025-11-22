import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Lock1, Profile2User, User } from 'iconsax-react-nativejs';
import { useState } from 'react';
import * as yup from 'yup';

import { Button, MessageModal } from '@/components';
import Input from '@/components/Input';
import { useAuthRegisterMutation } from '@/gql/auth/authRegister.generated';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  phoneNumber: string;
}

const schema = yup.object().shape({
  lastname: yup.string().required('Энэ талбар хоосон байна!'),
  firstname: yup.string().required('Энэ талбар хоосон байна!'),
  password: yup.string().required('Энэ талбар хоосон байна!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг таарахгүй байна!'),
  token: yup.string(),
});

const Step2 = ({ phoneNumber }: Props) => {
  const [authRegister, { loading }] = useAuthRegisterMutation();
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();
  const { mode } = useAppSelector(state => state.general);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        lastname: '',
        firstname: '',
        password: '',
        passwordConfirmation: '',
        token: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        await authRegister({
          variables: {
            firstName: values.firstname,
            lastName: values.lastname,
            login: phoneNumber,
            password: values.password,
            token: values.token,
            role: mode === 'driver' ? 'driver' : 'member',
          },
        });
        setSuccessModal(true);
      },
    });

  return (
    <>
      <Input
        placeholder="Овог"
        width={270}
        icon={User}
        value={values.lastname}
        onBlur={handleBlur('lastname')}
        onChangeText={handleChange('lastname')}
        error={
          touched.lastname && errors.lastname ? errors.lastname : undefined
        }
      />
      <Input
        placeholder="Нэр"
        width={270}
        icon={User}
        value={values.firstname}
        onBlur={handleBlur('firstname')}
        onChangeText={handleChange('firstname')}
        error={
          touched.firstname && errors.firstname ? errors.firstname : undefined
        }
      />
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
        title="Бүртгүүлэх"
        backgroundColor="baseBlue"
        width={180}
        loading={loading}
        onPress={handleSubmit}
      />
      <MessageModal
        type="success"
        message="Та амжилттай бүртгүүллээ"
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
