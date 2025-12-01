import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
  Button,
  Container,
  Content,
  CustomKeyboardAvoidingView,
  Input,
  MessageModal,
  NormalHeader,
  Select,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { carTypes, carTypes2 } from '@/constants';
import { useCreateTruckMutation } from '@/gql/mutations/createTruckMutation.generated';
import { useGetMarksQuery } from '@/gql/query/getMarks.generated';
import { useGetModelsQuery } from '@/gql/query/getModels.generated';
import { useAppSelector } from '@/redux/hooks';

const schema = yup.object().shape({
  markId: yup.string().required('Марк сонгоно уу!'),
  modelId: yup.string().required('Модель сонгоно уу!'),
  plateNumber: yup
    .string()
    .required('Дугаар оруулна уу!')
    .matches(
      /^[А-Я]{3}\d{4}$/,
      'Дугаар нь А-Я (3 үсэг) + 0-9 (4 тоо) байх ёстой (жишээ: УНА0123)'
    ),
});

const AddTruckScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const [createTruck, { loading }] = useCreateTruckMutation();
  const { data: marksData } = useGetMarksQuery();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);

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
      markId: '',
      modelId: '',
      plateNumber: '',
    },
    validationSchema: schema,
    onSubmit: async formValues => {
      createTruck({
        variables: {
          markId: formValues.markId,
          modelId: formValues.modelId,
          userId: user!.id,
          plateNumber: formValues.plateNumber,
        },
      }).then(() => {
        setSuccessModal(true);
      });
    },
  });

  const { data: modelsData } = useGetModelsQuery({
    variables: { markId: values.markId },
    skip: values.markId === '',
  });

  const onChangeMark = (markId: string) => {
    setFieldValue('markId', markId);
    setFieldValue('modelId', '');
  };

  const onChangeModel = (modelId: string) => {
    setFieldValue('modelId', modelId);
  };

  return (
    <>
      <Container>
        <CustomKeyboardAvoidingView>
          <NormalHeader title="Машин нэмэх" hasBack />
          <Content edges={[]}>
            <Box gap="m">
              <Select
                placeholder="Машин төрөл"
                options={[
                  ...carTypes.map(i => ({ label: i.name, value: i.name })),
                  ...carTypes2.map(i => ({ label: i.name, value: i.name })),
                ]}
              />
              <Select
                placeholder="Марк"
                value={
                  marksData?.marks.nodes.find(mark => mark.id === values.markId)
                    ?.name || ''
                }
                setSelectedOption={onChangeMark}
                options={
                  marksData?.marks.nodes.map(mark => ({
                    value: mark.id,
                    label: mark.name,
                  })) || []
                }
              />
              <Input
                placeholder="УНА0123"
                label="Машины дугаар"
                value={values.plateNumber}
                onBlur={handleBlur('plateNumber')}
                onChangeText={handleChange('plateNumber')}
                error={
                  touched.plateNumber && errors.plateNumber
                    ? errors.plateNumber
                    : undefined
                }
              />
            </Box>
          </Content>
          <Box
            px="m"
            style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          >
            <Button title="Нэмэх" onPress={handleSubmit} loading={loading} />
          </Box>
        </CustomKeyboardAvoidingView>
      </Container>
      <MessageModal
        type="success"
        message="Машин амжилттай нэмэгдлээ"
        onClose={() => {
          router.dismissTo('/profile/trucks');
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default AddTruckScreen;
