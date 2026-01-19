import { Text } from '@/components/Theme';

interface Props {
  text: string;
}

const NormalText = ({ text }: Props) => {
  return <Text variant='body2'>{text}</Text>;
};

export default NormalText;
