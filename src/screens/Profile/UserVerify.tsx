import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { Button, Progress, Warning } from '@/components';
import { GetMeQuery } from '@/gql/queries/getMe.generated';
import { INavigation } from '@/navigations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

interface Props {
  userData: GetMeQuery['me'];
  refetch: () => Promise<any>;
}

const UserVerify = ({ userData, refetch }: Props) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.general);
  const navigation = useNavigation<INavigation>();
  const [hasPendingUserVerification, setHasPendingUserVerification] =
    useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(authSlice.actions.changeUser(userData));
      if (userData.verifications?.edges?.[0]?.node?.status === 'pending') {
        setHasPendingUserVerification(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData && hasPendingUserVerification) {
      if (userData?.verified) {
        setHasPendingUserVerification(false);
        return navigation.navigate('MsgModal', {
          type: 'success',
          msg: 'Таны бүртгэл амжилттай баталгаажлаа.',
        });
      }
    }
  }, [userData, hasPendingUserVerification]);

  const onPressVerification = () => {
    navigation.navigate('DriverVerify');
  };

  if (!userData?.verified && mode === 'driver') {
    return (
      <>
        {userData?.verifications?.edges?.[0]?.node?.status === 'pending' ? (
          <Progress sec={20} onFinish={refetch} />
        ) : (
          <Warning description="Таны бүртгэл баталгаажаагүй байна! Та бүртгэлээ баталгаажуулсны дараа манай системийг ашиглах боломжтой." />
        )}
        {userData?.verifications?.edges?.[0]?.node?.field5 && (
          <Warning
            type="error"
            description={userData?.verifications?.edges?.[0]?.node?.field5}
          />
        )}
        {userData?.verifications?.edges?.[0]?.node?.status !== 'pending' && (
          <Button
            title="Бүртгэл баталгаажуулах"
            onPress={onPressVerification}
          />
        )}
      </>
    );
  }

  return null;
};

export default UserVerify;
