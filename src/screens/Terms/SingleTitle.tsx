import { Text } from '@/components/Theme';

interface Props {
  title: string;
}

const SingleTitle = ({ title }: Props) => {
  return <Text fontFamily="Roboto_500Medium">{title}</Text>;
};

export default SingleTitle;
