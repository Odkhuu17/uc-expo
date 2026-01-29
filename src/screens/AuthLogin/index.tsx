import { useFormik } from 'formik';
import {
  CallIcon,
  FaceIdIcon,
  FingerAccessIcon,
  LockPasswordIcon,
} from '@hugeicons/core-free-icons';
import * as yup from 'yup';
import { INavigationProps } from '@/navigations';
import { TextInput, Platform, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { isSensorAvailable } from '@sbaiahmed1/react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  HeaderLogo,
  Input,
  ContentScrollable,
  Checkbox,
  ButtonIcon,
} from '@/components';
import { Box } from '@/components/Theme';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import { useGetMeLazyQuery } from '@/gql/queries/getMe.generated';
import { login } from './helpers';
import constants from '@/constants';
import { useAuthCheckLoginMutation } from '@/gql/mutations/authCheckLogin.generated';

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

interface IBiometricType {
  available: boolean;
  biometryType?: 'TouchID' | 'FaceID' | 'Biometrics';
}

const AuthLogin = ({ navigation }: Props) => {
  const [getMe] = useGetMeLazyQuery();
  const dispatch = useAppDispatch();
  const passwordInputRef = useRef<TextInput | null>(null);
  const [availableBiometric, setAvailableBiometric] =
    useState<IBiometricType>();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [authCheckLogin, { loading }] = useAuthCheckLoginMutation();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // Request biometric permission on init
    await requestBiometricPermission();

    const result = await isSensorAvailable();

    const enabled = await AsyncStorage.getItem(constants.bioMetricEnabledKey);
    setBiometricEnabled(enabled === 'true');

    setAvailableBiometric({
      available: result.available,
      biometryType: result.biometryType as IBiometricType['biometryType'],
    });
  };

  const requestBiometricPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const result = await request(PERMISSIONS.IOS.FACE_ID);
        return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
      } catch (error) {
        console.log('Face ID permission request error:', error);
        return false;
      }
    }
    // Android biometric permission is handled automatically
    return true;
  };

  const onBiometricLogin = async () => {
    if (availableBiometric?.available && biometricEnabled) {
      try {
        // Keychain will trigger biometric prompt automatically
        const credentials = await Keychain.getGenericPassword({
          service: constants.bioMetricCredentialsKey,
        });

        if (credentials) {
          await onLogin({
            username: credentials.username,
            password: credentials.password,
          });
        }
      } catch (error) {
        // User cancelled or authentication failed
        console.log('Biometric authentication failed:', error);
      }
    }
  };

  const onLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data: checkLoginData } = await authCheckLogin({
        variables: {
          login: values.username,
          sendToken: false,
        },
      });

      if (!checkLoginData?.exists.exists) {
        return navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Та бүртгэлгүй байна.',
        });
      }
      await login(username, password);

      const { data } = await getMe();

      dispatch(authSlice.actions.changeUser(data?.me));
      dispatch(authSlice.actions.login());

      // Save biometric credentials if enabled
      if (biometricEnabled && availableBiometric?.available) {
        try {
          await Keychain.setGenericPassword(username, password, {
            service: constants.bioMetricCredentialsKey,
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          });
        } catch (error) {
          console.error('Failed to save biometric credentials:', error);
        }
      }
    } catch {
      navigation.navigate('MsgModal', {
        type: 'error',
        msg: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
      });
    }
  };

  const { handleSubmit, values, errors, handleChange, isSubmitting } =
    useFormik({
      initialValues: { username: '', password: '' },
      validationSchema: schema,
      onSubmit: async values => {
        await onLogin({ username: values.username, password: values.password });
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

  const onToggleBiometricCheckbox = async (value: boolean) => {
    if (value && !availableBiometric?.available) {
      Alert.alert(
        'Биометрик боломжгүй',
        'Таны төхөөрөмж биометрик баталгаажуулалтыг дэмждэггүй байна.',
        [{ text: 'OK' }],
      );
      return;
    }

    await AsyncStorage.setItem(
      constants.bioMetricEnabledKey,
      value ? 'true' : 'false',
    );
    setBiometricEnabled(value);
  };

  return (
    <CustomKeyboardAvoidingView>
      <Container bg="light-car">
        <HeaderLogo
          hasBack
          variant="logo-dark"
          handlePressBack={handlePressBack}
        />
        <ContentScrollable edges={['bottom']}>
          <Box gap="m" flex={2} justifyContent="center">
            <Input
              label="Утасны дугаар"
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
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
              icon={LockPasswordIcon}
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors.password ? errors.password : undefined}
              secureTextEntry
              editable={!isSubmitting}
              returnKeyType="go"
              onSubmitEditing={() => handleSubmit()}
            />
            {availableBiometric?.available && (
              <Checkbox
                value={biometricEnabled}
                label="Нүүр танилт идэвхжүүлэх"
                onChange={onToggleBiometricCheckbox}
              />
            )}
            <Box alignItems="flex-end" justifyContent="flex-end">
              <Button
                title="Нууц үг сэргээх"
                onPress={handlePressForgot}
                size="s"
                variant="text"
              />
            </Box>
            <Box flexDirection="row" alignItems="center" gap="m">
              <Box flex={1}>
                <Button
                  title="Нэвтрэх"
                  onPress={handleSubmit}
                  loading={isSubmitting || loading}
                />
              </Box>
              {availableBiometric?.available && biometricEnabled && (
                <ButtonIcon
                  shape="square"
                  icon={
                    availableBiometric?.biometryType === 'FaceID'
                      ? FaceIdIcon
                      : FingerAccessIcon
                  }
                  loading={isSubmitting || loading}
                  onPress={onBiometricLogin}
                />
              )}
            </Box>
            <Button
              title="Бүртгүүлэх"
              onPress={handlePressRegister}
              variant="text"
            />
          </Box>
          <Box flex={1} />
        </ContentScrollable>
      </Container>
    </CustomKeyboardAvoidingView>
  );
};

export default AuthLogin;
