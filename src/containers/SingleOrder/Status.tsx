import { Button } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { GetOrdersQuery } from '@/gql/queries/getOrders.generated';
import { INavigation } from '@/navigations';
import { useAppSelector } from '@/redux/hooks';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: NonNullable<GetOrdersQuery['orders']>['edges'][0]['node'];
}

const Status = ({ item }: Props) => {
  const theme = useTheme();
  const { mode } = useAppSelector(state => state.general);
  const navigation = useNavigation<INavigation>();

  const onPressEdit = () => {};

  return (
    <Box
      p="xs"
      px="m"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={item?.status === 'pending' ? 'primary' : 'grey4'}
    >
      <Text variant="label" color="white">
        {item?.status === 'pending' ? 'Идэвхтэй' : 'Идэвхгүй'}
      </Text>
      {mode === 'shipper' && item?.my && item?.status === 'pending' ? (
        <Button
          title="Засах"
          color="secondary"
          size="s"
          onPress={onPressEdit}
        />
      ) : (
        <Box height={theme.button.s} />
      )}
    </Box>
  );
};

export default Status;
