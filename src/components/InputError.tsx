import { Text } from './Theme';

interface Props {
  error: string;
}

const InputError = ({ error }: Props) => {
  return (
    <Text color="error" mt="xs" variant="error">
      {error}
    </Text>
  );
};

export default InputError;
