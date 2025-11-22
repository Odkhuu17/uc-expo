import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Call, Lock1 } from 'iconsax-react-nativejs';
import * as yup from 'yup';

import {
  Button,
  Container,
  Content,
  CustomKeyboardAvoidingView,
  LogoHeader,
} from '@/components';
import Input from '@/components/Input';
import { Box } from '@/components/Theme';
import { useGetUserLazyQuery } from '@/gql/query/getUserQuery.generated';
import { loginService } from '@/services/auth/auth.service';
import { useGeneralStore } from '@/stores';
import { useAuthStore } from '@/stores/authStore';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .min(8, 'Утасны дугаар 8 оронтой байна'),
  password: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .min(6, '6-аас дээш тэмдэгт оруулна уу!'),
});

const LoginScreen = () => {
  const router = useRouter();
  const [getUser] = useGetUserLazyQuery();
  const mode = useGeneralStore(state => state.mode);

  const { login, setUser } = useAuthStore();

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        await loginService(values);
        const { data } = await getUser();
        setUser(data?.me);
        login();
      } catch {
        router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
          },
        });
      }
    },
  });

  const onPressRegister = () => {
    router.navigate('/auth/register');
  };

  const onPressForgot = () => {
    router.navigate('/auth/forgot');
  };

  const onPressBack = () => {
    router.dismissTo('/');
  };

  return (
    <CustomKeyboardAvoidingView>
      <Container bg="dark-car">
        <LogoHeader hasBack variant="logo-light" onBackPress={onPressBack} />
        <Content edges={['bottom']}>
          <Box gap="m" alignItems="center" flex={1} justifyContent="center">
            <Input
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              width={270}
              icon={Call}
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              error={
                errors.username && touched.username
                  ? errors.username
                  : undefined
              }
              editable={!isSubmitting}
            />
            <Input
              placeholder="Нууц үг"
              width={270}
              icon={Lock1}
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              error={
                errors.password && touched.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry
              editable={!isSubmitting}
            />
            <Button
              textColor="black"
              title="Нэвтрэх"
              onPress={handleSubmit}
              backgroundColor="lightBlue"
              width={190}
              loading={isSubmitting}
            />
            <Box flexDirection="row" alignItems="center" gap="xl" mt="xl2">
              <Button
                title="Бүртгүүлэх"
                onPress={onPressRegister}
                backgroundColor="lightBlue2"
                width={120}
                size="s"
                textColor="white"
              />
              <Button
                title="Нууц үг сэргээх"
                onPress={onPressForgot}
                backgroundColor="lightBlue2"
                width={120}
                size="s"
                textColor="white"
              />
            </Box>
          </Box>
        </Content>
      </Container>
    </CustomKeyboardAvoidingView>
  );
};

export default LoginScreen;
