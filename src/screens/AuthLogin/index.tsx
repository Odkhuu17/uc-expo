import { useFormik } from 'formik';
import { CallIcon, LockPasswordIcon } from '@hugeicons/core-free-icons';
import * as yup from 'yup';
import { INavigationProps } from '@/navigations';
import { TextInput } from 'react-native';
import { useRef } from 'react';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  HeaderLogo,
  Input,
  ContentScrollable,
} from '@/components';
import { Box } from '@/components/Theme';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import { useGetMeLazyQuery } from '@/gql/queries/getMe.generated';
import { login } from './helpers';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .length(8, 'Утасны дугаар 8 оронтой байна'),
  password: yup.string().required('Энэ талбар хоосон байна!'),
});

interface Props {
  navigation: INavigationProps<'AuthChooseType'>['navigation'];
}

const AuthLogin = ({ navigation }: Props) => {
  const [getMe] = useGetMeLazyQuery();
  const dispatch = useAppDispatch();
  const passwordInputRef = useRef<TextInput | null>(null);

  const { handleSubmit, values, errors, handleChange, isSubmitting } =
    useFormik({
      initialValues: { username: '', password: '' },
      validationSchema: schema,
      onSubmit: async values => {
        try {
          await login(values.username, values.password);
          const { data } = await getMe();
          dispatch(authSlice.actions.changeUser(data?.me));
          dispatch(authSlice.actions.login());
        } catch {
          navigation.navigate('MsgModal', {
            type: 'error',
            msg: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
          });
        }
      },
    });

  const handlePressRegister = () => {
    navigation.navigate('AuthRegister');
  };

  const handlePressForgot = () => {
    navigation.navigate('AuthForgot');
  };

  const handlePressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('AuthChooseType');
    }
  };

  const handleSubmitEditUsername = () => {
    passwordInputRef?.current?.focus();
  };

  return (
    <Container bg="light-car">
      <CustomKeyboardAvoidingView>
        <HeaderLogo
          hasBack
          variant="logo-dark"
          handlePressBack={handlePressBack}
        />
        <ContentScrollable edges={['bottom']}>
          <Box gap="m" alignItems="center" flex={1} justifyContent="center">
            <Input
              label="Утасны дугаар"
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              width={270}
              icon={CallIcon}
              value={values.username}
              onChangeText={handleChange('username')}
              error={errors.username ? errors.username : undefined}
              editable={!isSubmitting}
              returnKeyType="next"
              onSubmitEditing={handleSubmitEditUsername}
            />
            <Input
              ref={passwordInputRef}
              label="Нууц үг"
              placeholder="Нууц үг"
              width={270}
              icon={LockPasswordIcon}
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors.password ? errors.password : undefined}
              secureTextEntry
              editable={!isSubmitting}
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
            />
            <Button
              title="Нэвтрэх"
              onPress={handleSubmit}
              width={190}
              loading={isSubmitting}
            />
            <Box flexDirection="row" alignItems="center" gap="xl" mt="xl2">
              <Button
                title="Бүртгүүлэх"
                onPress={handlePressRegister}
                width={130}
                size="s"
              />
              <Button
                title="Нууц үг сэргээх"
                onPress={handlePressForgot}
                width={130}
                size="s"
              />
            </Box>
          </Box>
        </ContentScrollable>
      </CustomKeyboardAvoidingView>
    </Container>
  );
};

export default AuthLogin;
