import { ReactNode } from 'react';

import { FitImage } from '@/components';
import { Box } from '@/components/Theme';

interface Props {
  img: number;
  children: ReactNode;
}

const SingleButton = ({ img, children }: Props) => {
  return (
    <Box alignItems="center">
      <FitImage source={img} height={150} />
      {children}
    </Box>
  );
};

export default SingleButton;
