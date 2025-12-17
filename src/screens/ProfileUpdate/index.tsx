import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { RefreshControl } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Edit, UserOctagon } from 'iconsax-react-nativejs';
import { Alert, TouchableOpacity } from 'react-native';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  Input,
  MessageModal,
  NormalHeader,
  ScrollableContent,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useUpdateUserMutation } from '@/gql/mutations/updateUserMutation.generated';
import { useGetUserQuery } from '@/gql/query/getUserQuery.generated';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import { Image } from 'expo-image';
import { imageToFile } from '@/utils/fileHelpers';
import { getImageUrl } from '@/utils/helpers';

const schema = yup.object().shape({
  firstName: yup.string().required('Энэ талбар хоосон байна!'),
  lastName: yup.string().required('Энэ талбар хоосон байна!'),
  registerNum: yup.string().required('Энэ талбар хоосон байна!'),
});

const ProfileUpdateScreen = () => {
  const {
    data: userData,
    loading: userLoading,
    refetch: userRefetch,
  } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const [updateUser, { loading }] = useUpdateUserMutation();
  const [successModal, setSuccessModal] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const router = useRouter();
  const theme = useTheme();

  console.log('userData', userData);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      registerNum: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      updateUser({
        variables: {
          avatar: imageToFile(avatar),
          firstName: values.firstName,
          lastName: values.lastName,
          registerNum: values.registerNum,
          id: userData?.me?.id!, // Replace with actual user ID logic
        },
      });
    },
  });

  useEffect(() => {
    if (userData) {
      setFieldValue('firstName', userData.me?.firstName || '');
      setFieldValue('lastName', userData.me?.lastName || '');
      setFieldValue('registerNum', userData.me?.registerNum || '');
      dispatch(authSlice.actions.changeUser(userData?.me));
    }
  }, [userData]);

  const onLaunchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      cameraType: ImagePicker.CameraType.front,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    Alert.alert('Зураг оруулах', 'Зураг оруулах төрлөө сонгоно уу!', [
      {
        text: 'Камер нээх',
        onPress: onLaunchCamera,
      },
      {
        text: 'Зураг сонгох',
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') return;
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            setAvatar(result.assets[0].uri);
          }
        },
      },
      { text: 'Буцах', style: 'cancel' },
    ]);
  };

  return (
    <>
      <CustomKeyboardAvoidingView>
        <Container>
          <NormalHeader title="Миний мэдээлэл" hasBack />
          <Box alignItems="center" justifyContent="center" pt="m">
            <Box
              width={100}
              height={100}
              borderRadius="full"
              alignItems="center"
              backgroundColor="grey"
              justifyContent="center"
            >
              {avatar || userData?.me?.avatar ? (
                <Image
                  contentPosition="center"
                  contentFit="cover"
                  source={{
                    uri: avatar || getImageUrl(userData?.me?.avatar || ''),
                  }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <UserOctagon size={theme.icon.xl2} />
              )}
              <Box position="absolute" bottom={0} right={0}>
                <TouchableOpacity onPress={handlePickImage}>
                  <Edit size={theme.icon.l} />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
          <ScrollableContent
            edges={['bottom']}
            refreshControl={
              <RefreshControl
                onRefresh={userRefetch}
                refreshing={userLoading}
              />
            }
          >
            <Box gap="m">
              <Input
                placeholder="Овог"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
              />
              <Input
                placeholder="Нэр"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={
                  touched.lastName && errors.firstName
                    ? errors.lastName
                    : undefined
                }
              />
              <Input
                placeholder="Регистрийн дугаар"
                value={values.registerNum}
                onChangeText={handleChange('registerNum')}
                onBlur={handleBlur('registerNum')}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
              />
              <Button
                title="Шинэчлэх"
                onPress={handleSubmit}
                loading={loading}
              />
            </Box>
          </ScrollableContent>
        </Container>
      </CustomKeyboardAvoidingView>
      <MessageModal
        type="success"
        message="Хувийн мэдээлэл амжилттай шинэчлэгдлээ!"
        onClose={() => {
          router.back();
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default ProfileUpdateScreen;
