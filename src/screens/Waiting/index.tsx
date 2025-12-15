import { Warning } from '@/components';
import { Box } from '@/components/Theme';

const Waiting = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Warning description="Таны баталгаажуулалт хүлээгдэж байна" />
    </Box>
  );
};

export default Waiting;
