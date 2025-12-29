import { useFormik } from 'formik';
import { CallIcon } from '@hugeicons/core-free-icons';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components';
import Input from '@/components/Input';
import { INavigation } from '@/navigations';
import { useAuthCheckLoginMutation } from '@/gql/mutations/authCheckLogin.generated';
import { Box } from '@/components/Theme';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}

const schema = yup.object().shape({
  login: yup.string().required('Энэ талбар хоосон байна!'),
});

const Step1 = ({ setStep, setPhoneNumber }: Props) => {
  console.log('uwifhwef');

  const [authCheckLogin, { loading }] = useAuthCheckLoginMutation();
  const navigation = useNavigation<INavigation>();

  const { handleSubmit, values, errors, handleChange } = useFormik({
    initialValues: {
      login: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      try { 
        authCheckLogin({
          variables: {
            login: values.login,
            sendToken: false,
          },
        }).then(async ({ data }) => {
          console.log(data);
          // if (!data?.exists.exists) {
          //   setPhoneNumber(values.login);
          //   await authCheckLogin({
          //     variables: {
          //       login: values.login,
          //       sendToken: true,
          //     },
          //   });
          //   setStep(2);
          // } else {
          //   navigation.navigate('MsgModal', {
          //     type: 'error',
          //     msg: 'Та бүртгэлтэй байна.',
          //   });
          // }
        });
      } catch (e) {
        console.log(e, 'eerr');
      }
    },
  });

  return (
    <>
      <Box flex={2} gap="m" alignItems="center" justifyContent="center">
        <Input
          label="Утасны дугаар"
          placeholder="Утасны дугаар"
          width={270}
          keyboardType="number-pad"
          icon={CallIcon}
          value={values.login}
          onChangeText={handleChange('login')}
          error={errors.login ? errors.login : undefined}
        />
        <Button
          title="Бүртгүүлэх"
          width={180}
          loading={loading}
          onPress={handleSubmit}
        />
      </Box>
      <Box flex={1} />
    </>
  );
};

export default Step1;
