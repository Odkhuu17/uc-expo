import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import { Dispatch, RefObject, SetStateAction, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';

import { Button, CustomBottomSheetModal, TextArea } from '@/components';
import { Box, useTheme } from '@/components/Theme';
import {
    CreateAddressMutation,
    useCreateAddressMutation,
} from '@/gql/mutations/createAddressMutation.generated';

interface Props {
  ref: RefObject<BottomSheetModal | null>;
  setCreatedLocation: Dispatch<
    SetStateAction<NonNullable<CreateAddressMutation['createAddress']> | null>
  >;
}

const schema = yup.object().shape({
  address1: yup.string().required('Энэ талбар хоосон байна!'),
});

const LocationModal = ({ ref, setCreatedLocation }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const snapPoints = useMemo(() => [], []);

  const [createAddress, { loading }] = useCreateAddressMutation();

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      address1: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      const { data } = await createAddress({
        variables: {
          address1: values.address1,
        },
      });

      setCreatedLocation(data?.createAddress ?? null);
      ref.current?.dismiss();
    },
  });

  const onChangeSheet = (index: number) => {
    if (index === -1) {
      resetForm();
    }
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enableDynamicSizing={true}
      onChange={onChangeSheet}
    >
      <BottomSheetView>
        <Box
          style={{ paddingBottom: insets.bottom + theme.spacing.m }}
          px="m"
          pt="m"
          gap="m"
        >
          <TextArea
            placeholder="Хаягаа бичих"
            keyboardAvoiding
            onChangeText={handleChange('address1')}
            onBlur={handleBlur('address1')}
            value={values.address1}
            error={
              touched.address1 && errors.address1 ? errors.address1 : undefined
            }
          />
          <Button title="Хадгалах" loading={loading} onPress={handleSubmit} />
        </Box>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
};

export default LocationModal;
