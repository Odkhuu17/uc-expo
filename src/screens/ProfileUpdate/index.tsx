import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { RefreshControl } from 'react-native-gesture-handler';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  Input,
  MessageModal,
  NormalHeader,
  ScrollableContent,
} from '@/components';
import { Box } from '@/components/Theme';
import { useUpdateUserMutation } from '@/gql/mutations/updateUserMutation.generated';
import { useGetUserQuery } from '@/gql/query/getUserQuery.generated';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

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
  const router = useRouter();

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

  return (
    <>
      <CustomKeyboardAvoidingView>
        <Container>
          <NormalHeader title="Миний мэдээлэл" hasBack />
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
