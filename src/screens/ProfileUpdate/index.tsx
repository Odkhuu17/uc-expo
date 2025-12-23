import { useFormik } from 'formik';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { PencilEdit01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  Input,
  ModalMsg,
  HeaderNormal,
  ContentScrollable,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import { imageToFile } from '@/utils/fileHelpers';
import { getImageUrl } from '@/utils/helpers';
import { INavigationProps } from '@/navigations';
import { useUpdateUserMutation } from '@/gql/mutations/updateUser.generated';
import useImagePick from '@/hooks/useImagePick';

interface Props {
  navigation: INavigationProps<'ProfileUpdate'>['navigation'];
}

const schema = yup.object().shape({
  firstName: yup.string().required('Энэ талбар хоосон байна!'),
  lastName: yup.string().required('Энэ талбар хоосон байна!'),
  registerNum: yup.string().required('Энэ талбар хоосон байна!'),
});

const ProfileUpdate = ({ navigation }: Props) => {
  const { user } = useAppSelector(state => state.auth);
  const [updateUser, { loading }] = useUpdateUserMutation();
  const [successModal, setSuccessModal] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
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
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      registerNum: user?.registerNum || '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      await updateUser({
        variables: {
          avatar: avatar ? imageToFile(avatar) : undefined,
          firstName: values.firstName,
          lastName: values.lastName,
          registerNum: values.registerNum,
          id: user?.id!,
        },
      });
      setSuccessModal(true);
    },
  });

  const handleCloseSuccessModal = () => {
    navigation.goBack();
    setSuccessModal(false);
  };

  return (
    <>
      <CustomKeyboardAvoidingView>
        <Container>
          <HeaderNormal title="Миний мэдээлэл" hasBack />
          <Box alignItems="center" justifyContent="center" pt="m">
            <Box
              width={100}
              height={100}
              borderRadius="full"
              alignItems="center"
              backgroundColor="grey1"
              justifyContent="center"
            >
              {avatar || user?.avatar ? (
                <Image
                  resizeMode="cover"
                  source={{
                    uri: avatar || getImageUrl(user?.avatar || ''),
                  }}
                  style={css.avatar}
                />
              ) : (
                <HugeiconsIcon icon={UserIcon} size={theme.icon.xl2} />
              )}
              <Box position="absolute" bottom={0} right={0}>
                <TouchableOpacity onPress={onPickImage}>
                  <Box
                    p="xs"
                    backgroundColor="white"
                    borderRadius="full"
                    borderWidth={2}
                  >
                    <HugeiconsIcon
                      icon={PencilEdit01Icon}
                      size={theme.icon.m}
                    />
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
          <ContentScrollable edges={['bottom']}>
            <Box gap="m">
              <Input
                label="Овог"
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
                label="Нэр"
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
                label="Регистрийн дугаар"
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
          </ContentScrollable>
        </Container>
      </CustomKeyboardAvoidingView>
      <ModalMsg
        type="success"
        msg="Таны хувийн мэдээлэл амжилттай шинэчлэгдлээ!"
        visible={successModal}
        handleClose={handleCloseSuccessModal}
      />
    </>
  );
};

const css = StyleSheet.create({
  avatar: { width: 100, height: 100, borderRadius: 50 },
});

export default ProfileUpdate;
