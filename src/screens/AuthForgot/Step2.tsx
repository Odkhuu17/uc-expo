import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  CirclePasswordIcon,
  LockPasswordIcon,
} from '@hugeicons/core-free-icons';

import { Button, MsgModal } from '@/components';
import Input from '@/components/Input';
import { INavigation } from '@/navigations';
import { useResetPasswordMutation } from '@/gql/mutations/resetPassword.generated';

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
  const navigation = useNavigation<INavigation>();

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

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    navigation.navigate('AuthLogin');
  };

  return (
    <>
      <Input
        label="Нууц үг"
        placeholder="Нууц үг"
        isRequired
        width={270}
        icon={LockPasswordIcon}
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        secureTextEntry
        error={
          touched.password && errors.password ? errors.password : undefined
        }
      />
      <Input
        label="Нууц үг давтан оруулна уу!"
        placeholder="Нууц үг давтан оруулна уу!"
        isRequired
        width={270}
        icon={LockPasswordIcon}
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
        label="Таны утсанд ирсэн код"
        placeholder="Таны утсанд ирсэн код"
        isRequired
        width={270}
        icon={CirclePasswordIcon}
        value={values.token}
        onBlur={handleBlur('token')}
        onChangeText={handleChange('token')}
        error={touched.token && errors.token ? errors.token : undefined}
      />
      <Button
        title="Нууц үг сэргээх"
        width={180}
        loading={loading}
        onPress={handleSubmit}
      />
      <MsgModal
        type="success"
        msg="Таны нууц үг амжилттай солигдлоо"
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default Step2;
