import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { ContainerTruck01Icon } from '@hugeicons/core-free-icons';
import { TextInput } from 'react-native';

import {
  Button,
  Container,
  CustomKeyboardAvoidingView,
  SelectGrouped,
  Input,
  ModalMsg,
  HeaderNormal,
  InputImage,
  ContentScrollable,
  BottomContainer,
} from '@/components';
import { Box } from '@/components/Theme';
import { rentCarTypes, deliveryCarTypes } from '@/constants/transportTypes';
import { useAppSelector } from '@/redux/hooks';
import { imageToFile } from '@/utils/fileHelpers';
import { INavigationProps } from '@/navigations';
import { useCreateTruckMutation } from '@/gql/mutations/createTruck.generated';
import { useVerifyTruckMutation } from '@/gql/mutations/verifyTruck.generated';
import { useGetTaxonsQuery } from '@/gql/queries/getTaxons.generated';
import { useGetMyTrucksQuery } from '@/gql/queries/getMyTruck.generated';
import { useUpdateTruckMutation } from '@/gql/mutations/updateTruck.generated';

interface Props {
  navigation: INavigationProps<'TruckAddOrEdit'>['navigation'];
  route: INavigationProps<'TruckAddOrEdit'>['route'];
}

const schema = yup.object().shape({
  mark: yup.string().required('Энэ талбар хоосон байна!'),
  model: yup.string().required('Энэ талбар хоосон байна!'),
  taxonId: yup.string().required('Энэ талбар хоосон байна!'),
  plateNumber: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .max(7, 'Та буруу дугаар оруулсан байна!')
    .min(6, 'Та буруу дугаар оруулсан байна!'),
});

const TruckAddOrEdit = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { user } = useAppSelector(state => state.auth);
  const [createTruck] = useCreateTruckMutation();
  const [verifyTruck] = useVerifyTruckMutation();
  const [successModal, setSuccessModal] = useState(false);
  const { data: taxonsData } = useGetTaxonsQuery();
  const [passport, setPassport] = useState<string | null>(null);
  const { data: trucksData } = useGetMyTrucksQuery();
  const [updateTruck] = useUpdateTruckMutation();
  const refs = useRef<TextInput[]>([]);

  const truck = trucksData?.me?.trucks?.find(truck => truck.id === id);

  console.log(trucksData);

  useEffect(() => {
    if (id) {
      setFieldValue('mark', truck?.mark || '');
      setFieldValue('model', truck?.model || '');
      setFieldValue('plateNumber', truck?.plateNumber || '');
      setFieldValue('taxonId', truck?.taxon?.id || '');
    }
  }, [truck]);

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
      mark: '',
      model: '',
      plateNumber: '',
      taxonId: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      if (!passport) {
        return navigation.navigate('MsgModal', {
          type: 'error',
          msg: 'Машинтай холбогдох бичиг баримтын зургаа оруулна уу!',
        });
      }

      if (id) {
        await updateTruck({
          variables: {
            id,
            taxonId: values.taxonId,
            mark: values.mark,
            model: values.model,
            userId: user!.id,
            plateNumber: values.plateNumber,
          },
        });

        await verifyTruck({
          variables: {
            passport: imageToFile(passport),
            truckId: id || '',
          },
        });

        setSuccessModal(true);
      } else {
        const { data } = await createTruck({
          variables: {
            taxonId: values.taxonId,
            mark: values.mark,
            model: values.model,
            userId: user!.id,
            plateNumber: values.plateNumber,
          },
        });

        await verifyTruck({
          variables: {
            passport: imageToFile(passport),
            truckId: data?.createTruck?.id || '',
          },
        });
      }

      setSuccessModal(true);
    },
  });

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    navigation.goBack();
  };

  const handleSubmitEditing = (index: number) => {
    if (refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <>
      <Container>
        <CustomKeyboardAvoidingView>
          <HeaderNormal title="Машин нэмэх" hasBack />
          <ContentScrollable edges={[]}>
            <Box gap="m">
              <SelectGrouped
                label="Техникийн төрөл"
                placeholder="Техникийн төрөл"
                icon={ContainerTruck01Icon}
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
                            image: deliveryCarTypes?.find(
                              k => k.name === i?.node?.name,
                            )?.image,
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
                            image: rentCarTypes?.find(
                              k => k?.name === i?.node?.name,
                            )?.image,
                          };
                        }) || [],
                  },
                ]}
                setSelectedOption={handleChange('taxonId')}
                selectedOption={
                  taxonsData?.taxons?.edges?.find(
                    i => i?.node?.id === values.taxonId,
                  )?.node?.name || ''
                }
                error={
                  touched.taxonId && errors.taxonId ? errors.taxonId : undefined
                }
              />
              <Input
                label="Марк"
                placeholder="Марк"
                value={values.mark}
                onBlur={handleBlur('mark')}
                onChangeText={handleChange('mark')}
                returnKeyType="next"
                ref={(el: TextInput) => {
                  refs.current[0] = el;
                }}
                onSubmitEditing={() => handleSubmitEditing(0)}
                error={touched.mark && errors.mark ? errors.mark : undefined}
              />
              <Input
                label="Модел"
                placeholder="Модел"
                value={values.model}
                onBlur={handleBlur('model')}
                onChangeText={handleChange('model')}
                error={touched.model && errors.model ? errors.model : undefined}
                returnKeyType="next"
                ref={(el: TextInput) => {
                  refs.current[1] = el;
                }}
                onSubmitEditing={() => handleSubmitEditing(1)}
              />
              <Input
                label="Машины дугаар"
                placeholder="1234УНА"
                maxLength={7}
                value={values.plateNumber}
                autoCapitalize="characters"
                onBlur={handleBlur('plateNumber')}
                onChangeText={handleChange('plateNumber')}
                error={
                  touched.plateNumber && errors.plateNumber
                    ? errors.plateNumber
                    : undefined
                }
                ref={(el: TextInput) => {
                  refs.current[2] = el;
                }}
              />
              <InputImage
                label="Машины гэрчилгээ"
                image={passport}
                setImage={setPassport}
              />
            </Box>
          </ContentScrollable>
        </CustomKeyboardAvoidingView>
        <BottomContainer>
          <Button
            title={id ? 'Мэдээлэл шинэчлэх' : 'Машин нэмэх'}
            onPress={handleSubmit}
            loading={isSubmitting}
          />
        </BottomContainer>
      </Container>
      <ModalMsg
        type="success"
        msg={
          id
            ? 'Машины мэдээлэл амжилттай шинэчлэгдлээ'
            : 'Машин амжилттай нэмэгдлээ'
        }
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default TruckAddOrEdit;
