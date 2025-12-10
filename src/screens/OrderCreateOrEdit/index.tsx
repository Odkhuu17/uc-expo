import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as yup from 'yup';

import { Container, Loader, MessageModal, NormalHeader } from '@/components';
import { Box } from '@/components/Theme';
import { carTypes, carTypes2 } from '@/constants';
import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { useCreateOrderMutation } from '@/gql/mutations/createOrderMutation.generated';
import { useUpdateOrderMutation } from '@/gql/mutations/updateOrderMutation.generated';
import { useGetOrderQuery } from '@/gql/query/getOrder.generated';
import { SearchAddressQuery } from '@/gql/query/searchAddressQuery.generated';
import { audioToFile, imagesToFiles, videoToFile } from '@/utils/fileHelpers';
import { isRentOrder } from '@/utils/helpers';
import Step1 from './Step1';
import Step2 from './Step2';
import DeliveryStep3 from './Step3/DeliveryStep3';
import RentStep3 from './Step3/RentStep3';
import { InstantSearch } from 'react-instantsearch';
import searchClient, { createTruckFilteredClient } from '@/utils/searchkit';

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
  quantity: yup.string(),
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
  additionalInfo: yup.string(),
  additionalAddress: yup.string(),
});

const OrderCreateScreen = () => {
  const { number } = useLocalSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(number ? 3 : 1);
  const [successModal, setSuccessModal] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedOption] = useState<
    'origin' | 'destination'
  >('origin');
  const [origin, setOrigin] = useState<
    NonNullable<SearchAddressQuery['searchAddress']>[0] | null
  >(null);
  const [destination, setDestination] = useState<
    NonNullable<SearchAddressQuery['searchAddress']>[0] | null
  >(null);
  const [createdOrigin, setCreatedOrigin] = useState<NonNullable<
    CreateAddressMutation['createAddress']
  > | null>(null);
  const [createdDestination, setCreatedDestination] = useState<NonNullable<
    CreateAddressMutation['createAddress']
  > | null>(null);

  const [audio, setAudio] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState('');

  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const { data, loading: getOrderLoading } = useGetOrderQuery({
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
      quantity: '',
      additionalInfo: '',
      receiverName: '',
      receiverMobile: '',
      senderName: '',
      senderMobile: '',
      carType: '',
    },
    validationSchema: deliverySchema,
    onSubmit: async () => {
      const imageFiles = images.length > 0 ? imagesToFiles(images) : [];
      const videoFile = video ? videoToFile(video) : null;
      const audioFile = audio ? audioToFile(audio) : null;

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
              packageWeight: Number(values.packageWeight),
              travelAt: dayjs(`${values.travelDay} ${values.travelHour}`),
              vatIncluded: values.vatIncluded,
              price: values.priceNegotiable ? undefined : Number(values.price),
              data: {
                quantity: values.quantity,
                additionalInfo: values.additionalInfo,
              },
              receiverName: values.receiverName,
              receiverMobile: values.receiverMobile,
              senderName: values.senderName,
              senderMobile: values.senderMobile,
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
            destinationId: createdDestination?.id,
            packageType: values.packageType,
            carType: values.carType,
            packageWeight: Number(values.packageWeight),
            travelAt: dayjs(`${values.travelDay} ${values.travelHour}`),
            vatIncluded: values.vatIncluded,
            price: values.priceNegotiable ? undefined : Number(values.price),
            data: {
              quantity: values.quantity,
              additionalInfo: values.additionalInfo,
            },
            receiverName: values.receiverName,
            receiverMobile: values.receiverMobile,
            senderName: values.senderName,
            senderMobile: values.senderMobile,
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
      setSelectedCarTypes(carTypes2.map(car => car.name));
    } else {
      setSelectedCarTypes(carTypes.map(car => car.name));
    }
  }, [isRent]);

  useEffect(() => {
    if (data) {
      const isRentO = isRentOrder(data?.order?.carType);

      setIsRent(isRentO);
      setCreatedOrigin(data?.order?.origin || null);
      setCreatedDestination(data?.order?.destination || null);
      setAudio(
        data?.order?.audio
          ? `${process.env.EXPO_PUBLIC_IMAGE_URL}${data?.order?.audio}`
          : ''
      );
      setImages(
        data?.order?.images && data.order.images.length > 0
          ? data.order.images.map(
              i => `${process.env.EXPO_PUBLIC_IMAGE_URL}${i}`
            )
          : []
      );
      setVideo(
        data?.order?.video
          ? `${process.env.EXPO_PUBLIC_IMAGE_URL}${data?.order?.video}`
          : ''
      );

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
          quantity: data?.order?.data?.quantity || '',
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
    if (number) {
      if (step === 2) {
        return setStep(3);
      }
      if (step === 3) {
        return router.back();
      }
    }

    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <InstantSearch indexName="supp_tracks" searchClient={searchClient}>
      <>
        <Container>
          <NormalHeader
            hasBack={!!number}
            title={number ? `Захиалга засах ${number}` : 'Захиалга үүсгэх'}
            onPressBack={step === 1 ? undefined : onPressBack}
          />
          {getOrderLoading ? <Loader /> : renderContent()}
        </Container>
        <MessageModal
          type="success"
          message={
            number
              ? 'Захиалга амжилттай шинэчлэгдлээ'
              : 'Захиалга амжилттай үүслээ'
          }
          onClose={() => {
            router.navigate('/profile/orders');
            setSuccessModal(false);
            resetState();
          }}
          visible={successModal}
        />
      </>
    </InstantSearch>
  );
};

export default OrderCreateScreen;
