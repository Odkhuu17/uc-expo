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
} from '@/components';
import { Box, useTheme } from '@/components/Theme';
import { useCreateTaxonMutation } from '@/gql/mutations/createTaxonMutation.generated';
import { useDestroyTaxonMutation } from '@/gql/mutations/destroyTaxonMutation.generated';
import { useGetTaxonsQuery } from '@/gql/query/getTaxonsQuery.generated';

const schema = yup.object().shape({
  name: yup.string().required('Нэр оруулна уу!'),
});

const CreateTaxonScreen = () => {
  const [createTaxon, { loading }] = useCreateTaxonMutation();
  const { data: taxonsData } = useGetTaxonsQuery({ fetchPolicy: 'no-cache' });
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const [destroyTaxon, { loading: destroying }] = useDestroyTaxonMutation();

  //   useEffect(() => {
  //     destroyTaxon({ variables: { id: '4' } });
  //     destroyTaxon({ variables: { id: '1' } });
  //     destroyTaxon({ variables: { id: '3' } });
  //   }, []);

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
      code: '',
      name: '',
      link: '',
      slug: '',
      icon: '',
      parentId: '',
      position: 0,
      active: true,
    },
    validationSchema: schema,
    onSubmit: async formValues => {
      createTaxon({
        variables: {
          code: 'delivery',
          name: formValues.name,
          link: '/',
        },
      }).then(() => {
        setSuccessModal(true);
      });
    },
  });

  taxonsData?.taxons?.edges?.map(i => {
    console.log(i.node);
  });

  return (
    <>
      <Container>
        <CustomKeyboardAvoidingView>
          <NormalHeader title="Ангилал нэмэх" hasBack />
          <Content edges={[]}>
            <Box gap="m">
              <Input
                placeholder="Тээврийн хэрэгсэл"
                label="Нэр"
                value={values.name}
                onBlur={handleBlur('name')}
                onChangeText={handleChange('name')}
                error={touched.name && errors.name ? errors.name : undefined}
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
        message="Ангилал амжилттай нэмэгдлээ"
        onClose={() => {
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default CreateTaxonScreen;
