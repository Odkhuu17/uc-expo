import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Edit2, UserOctagon } from 'iconsax-react-nativejs';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as yup from 'yup';

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
import useImagePick from '@/hooks/useImagePick';
import { useAppSelector } from '@/redux/hooks';
import { imageToFile } from '@/utils/fileHelpers';
import { getImageUrl } from '@/utils/helpers';

const schema = yup.object().shape({
  firstName: yup.string().required('Энэ талбар хоосон байна!'),
  lastName: yup.string().required('Энэ талбар хоосон байна!'),
  registerNum: yup.string().required('Энэ талбар хоосон байна!'),
});

const ProfileUpdateScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const [updateUser, { loading }] = useUpdateUserMutation();
  const [successModal, setSuccessModal] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();
  const theme = useTheme();
  const { onPickImage } = useImagePick({ setImage: setAvatar });

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
      await updateUser({
        variables: {
          avatar: avatar ? imageToFile(avatar) : undefined,
          firstName: values.firstName,
          lastName: values.lastName,
          registerNum: values.registerNum,
          id: user?.id!, // Replace with actual user ID logic
        },
      });
      setSuccessModal(true);
    },
  });

  useEffect(() => {
    if (user) {
      setFieldValue('firstName', user?.firstName || '');
      setFieldValue('lastName', user?.lastName || '');
      setFieldValue('registerNum', user?.registerNum || '');
    }
  }, [user]);

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
              {avatar || user?.avatar ? (
                <Image
                  contentPosition="center"
                  contentFit="cover"
                  source={{
                    uri: avatar || getImageUrl(user?.avatar || ''),
                  }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <UserOctagon size={theme.icon.xl2} />
              )}
              <Box position="absolute" bottom={0} right={0}>
                <TouchableOpacity onPress={onPickImage}>
                  <Box
                    p="xs"
                    backgroundColor="white"
                    borderRadius="full"
                    borderWidth={2}
                  >
                    <Edit2 size={theme.icon.m} />
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
          <ScrollableContent edges={['bottom']}>
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
