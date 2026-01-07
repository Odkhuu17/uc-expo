import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { LockPasswordIcon } from '@hugeicons/core-free-icons';

import { Button, ModalMsg } from '@/components';
import Input from '@/components/Input';
import { INavigation } from '@/navigations';
import { useResetPasswordMutation } from '@/gql/mutations/resetPassword.generated';
import { TextInput } from 'react-native';

interface Props {
  phoneNumber: string;
  token: string;
}

const schema = yup.object().shape({
  password: yup.string().required('Энэ талбар хоосон байна!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг таарахгүй байна!'),
});

const Step3 = ({ phoneNumber, token }: Props) => {
  const [resetPassword, { loading }] = useResetPasswordMutation();
  const [successModal, setSuccessModal] = useState(false);
  const navigation = useNavigation<INavigation>();
  const passwordRepeatRef = useRef<TextInput>(null);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        await resetPassword({
          variables: {
            login: phoneNumber,
            password: values.password,
            token,
          },
        });
        setSuccessModal(true);
      },
    });

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    navigation.navigate('AuthLogin');
  };

  const onPressNext = () => {
    passwordRepeatRef.current?.focus();
  };

  return (
    <>
      <Input
        label="Нууц үг"
        placeholder="Нууц үг"
        isRequired
        icon={LockPasswordIcon}
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={onPressNext}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
      />
      <Input
        label="Нууц үг давтан оруулна уу!"
        placeholder="Нууц үг давтан оруулна уу!"
        isRequired
        ref={passwordRepeatRef}
        icon={LockPasswordIcon}
        value={values.passwordConfirmation}
        onBlur={handleBlur('passwordConfirmation')}
        onChangeText={handleChange('passwordConfirmation')}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        error={
          touched.passwordConfirmation && errors.passwordConfirmation
            ? errors.passwordConfirmation
            : undefined
        }
      />
      <Button
        title="Нууц үг сэргээх"
        loading={loading}
        onPress={handleSubmit}
      />
      <ModalMsg
        type="success"
        msg="Таны нууц үг амжилттай солигдлоо"
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default Step3;
