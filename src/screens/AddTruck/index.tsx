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
  GroupedSelect,
  Input,
  MessageModal,
  NormalHeader,
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useCreateTruckMutation } from '@/gql/mutations/createTruckMutation.generated';
import { useVerifyTruckMutation } from '@/gql/mutations/verifyTruckMutation.generated';
import { useGetTaxonsQuery } from '@/gql/query/getTaxonsQuery.generated';
import { useAppSelector } from '@/redux/hooks';
import { imageToFile } from '@/utils/fileHelpers';
import ImageInput from './ImageInput';

const schema = yup.object().shape({
  mark: yup.string().required('Энэ талбар хоосон байна!'),
  model: yup.string().required('Энэ талбар хоосон байна!'),
  taxonId: yup.string().required('Энэ талбар хоосон байна!'),
  plateNumber: yup.string().required('Энэ талбар хоосон байна!'),
});

const AddTruckScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const [createTruck] = useCreateTruckMutation();
  const [verifyTruck] = useVerifyTruckMutation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const { data: taxonsData } = useGetTaxonsQuery();
  const [passport, setPassport] = useState<string | null>(null);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      mark: '',
      model: '',
      plateNumber: '',
      taxonId: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      if (!passport) {
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
          mark: values.mark,
          model: values.model,
          userId: user!.id,
          plateNumber: values.plateNumber,
        },
      });

      const { data: verifyData } = await verifyTruck({
        variables: {
          passport: imageToFile(passport),
          truckId: data?.createTruck?.id || '',
        },
      });

      if (verifyData?.verifyTruck?.status === 'rejected') {
        return router.navigate({
          pathname: '/modal',
          params: {
            type: 'error',
            message:
              verifyData?.verifyTruck?.field5 ||
              'Баталгаажуулалт амжилтгүй боллоо',
          },
        });
      }
    },
  });

  return (
    <>
      <Container>
        <CustomKeyboardAvoidingView>
          <NormalHeader title="Машин нэмэх" hasBack />
          <Content edges={[]}>
            <Box gap="m">
              <GroupedSelect
                placeholder="Машин төрөл"
                options={[
                  {
                    title: 'Ачааны машин',
                    options:
                      taxonsData?.taxons?.edges
                        ?.filter(i => i?.node?.code === 'delivery')
                        .map(i => {
                          return {
                            label: i?.node?.name || '',
                            value: i?.node?.id || '',
                          };
                        }) || [],
                  },
                  {
                    title: 'Техник түрээс',
                    options:
                      taxonsData?.taxons?.edges
                        ?.filter(i => i?.node?.code === 'rent')
                        .map(i => {
                          return {
                            label: i?.node?.name || '',
                            value: i?.node?.id || '',
                          };
                        }) || [],
                  },
                ]}
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
              <Input
                placeholder="Марк"
                value={values.mark}
                onBlur={handleBlur('mark')}
                onChangeText={handleChange('mark')}
                error={touched.mark && errors.mark ? errors.mark : undefined}
              />
              <Input
                placeholder="Модел"
                value={values.model}
                onBlur={handleBlur('model')}
                onChangeText={handleChange('model')}
                error={touched.model && errors.model ? errors.model : undefined}
              />
              <Input
                placeholder="Машины дугаар УНА0123"
                value={values.plateNumber}
                autoCapitalize="characters"
                onBlur={handleBlur('plateNumber')}
                onChangeText={handleChange('plateNumber')}
                error={
                  touched.plateNumber && errors.plateNumber
                    ? errors.plateNumber
                    : undefined
                }
              />
              <ImageInput
                label="Машины гэрчилгээ"
                image={passport}
                setImage={setPassport}
              />
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
