import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-core';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as yup from 'yup';

import { Container, Loader, ModalMsg, HeaderNormal } from '@/components';
import { Box } from '@/components/Theme';
import { isRentOrder } from '@/utils/helpers';
import Step1 from './Step1';
import Step2 from './Step2';
import DeliveryStep3 from './Step3/DeliveryStep3';
import RentStep3 from './Step3/RentStep3';
import { INavigationProps } from '@/navigations';
import { AddressCreateMutation } from '@/gql/mutations/addressCreate.generated';
import { useOrderCreateMutation } from '@/gql/mutations/orderCreate.generated';
import { useOrderUpdateMutation } from '@/gql/mutations/orderUpdate.generated';
import { useGetOrderDetailQuery } from '@/gql/queries/getOrderDetail.generated';
import { useGetTaxonsQuery } from '@/gql/queries/getTaxons.generated';
import { GetOrdersDocument } from '@/gql/queries/getOrders.generated';
import { GetOrdersMyDocument } from '@/gql/queries/getOrdersMy.generated';
import { SearchAddressQuery } from '@/gql/queries/searchAddressQuery.generated';
import { ImageObject } from '@/gql/graphql';

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
  additionalInfo: yup.string().required('Энэ талбар хоосон байна!'),
  receiverName: yup.string().required('Энэ талбар хоосон байна!'),
  receiverMobile: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .length(8, 'Буруу дугаар оруулсан байна!'),
  senderName: yup.string(),
  senderMobile: yup
    .string()
    .required('Энэ талбар хоосон байна!')
    .length(8, 'Буруу дугаар оруулсан байна!'),
  additionalAddressOrigin: yup.string().required('Энэ талбар хоосон байна!'),
  additionalAddressDestination: yup
    .string()
    .required('Энэ талбар хоосон байна!'),
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
  additionalAddress: yup.string().required('Энэ талбар хоосон байна!'),
});

interface Props {
  navigation: INavigationProps<'OrderCreateOrEdit'>['navigation'];
  route: INavigationProps<'OrderCreateOrEdit'>['route'];
}

const OrderCreate = ({ navigation, route }: Props) => {
  const { number } = route.params;
  const [orderNumber, setOrderNumber] = useState<string | null>(number || null);
  const [step, setStep] = useState(number ? 3 : 1);
  const [successModal, setSuccessModal] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
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
    AddressCreateMutation['createAddress']
  > | null>(null);
  const [createdDestination, setCreatedDestination] = useState<NonNullable<
    AddressCreateMutation['createAddress']
  > | null>(null);
  const { data: taxonsData } = useGetTaxonsQuery();

  const [createOrder, { data: createOrderData }] = useOrderCreateMutation();
  const [updateOrder] = useOrderUpdateMutation();

  const { data, loading: getOrderLoading } = useGetOrderDetailQuery({
    variables: { number: String(number) },
    skip: !number,
  });

  const deliveryFormik = useFormik({
    initialValues: {
      packageType: '',
      packageWeight: '',
      travelDay: dayjs().format('YYYY-MM-DD'),
      travelHour: dayjs().format('HH:mm'),
      vatIncluded: false,
      priceNegotiable: false,
      price: '',
      additionalAddressOrigin: '',
      additionalAddressDestination: '',
      additionalInfo: '',
      receiverName: '',
      receiverMobile: '',
      senderName: '',
      senderMobile: '',
      carType: '',
      taxonId: '',
    },
    validationSchema: deliverySchema,
    onSubmit: async () => {
      const values = deliveryFormik.values;

      if (orderNumber) {
        await updateOrder({
          variables: {
            input: {
              id: createOrderData?.createOrder?.id || data?.order?.id!,
              taxonId: values.taxonId,
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
                additionalAddressOrigin: values.additionalAddressOrigin,
                additionalAddressDestination:
                  values.additionalAddressDestination,
              },
              receiverName: values.receiverName,
              receiverMobile: values.receiverMobile,
              senderName: values.senderName,
              senderMobile: values.senderMobile,
              published: true,
            },
          },
          refetchQueries: [
            {
              query: GetOrdersDocument,
              variables: { first: 10 },
            },
            {
              query: GetOrdersMyDocument,
              variables: { ordersFirst: 10 },
            },
          ],
        });
      }
      setSuccessModal(true);
    },
  });

  const rentFormik = useFormik({
    initialValues: {
      carWeight: '',
      startDate: dayjs().format('YYYY-MM-DD'),
      rentDay: '',
      motHour: '',
      vatIncluded: false,
      priceNegotiable: false,
      price: '',
      additionalInfo: '',
      additionalAddress: '',
      carType: '',
      taxonId: '',
    },
    validationSchema: rentSchema,
    onSubmit: async () => {
      const values = rentFormik.values;

      if (orderNumber) {
        await updateOrder({
          variables: {
            input: {
              taxonId: values.taxonId,
              id: createOrderData?.createOrder?.id || data?.order?.id!,
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
              published: true,
            },
          },
          refetchQueries: [
            {
              query: GetOrdersDocument,
              variables: { first: 10 },
            },
            {
              query: GetOrdersMyDocument,
              variables: { ordersFirst: 10 },
            },
          ],
        });
      }
      setSuccessModal(true);
    },
  });

  useEffect(() => {
    initOrder();
  }, [orderNumber, step, taxonsData]);

  const initOrder = async () => {
    if (!orderNumber && step === 3 && taxonsData) {
      const taxon = isRent
        ? taxonsData.taxons?.edges.find(t => t?.node?.code === 'rent')
        : taxonsData.taxons?.edges.find(t => t?.node?.code === 'delivery');

      const { data } = await createOrder({
        variables: {
          taxonId: taxon?.node?.id || '',
        },
      });

      setOrderNumber(data?.createOrder?.number || null);
    }
  };

  useEffect(() => {
    if (isRent) {
      setSelectedOption('origin');
    }
  }, [isRent]);

  useEffect(() => {
    if (data) {
      const isRentO = isRentOrder(data?.order?.carType);

      setIsRent(isRentO);
      setCreatedOrigin(data?.order?.origin || null);
      setCreatedDestination(data?.order?.destination || null);
      setImageObjects(data?.order?.imageObjects || []);
      setVideo(data?.order?.video || null);
      setAudio(data?.order?.audio || null);

      if (isRentO) {
        rentFormik.setValues({
          taxonId: data?.order?.taxonId || '',
          carType: data?.order?.carType || '',
          carWeight: data?.order?.carWeight || '',
          startDate: data?.order?.travelAt
            ? dayjs(data?.order?.travelAt).format('YYYY-MM-DD')
            : '',
          rentDay: data?.order?.data?.rent_day || '',
          motHour: data?.order?.data?.mot_hour || '',
          vatIncluded: data?.order?.vatIncluded || false,
          priceNegotiable: data?.order?.price ? false : true,
          price: String(data?.order?.price || ''),
          additionalInfo: data?.order?.data?.additional_info || '',
          additionalAddress: data?.order?.data?.additional_address || '',
        });
      } else {
        deliveryFormik.setValues({
          taxonId: data?.order?.taxonId || '',
          packageType: data?.order?.packageType || '',
          packageWeight: data?.order?.packageWeight || '',
          travelDay: data?.order?.travelAt
            ? dayjs(data?.order?.travelAt).format('YYYY-MM-DD')
            : '',
          travelHour: data?.order?.travelAt
            ? dayjs(data?.order?.travelAt).format('HH:mm')
            : '',
          vatIncluded: data?.order?.vatIncluded || false,
          priceNegotiable: data?.order?.price ? false : true,
          price: String(data?.order?.price || ''),
          additionalInfo: data?.order?.data?.additional_info || '',
          receiverName: data?.order?.receiverName || '',
          receiverMobile: data?.order?.receiverMobile || '',
          senderName: data?.order?.senderName || '',
          senderMobile: data?.order?.senderMobile || '',
          carType: data?.order?.carType || '',
          additionalAddressOrigin:
            data?.order?.data?.additional_address_origin || '',
          additionalAddressDestination:
            data?.order?.data?.additional_address_destination || '',
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
            setStep={setStep}
            isRent={isRent}
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
          />
        </AnimatedBox>
      );
    } else {
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} key={3} flex={1}>
          {isRent ? (
            <RentStep3
              orderNumber={orderNumber!}
              setSelectedLocation={setSelectedOption}
              createdOrigin={createdOrigin}
              createdDestination={createdDestination}
              formik={rentFormik}
              setStep={setStep}
              number={number}
              setImageObjects={setImageObjects}
              imageObjects={imageObjects}
              video={video}
              setVideo={setVideo}
              audio={audio}
              setAudio={setAudio}
              taxonsData={taxonsData?.taxons}
            />
          ) : (
            <DeliveryStep3
              orderNumber={orderNumber!}
              setSelectedLocation={setSelectedOption}
              createdOrigin={createdOrigin}
              createdDestination={createdDestination}
              formik={deliveryFormik}
              setStep={setStep}
              number={number}
              setImageObjects={setImageObjects}
              imageObjects={imageObjects}
              video={video}
              setVideo={setVideo}
              audio={audio}
              setAudio={setAudio}
              taxonsData={taxonsData?.taxons}
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
  );
};

export default OrderCreate;
