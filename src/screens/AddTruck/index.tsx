import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import {
  BoxContainer,
  Button,
  Container,
  Content,
  CustomKeyboardAvoidingView,
  Input,
  MessageModal,
  NormalHeader,
  Select,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useCreateTruckMutation } from '@/gql/mutations/createTruckMutation.generated';
import { useVerifyRequestMutation } from '@/gql/mutations/verifyRequestMutation.generated';
import { useGetMarksQuery } from '@/gql/query/getMarks.generated';
import { useGetModelsQuery } from '@/gql/query/getModels.generated';
import { useGetTaxonsQuery } from '@/gql/query/getTaxonsQuery.generated';
import { useAppSelector } from '@/redux/hooks';
import ImageButton from './ImageButton';
import Images from './Images';

const schema = yup.object().shape({
  markId: yup.string().required('Энэ талбар хоосон байна!'),
  modelId: yup.string().required('Энэ талбар хоосон байна!'),
  taxonId: yup.string().required('Энэ талбар хоосон байна!'),
  plateNumber: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .matches(
      /^[А-Я]{3}\d{4}$/,
      'Дугаар нь А-Я (3 үсэг) + 0-9 (4 тоо) байх ёстой (жишээ: УНА0123)'
    ),
});

const AddTruckScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const [createTruck] = useCreateTruckMutation();
  const [verifyRequest] = useVerifyRequestMutation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const { data: marksData } = useGetMarksQuery();
  const { data: taxonsData } = useGetTaxonsQuery();
  const [images, setImages] = useState<string[]>([]);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      markId: '',
      modelId: '',
      plateNumber: '',
      taxonId: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      if (images.length === 0) {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message: 'Машинтай холбогдох бичиг баримтын зургаа оруулна уу!',
          },
        });
      }

      const { data } = await createTruck({
        variables: {
          taxonId: values.taxonId,
          markId: values.markId,
          modelId: values.modelId,
          userId: user!.id,
          plateNumber: values.plateNumber,
        },
      });

      await verifyRequest({
        variables: {
          images,
          kind: 'truck',
          targetId: data?.createTruck?.id || '',
        },
      });
    },
  });

  const { data: modelsData } = useGetModelsQuery({
    variables: { markId: values.markId },
    skip: values.markId === '',
  });

  useEffect(() => {
    setFieldValue('modelId', '');
  }, [values.markId]);

  return (
    <>
      <Container>
        <CustomKeyboardAvoidingView>
          <NormalHeader title="Машин нэмэх" hasBack />
          <Content edges={[]}>
            <Box gap="m">
              <Select
                placeholder="Машин төрөл"
                options={
                  taxonsData?.taxons?.edges?.map(i => {
                    return {
                      label: i?.node?.name || '',
                      value: i?.node?.id || '',
                    };
                  }) || []
                }
                setSelectedOption={handleChange('taxonId')}
                selectedOption={
                  taxonsData?.taxons?.edges?.find(
                    i => i?.node?.id === values.taxonId
                  )?.node?.name || ''
                }
                error={
                  touched.taxonId && errors.taxonId ? errors.taxonId : undefined
                }
              />
              <Select
                placeholder="Марк"
                setSelectedOption={handleChange('markId')}
                options={
                  marksData?.marks.nodes.map(mark => ({
                    value: mark.id,
                    label: mark.name,
                  })) || []
                }
                selectedOption={
                  marksData?.marks.nodes.find(mark => mark.id === values.markId)
                    ?.name || ''
                }
                error={
                  touched.markId && errors.markId ? errors.markId : undefined
                }
              />
              <Select
                placeholder="Модел"
                setSelectedOption={handleChange('modelId')}
                options={
                  modelsData?.models.nodes.map(model => ({
                    value: model.id,
                    label: model.name,
                  })) || []
                }
                selectedOption={
                  modelsData?.models.nodes.find(
                    model => model.id === values.modelId
                  )?.name || ''
                }
                error={
                  touched.modelId && errors.modelId ? errors.modelId : undefined
                }
              />
              <Input
                placeholder="Машины дугаар УНА0123"
                value={values.plateNumber}
                onBlur={handleBlur('plateNumber')}
                onChangeText={handleChange('plateNumber')}
                error={
                  touched.plateNumber && errors.plateNumber
                    ? errors.plateNumber
                    : undefined
                }
              />
              <BoxContainer gap="m">
                <Text
                  variant="body1"
                  color="baseBlue"
                  fontFamily="Roboto_500Medium"
                  flex={1}
                >
                  Машины гэрчилгээ болон холбогдох зургууд
                </Text>
                <Box flexDirection="row" gap="m">
                  <ImageButton setImages={setImages} />
                  <Images images={images} setImages={setImages} />
                </Box>
              </BoxContainer>
            </Box>
          </Content>
          <Box
            px="m"
            style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          >
            <Button
              title="Машин нэмэх"
              onPress={handleSubmit}
              loading={isSubmitting}
            />
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
