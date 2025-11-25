import { useEffect, useState } from 'react';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import * as yup from 'yup';

import { Container, MessageModal, NormalHeader } from '@/components';
import { Box } from '@/components/Theme';
import { CreateAddressMutation } from '@/gql/mutations/createAddressMutation.generated';
import { useCreateOrderMutation } from '@/gql/mutations/createOrderMutation.generated';
import { SearchAddressQuery } from '@/gql/query/searchAddressQuery.generated';
import { audioToFile, imagesToFiles, videoToFile } from '@/utils/fileHelpers';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import Step1 from './Step1';
import Step2 from './Step2';
import DeliveryStep3 from './Step3/DeliveryStep3';
import RentStep3 from './Step3/RentStep3';

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
  quantity: yup.string(),
  additionalInfo: yup.string(),
  receiverName: yup.string().required('Энэ талбар хоосон байна!'),
  receiverMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
  senderName: yup.string(),
  senderMobile: yup.string().length(8, 'Буруу дугаар оруулсан байна!'),
});

const rentSchema = yup.object().shape({
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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [successModal, setSuccessModal] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState<string>('');
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
    },
    validationSchema: deliverySchema,
    onSubmit: async () => {
      const imageFiles = images.length > 0 ? imagesToFiles(images) : [];
      const videoFile = video ? videoToFile(video) : null;
      const audioFile = audio ? audioToFile(audio) : null;

      const values = formik.values;

      await createOrder({
        variables: {
          originId: createdOrigin?.id,
          destinationId: createdDestination?.id,
          packageType: values.packageType,
          carType: selectedCarType,
          packageWeight: Number(values.packageWeight),
          travelAt: dayjs(`${values.travelDay} ${values.travelHour}`),
          vatIncluded: values.vatIncluded,
          price: values.priceNegotiable ? undefined : values.price,
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
    },
    validationSchema: deliverySchema,
    onSubmit: async () => {
      const imageFiles = images.length > 0 ? imagesToFiles(images) : [];
      const videoFile = video ? videoToFile(video) : null;
      const audioFile = audio ? audioToFile(audio) : null;

      const values = formik2.values;

      await createOrder({
        variables: {
          originId: createdOrigin?.id,
          carType: selectedCarType,
          carWeight: values.carWeight,
          travelAt: dayjs(`${values.startDate}`),
          vatIncluded: values.vatIncluded,
          price: values.priceNegotiable ? undefined : values.price,
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

      setSuccessModal(true);
    },
  });

  useEffect(() => {
    if (isRent) {
      setSelectedOption('origin');
    }
  }, [isRent]);

  const renderContent = () => {
    if (step === 1) {
      return (
        <AnimatedBox
          entering={SlideInLeft}
          exiting={SlideOutLeft}
          key={1}
          flex={1}
        >
          <Step1 setIsRent={setIsRent} setStep={setStep} />
        </AnimatedBox>
      );
    } else if (step === 2) {
      return (
        <AnimatedBox
          entering={SlideInRight}
          exiting={SlideOutLeft}
          key={2}
          flex={1}
        >
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
            selectedCarType={selectedCarType}
            setSelectedCarType={setSelectedCarType}
          />
        </AnimatedBox>
      );
    } else {
      return (
        <AnimatedBox
          entering={SlideInRight}
          exiting={SlideOutLeft}
          key={3}
          flex={1}
        >
          {!isRent ? (
            <DeliveryStep3
              selectedCarType={selectedCarType}
              setSelectedCarType={setSelectedCarType}
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
              selectedCarType={selectedCarType}
              setSelectedCarType={setSelectedCarType}
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
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Container>
        <NormalHeader
          title="Захиалга үүсгэх"
          onPressBack={step === 1 ? undefined : onPressBack}
        />
        {renderContent()}
      </Container>
      <MessageModal
        type="success"
        message="Захиалга амжилттай үүслээ"
        onClose={() => {
          router.dismissAll();
          router.navigate('/profile/orders');
          setSuccessModal(false);
        }}
        visible={successModal}
      />
    </>
  );
};

export default OrderCreateScreen;
