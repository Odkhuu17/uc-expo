import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// import { InstantSearch } from 'react-instantsearch';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as yup from 'yup';

import { Container, Loader, ModalMsg, HeaderNormal } from '@/components';
import { Box } from '@/components/Theme';
import { rentCarTypes, deliveryCarTypes } from '@/constants/transportTypes';
import { audioToFile, imagesToFiles, videoToFile } from '@/utils/fileHelpers';
import { getImageUrl, isRentOrder } from '@/utils/helpers';
import searchClient from '@/utils/searchkit';
import Step1 from './Step1';
import Step2 from './Step2';
import DeliveryStep3 from './Step3/DeliveryStep3';
import RentStep3 from './Step3/RentStep3';
import { INavigationProps } from '@/navigations';
import { AddressSearchQuery } from '@/gql/queries/addressSearch.generated';
import { AddressCreateMutation } from '@/gql/mutations/addressCreate.generated';
import { useOrderCreateMutation } from '@/gql/mutations/orderCreate.generated';
import { useOrderUpdateMutation } from '@/gql/mutations/orderUpdate.generated';
import { useGetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const deliverySchema = yup.object().shape({
  packageType: yup.string().required('Энэ талбар хоосон байна!'),
  packageWeight: yup.string().required('Энэ талбар хоосон байна!'),
  travelDay: yup.string().required('Энэ талбар хоосон байна!'),
  travelHour: yup.string().required('Энэ талбар хоосон байна!'),
  vatIncluded: yup.boolean(),
  priceNegotiable: yup.boolean(),
  price: yup.string().when('priceNegotiable', {
    is: false,
    then: schema => schema.required('Энэ талбар хоосон байна!'),
    otherwise: schema => schema,
  }),
  carType: yup.string().required('Энэ талбар хоосон байна!'),
  additionalInfo: yup.string(),
  receiverName: yup.string().required('Энэ талбар хоосон байна!'),
  receiverMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
  senderName: yup.string(),
  senderMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
});

const rentSchema = yup.object().shape({
  carType: yup.string().required('Энэ талбар хоосон байна!'),
  carWeight: yup.string().required('Энэ талбар хоосон байна!'),
  startDate: yup.string().required('Энэ талбар хоосон байна!'),
  rentDay: yup.string().required('Энэ талбар хоосон байна!'),
  motHour: yup.string().required('Энэ талбар хоосон байна!'),
  vatIncluded: yup.boolean(),
  priceNegotiable: yup.boolean(),
  price: yup.string().when('priceNegotiable', {
    is: false,
    then: schema => schema.required('Энэ талбар хоосон байна!'),
    otherwise: schema => schema,
  }),
  additionalInfo: yup.string().required('Энэ талбар хоосон байна!'),
  additionalAddress: yup.string(),
});

interface Props {
  navigation: INavigationProps<'OrderCreateOrEdit'>['navigation'];
  route: INavigationProps<'OrderCreateOrEdit'>['route'];
}

const OrderCreate = ({ navigation, route }: Props) => {
  const { number } = route.params;
  const [step, setStep] = useState(number ? 3 : 1);
  const [successModal, setSuccessModal] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedOption] = useState<
    'origin' | 'destination'
  >('origin');
  const [origin, setOrigin] = useState<
    NonNullable<AddressSearchQuery['searchAddress']>[0] | null
  >(null);
  const [destination, setDestination] = useState<
    NonNullable<AddressSearchQuery['searchAddress']>[0] | null
  >(null);
  const [createdOrigin, setCreatedOrigin] = useState<NonNullable<
    AddressCreateMutation['createAddress']
  > | null>(null);
  const [createdDestination, setCreatedDestination] = useState<NonNullable<
    AddressCreateMutation['createAddress']
  > | null>(null);

  const [audio, setAudio] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState('');

  const [createOrder] = useOrderCreateMutation();
  const [updateOrder] = useOrderUpdateMutation();

  const { data, loading: getOrderLoading } = useGetOrderDetailQuery({
    variables: { number: String(number) },
    skip: !number,
  });

  const formik = useFormik({
    initialValues: {
      packageType: '',
      packageWeight: '',
      travelDay: '',
      travelHour: '',
      vatIncluded: false,
      priceNegotiable: false,
      price: '',
      additionalInfo: '',
      receiverName: '',
      receiverMobile: '',
      senderName: '',
      senderMobile: '',
      carType: '',
    },
    validationSchema: deliverySchema,
    onSubmit: async () => {
      const values = formik.values;

      if (number) {
        await updateOrder({
          variables: {
            input: {
              id: data?.order?.id!,
              originId: createdOrigin?.id,
              destinationId: createdDestination?.id,
              packageType: values.packageType,
              carType: values.carType,
              packageWeight: values.packageWeight,
              travelAt: dayjs(`${values.travelDay} ${values.travelHour}`),
              vatIncluded: values.vatIncluded,
              price: values.priceNegotiable ? undefined : Number(values.price),
              data: {
                additionalInfo: values.additionalInfo,
              },
              receiverName: values.receiverName,
              receiverMobile: values.receiverMobile,
              senderName: values.senderName,
              senderMobile: values.senderMobile,
              published: true,
            },
          },
        });
      } else {
        await createOrder({
          variables: {
            taxonId: '1',
          },
        });
      }

      setSuccessModal(true);
    },
  });

  const formik2 = useFormik({
    initialValues: {
      carWeight: '',
      startDate: '',
      rentDay: '',
      motHour: '',
      vatIncluded: false,
      priceNegotiable: false,
      price: '',
      additionalInfo: '',
      additionalAddress: '',
      carType: '',
    },
    validationSchema: rentSchema,
    onSubmit: async () => {
      const imageFiles = images.length > 0 ? imagesToFiles(images) : [];
      const videoFile = video ? videoToFile(video) : null;
      const audioFile = audio ? audioToFile(audio) : null;

      const values = formik2.values;
      if (number) {
        await updateOrder({
          variables: {
            input: {
              id: data?.order?.id!,
              originId: createdOrigin?.id,
              carType: values.carType,
              carWeight: values.carWeight,
              travelAt: dayjs(`${values.startDate}`),
              vatIncluded: values.vatIncluded,
              price: values.priceNegotiable ? undefined : Number(values.price),
              data: {
                rentDay: values.rentDay,
                motHour: values.motHour,
                additionalInfo: values.additionalInfo,
                additionalAddress: values.additionalAddress,
              },
              images: imageFiles.length > 0 ? imageFiles : undefined,
              video: videoFile,
              audio: audioFile,
              published: true,
            },
          },
        });
      } else {
        await createOrder({
          variables: {
            originId: createdOrigin?.id,
            carType: values.carType,
            carWeight: values.carWeight,
            travelAt: dayjs(`${values.startDate}`),
            vatIncluded: values.vatIncluded,
            price: values.priceNegotiable ? undefined : Number(values.price),
            data: {
              rentDay: values.rentDay,
              motHour: values.motHour,
              additionalInfo: values.additionalInfo,
              additionalAddress: values.additionalAddress,
            },
            images: imageFiles.length > 0 ? imageFiles : undefined,
            video: videoFile,
            audio: audioFile,
            published: true,
          },
        });
      }
      setSuccessModal(true);
    },
  });

  const resetState = () => {
    setStep(1);
    setIsRent(false);
    setSelectedCarTypes([]);
    setSelectedOption('origin');
    setOrigin(null);
    setDestination(null);
    setCreatedOrigin(null);
    setCreatedDestination(null);
    setAudio('');
    setImages([]);
    setVideo('');
    formik.resetForm();
    formik2.resetForm();
  };

  useEffect(() => {
    if (isRent) {
      setSelectedOption('origin');
      setSelectedCarTypes(rentCarTypes.map(car => car.name));
    } else {
      setSelectedCarTypes(deliveryCarTypes.map(car => car.name));
    }
  }, [isRent]);

  useEffect(() => {
    if (data) {
      const isRentO = isRentOrder(data?.order?.carType);

      setIsRent(isRentO);
      setCreatedOrigin(data?.order?.origin || null);
      setCreatedDestination(data?.order?.destination || null);
      setAudio(data?.order?.audio ? getImageUrl(data?.order?.audio) : '');
      setImages(
        data?.order?.images && data.order.images.length > 0
          ? data.order.images.map(i => getImageUrl(i))
          : [],
      );
      setVideo(data?.order?.video ? getImageUrl(data?.order?.video) : '');

      if (isRentO) {
        formik2.setValues({
          carType: data?.order?.carType || '',
          carWeight: data?.order?.carWeight || '',
          startDate: dayjs(data?.order?.travelAt).format('YYYY-MM-DD') || '',
          rentDay: data?.order?.data?.rent_day || '',
          motHour: data?.order?.data?.mot_hour || '',
          vatIncluded: data?.order?.vatIncluded || false,
          priceNegotiable: data?.order?.price ? false : true,
          price: String(data?.order?.price || ''),
          additionalInfo: data?.order?.data?.additional_info || '',
          additionalAddress: data?.order?.data?.additional_address || '',
        });
      } else {
        formik.setValues({
          packageType: data?.order?.packageType || '',
          packageWeight: data?.order?.packageWeight || '',
          travelDay: dayjs(data?.order?.travelAt).format('YYYY-MM-DD') || '',
          travelHour: dayjs(data?.order?.travelAt).format('HH:mm') || '',
          vatIncluded: data?.order?.vatIncluded || false,
          priceNegotiable: data?.order?.price ? false : true,
          price: String(data?.order?.price || ''),
          additionalInfo: data?.order?.data?.additionalInfo || '',
          receiverName: data?.order?.receiverName || '',
          receiverMobile: data?.order?.receiverMobile || '',
          senderName: data?.order?.senderName || '',
          senderMobile: data?.order?.senderMobile || '',
          carType: data?.order?.carType || '',
        });
      }
    }
  }, [data]);

  const renderContent = () => {
    if (step === 1) {
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} key={1} flex={1}>
          <Step1 setIsRent={setIsRent} setStep={setStep} />
        </AnimatedBox>
      );
    } else if (step === 2) {
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} key={2} flex={1}>
          <Step2
            createdOrigin={createdOrigin}
            createdDestination={createdDestination}
            setCreatedOrigin={setCreatedOrigin}
            setCreatedDestination={setCreatedDestination}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedOption}
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            setStep={setStep}
            isRent={isRent}
            selectedCarTypes={selectedCarTypes}
            setSelectedCarTypes={setSelectedCarTypes}
          />
        </AnimatedBox>
      );
    } else {
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} key={3} flex={1}>
          {!isRent ? (
            <DeliveryStep3
              setSelectedLocation={setSelectedOption}
              createdOrigin={createdOrigin}
              createdDestination={createdDestination}
              audio={audio}
              images={images}
              video={video}
              setAudio={setAudio}
              setImages={setImages}
              setVideo={setVideo}
              formik={formik}
              setStep={setStep}
            />
          ) : (
            <RentStep3
              setSelectedLocation={setSelectedOption}
              createdOrigin={createdOrigin}
              createdDestination={createdDestination}
              audio={audio}
              images={images}
              video={video}
              setAudio={setAudio}
              setImages={setImages}
              setVideo={setVideo}
              formik={formik2}
              setStep={setStep}
            />
          )}
        </AnimatedBox>
      );
    }
  };

  const onPressBack = () => {
    if (step === 1) {
      return navigation.goBack();
    }

    if (number) {
      if (step === 2) {
        return setStep(3);
      }
      if (step === 3) {
        return navigation.goBack();
      }
    }

    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onCloseSuccessModal = () => {
    navigation.goBack();
    setSuccessModal(false);
  };

  return (
    // <InstantSearch indexName="supp_tracks" searchClient={searchClient}>
    <>
      <Container>
        <HeaderNormal
          hasBack
          title={number ? `Захиалга засах ${number}` : 'Захиалга үүсгэх'}
          handlePressBack={onPressBack}
        />
        {getOrderLoading ? <Loader /> : renderContent()}
      </Container>
      <ModalMsg
        type="success"
        msg={
          number
            ? 'Захиалга амжилттай шинэчлэгдлээ'
            : 'Захиалга амжилттай үүслээ'
        }
        handleClose={onCloseSuccessModal}
        visible={successModal}
      />
    </>
    // </InstantSearch>
  );
};

export default OrderCreate;
