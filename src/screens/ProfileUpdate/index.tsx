import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Camera01Icon, UserIcon } from '@hugeicons/core-free-icons';
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
import AccountDelete from './AccountDelete';

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

  useEffect(() => {
    updateUser({
      variables: {
        avatar: avatar ? imageToFile(avatar) : undefined,
        firstName: values.firstName,
        lastName: values.lastName,
        registerNum: values.registerNum,
        id: user?.id!,
      },
    });
  }, [avatar]);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        registerNum: user?.registerNum || '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        await updateUser({
          variables: {
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
                    borderWidth={1}
                    borderColor="border"
                  >
                    <HugeiconsIcon
                      icon={Camera01Icon}
                      color={theme.colors.grey4}
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
                disabled={user?.verified}
                label="Овог"
                placeholder="Овог"
                editable={!user?.verified}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
              />
              <Input
                disabled={user?.verified}
                label="Нэр"
                placeholder="Нэр"
                editable={!user?.verified}
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
                disabled={user?.verified}
                label="Регистрийн дугаар"
                placeholder="Регистрийн дугаар"
                editable={!user?.verified}
                value={values.registerNum}
                onChangeText={handleChange('registerNum')}
                onBlur={handleBlur('registerNum')}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
              />
              {!user?.verified && (
                <Button
                  title="Шинэчлэх"
                  onPress={handleSubmit}
                  loading={loading}
                />
              )}
              <AccountDelete />
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
