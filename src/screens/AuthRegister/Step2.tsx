import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  CirclePasswordIcon,
  IdentityCardIcon,
  LockPasswordIcon,
  UserListIcon,
} from '@hugeicons/core-free-icons';
import { TextInput } from 'react-native';

import { Button, ModalMsg } from '@/components';
import Input from '@/components/Input';
import { useAppSelector } from '@/redux/hooks';
import { INavigation } from '@/navigations';
import { useAuthRegisterMutation } from '@/gql/mutations/authRegister.generated';
import { Box } from '@/components/Theme';

interface Props {
  phoneNumber: string;
}

const schema = yup.object().shape({
  lastname: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .matches(/^[А-Яа-яӨөҮүЁё\s]+$/, 'Зөвхөн кирилл үсэг оруулна уу!'),
  firstname: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .matches(/^[А-Яа-яӨөҮүЁё\s]+$/, 'Зөвхөн кирилл үсэг оруулна уу!'),
  registerNum: yup.string().required('Энэ талбар хоосон байна!'),
  password: yup.string().required('Энэ талбар хоосон байна!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг таарахгүй байна!'),
  token: yup.string(),
});

const Step2 = ({ phoneNumber }: Props) => {
  const [authRegister, { loading }] = useAuthRegisterMutation();
  const [successModal, setSuccessModal] = useState(false);
  const navigation = useNavigation<INavigation>();
  const { mode } = useAppSelector(state => state.general);
  const refs = useRef<TextInput[]>([]);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        lastname: '',
        firstname: '',
        password: '',
        passwordConfirmation: '',
        token: '',
        registerNum: '',
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
            registerNum: values.registerNum,
            role: mode === 'driver' ? 'driver' : 'member',
          },
        });
        setSuccessModal(true);
      },
    });

  const handleSubmitEditing = (index: number) => {
    if (refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    navigation.navigate('AuthLogin');
  };

  return (
    <>
      <Box gap="m" alignItems="center">
        <Input
          label="Овог"
          isRequired
          placeholder="Овог"
          width={270}
          icon={UserListIcon}
          value={values.lastname}
          onBlur={handleBlur('lastname')}
          onChangeText={handleChange('lastname')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[0] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(0)}
          error={
            touched.lastname && errors.lastname ? errors.lastname : undefined
          }
        />
        <Input
          label="Нэр"
          isRequired
          placeholder="Нэр"
          width={270}
          icon={UserListIcon}
          value={values.firstname}
          onBlur={handleBlur('firstname')}
          onChangeText={handleChange('firstname')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[1] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(1)}
          error={
            touched.firstname && errors.firstname ? errors.firstname : undefined
          }
        />
        <Input
          label="Регистр дугаар"
          placeholder="Регистр эсвэл иргэний үнэмлэхний дугаар"
          isRequired
          width={270}
          icon={IdentityCardIcon}
          autoCapitalize="characters"
          value={values.registerNum}
          onBlur={handleBlur('registerNum')}
          onChangeText={handleChange('registerNum')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[2] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(2)}
          error={
            touched.registerNum && errors.registerNum
              ? errors.registerNum
              : undefined
          }
        />
        <Input
          label="Нууц үг"
          placeholder="Нууц үг"
          isRequired
          width={270}
          icon={LockPasswordIcon}
          value={values.password}
          onChangeText={handleChange('password')}
          secureTextEntry
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[3] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(3)}
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
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[4] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(4)}
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
          returnKeyType="done"
          ref={(el: TextInput) => {
            refs.current[5] = el;
          }}
          onSubmitEditing={handleSubmit}
          error={touched.token && errors.token ? errors.token : undefined}
        />
        <Button
          title="Бүртгүүлэх"
          width={180}
          loading={loading}
          onPress={handleSubmit}
        />
      </Box>
      <ModalMsg
        type="success"
        msg="Та амжилттай бүртгүүллээ"
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default Step2;
