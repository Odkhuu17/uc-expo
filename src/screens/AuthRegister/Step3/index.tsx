import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  IdentityCardIcon,
  Location05Icon,
  LockPasswordIcon,
  UserListIcon,
} from '@hugeicons/core-free-icons';
import { TextInput } from 'react-native';

import { Button, Checkbox, ModalMsg, Select } from '@/components';
import Input from '@/components/Input';
import { useAppSelector } from '@/redux/hooks';
import { INavigation } from '@/navigations';
import { useAuthRegisterMutation } from '@/gql/mutations/authRegister.generated';
import { Box } from '@/components/Theme';
import TermsModal from './TermsModal';
import { useGetCountryQuery } from '@/gql/queries/getCountry.generated';

interface Props {
  phoneNumber: string;
  token: string;
}

const schema = yup.object().shape({
  lastname: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .matches(/^[А-Яа-яӨөҮүЁё\s]+$/, 'Зөвхөн кирилл үсэг оруулна уу!'),
  firstname: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .matches(/^[А-Яа-яӨөҮүЁё\s]+$/, 'Зөвхөн кирилл үсэг оруулна уу!'),
  registerNum: yup.string().required('Энэ талбар хоосон байна!'),
  // selectedCountry: yup.string().required('Энэ талбар хоосон байна!'),
  // selectedDistrict: yup.string().required('Энэ талбар хоосон байна!'),
  // selectedQuarter: yup.string().required('Энэ талбар хоосон байна!'),
  password: yup.string().required('Энэ талбар хоосон байна!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг таарахгүй байна!'),
});

const Step3 = ({ phoneNumber, token }: Props) => {
  const [authRegister, { loading }] = useAuthRegisterMutation();
  const [successModal, setSuccessModal] = useState(false);
  const navigation = useNavigation<INavigation>();
  const { mode } = useAppSelector(state => state.general);
  const refs = useRef<TextInput[]>([]);
  const [termsModal, setTermsModal] = useState(false);
  const [confirmedTerms, setConfirmedTerms] = useState(false);
  const { data } = useGetCountryQuery();

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        lastname: '',
        firstname: '',
        password: '',
        passwordConfirmation: '',
        token: '',
        registerNum: '',
        // selectedCountry: '',
        // selectedDistrict: '',
        // selectedQuarter: '',
      },
      validationSchema: schema,
      onSubmit: async () => {
        if (!confirmedTerms) {
          navigation.navigate('MsgModal', {
            type: 'error',
            msg: 'Та үйлчилгээний нөхцөлүүдийг зөвшөөрнө үү!',
          });
          return;
        }

        await authRegister({
          variables: {
            firstName: values.firstname,
            lastName: values.lastname,
            login: phoneNumber,
            password: values.password,
            token,
            registerNum: values.registerNum,
            role: mode === 'driver' ? 'driver' : 'member',
          },
        });
        setSuccessModal(true);
      },
    });

  // const districtOptions = data?.country?.sdq
  //   ?.find(i => i.label === values.selectedCountry)
  //   ?.children?.map(p => ({
  //     label: p.label,
  //     value: p.label,
  //   }));

  // const quarterOptions = data?.country?.sdq
  //   ?.find(i => i.label === values.selectedCountry)
  //   ?.children?.find(i => i.label === values.selectedDistrict)
  //   ?.children?.map(p => ({
  //     label: p.label,
  //     value: p.label,
  //   }));

  const handleSubmitEditing = (index: number) => {
    if (refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    navigation.navigate('AuthLogin');
  };

  const acceptTerms = () => {
    setTermsModal(false);
    setConfirmedTerms(true);
  };

  const unacceptTerms = () => {
    setTermsModal(false);
    setConfirmedTerms(false);
  };

  return (
    <>
      <Box gap="m">
        <Input
          label="Овог"
          isRequired
          placeholder="Овог"
          icon={UserListIcon}
          value={values.lastname}
          onBlur={handleBlur('lastname')}
          onChangeText={handleChange('lastname')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[0] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(0)}
          error={
            touched.lastname && errors.lastname ? errors.lastname : undefined
          }
        />
        <Input
          label="Нэр"
          isRequired
          placeholder="Нэр"
          icon={UserListIcon}
          value={values.firstname}
          onBlur={handleBlur('firstname')}
          onChangeText={handleChange('firstname')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[1] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(1)}
          error={
            touched.firstname && errors.firstname ? errors.firstname : undefined
          }
        />
        <Input
          label="Регистр дугаар"
          placeholder="Регистр эсвэл иргэний үнэмлэхний дугаар"
          isRequired
          icon={IdentityCardIcon}
          autoCapitalize="characters"
          value={values.registerNum}
          onBlur={handleBlur('registerNum')}
          onChangeText={handleChange('registerNum')}
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[2] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(2)}
          error={
            touched.registerNum && errors.registerNum
              ? errors.registerNum
              : undefined
          }
        />
        {/* <Select
          isRequired
          label="Хот/Аймаг"
          icon={Location05Icon}
          placeholder="Хот/Аймаг"
          options={data?.country?.sdq?.map(p => ({
            label: p.label,
            value: p.label,
          }))}
          selectedOption={values.selectedCountry}
          setSelectedOption={handleChange('selectedCountry')}
          error={
            touched.selectedCountry && errors.selectedCountry
              ? errors.selectedCountry
              : undefined
          }
        />
        <Select
          isRequired
          label="Дүүрэг/Сум"
          icon={Location05Icon}
          placeholder="Дүүрэг/Сум"
          options={districtOptions}
          selectedOption={values.selectedDistrict}
          setSelectedOption={handleChange('selectedDistrict')}
          error={
            touched.selectedDistrict && errors.selectedDistrict
              ? errors.selectedDistrict
              : undefined
          }
        />
        <Select
          isRequired
          label="Хороо/Баг"
          icon={Location05Icon}
          placeholder="Хороо/Баг"
          options={quarterOptions}
          selectedOption={values.selectedQuarter}
          setSelectedOption={handleChange('selectedQuarter')}
          error={
            touched.selectedQuarter && errors.selectedQuarter
              ? errors.selectedQuarter
              : undefined
          }
        /> */}
        <Input
          label="Нууц үг"
          placeholder="Нууц үг"
          isRequired
          icon={LockPasswordIcon}
          value={values.password}
          onChangeText={handleChange('password')}
          secureTextEntry
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[3] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(3)}
          error={
            touched.password && errors.password ? errors.password : undefined
          }
        />
        <Input
          label="Нууц үг давтан оруулна уу!"
          placeholder="Нууц үг давтан оруулна уу!"
          isRequired
          icon={LockPasswordIcon}
          value={values.passwordConfirmation}
          onBlur={handleBlur('passwordConfirmation')}
          onChangeText={handleChange('passwordConfirmation')}
          secureTextEntry
          returnKeyType="next"
          ref={(el: TextInput) => {
            refs.current[4] = el;
          }}
          onSubmitEditing={() => handleSubmitEditing(4)}
          error={
            touched.passwordConfirmation && errors.passwordConfirmation
              ? errors.passwordConfirmation
              : undefined
          }
        />
        <Box flexDirection="row" alignItems="center">
          <Checkbox
            label="Үйлчилгээний нөхцөлийг зөвшөөрч байна"
            value={confirmedTerms}
            onChange={() => setTermsModal(true)}
          />
        </Box>
        <Button title="Бүртгүүлэх" loading={loading} onPress={handleSubmit} />
      </Box>
      <ModalMsg
        type="success"
        msg="Та амжилттай бүртгүүллээ"
        handleClose={handleCloseSuccessModal}
        visible={successModal}
      />
      <TermsModal
        visible={termsModal}
        handleClose={unacceptTerms}
        handleConfirm={acceptTerms}
      />
    </>
  );
};

export default Step3;
