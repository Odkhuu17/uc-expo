import { useEffect, useState } from 'react';

import {
  BoxContainer,
  Container,
  MessageModal,
  NormalHeader,
  Progress,
  ScrollableContent,
  Warning,
} from '@/components';
import { Box } from '@/components/Theme';
import { useGetUserLazyQuery } from '@/gql/query/getUserQuery.generated';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';
import { RefreshControl } from 'react-native';

const Waiting = () => {
  const [finishedProgress, setFinishedProgress] = useState(false);
  const [getUser, { data, loading }] = useGetUserLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useAppDispatch();

  const onFinishProgress = () => {
    setFinishedProgress(true);
  };

  useEffect(() => {
    if (finishedProgress) {
      init();
    }
  }, [finishedProgress]);

  const init = async () => {
    const { data } = await getUser();

    if (data?.me?.verified) {
      setSuccessModal(true);
    }
  };

  const onCloseSuccessModal = () => {
    setSuccessModal(false);
    dispatch(authSlice.actions.changeUser(data?.me!));
  };

  return (
    <>
      <Container>
        <NormalHeader title="Баталгаажуулалт" />
        <ScrollableContent
          edges={['bottom']}
          refreshControl={
            <RefreshControl onRefresh={getUser} refreshing={loading} />
          }
        >
          <Box flex={1} justifyContent="center">
            <BoxContainer gap="m">
              <Warning description="Таны баталгаажуулалт хүлээгдэж байна" />
              {!data?.me?.verified && (
                <Progress sec={5} onFinish={onFinishProgress} />
              )}
            </BoxContainer>
          </Box>
        </ScrollableContent>
      </Container>
      <MessageModal
        type="success"
        message="Таны баталгаажуулалт амжилттай боллоо!"
        onClose={onCloseSuccessModal}
        visible={successModal}
      />
    </>
  );
};

export default Waiting;
