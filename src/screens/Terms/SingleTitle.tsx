import { Text } from '@/components/Theme';

interface Props {
  title: string;
}

const SingleTitle = ({ title }: Props) => {
  return <Text variant="title">{title}</Text>;
};

export default SingleTitle;
