import { Container, Content, NormalHeader, Warning } from '@/components';
import { Box } from '@/components/Theme';

const Waiting = () => {
  return (
    <Container>
      <NormalHeader title="Баталгаажуулалт" noMenu />
      <Content edges={['bottom']}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Warning description="Таны баталгаажуулалт хүлээгдэж байна" />
        </Box>
      </Content>
    </Container>
  );
};

export default Waiting;
