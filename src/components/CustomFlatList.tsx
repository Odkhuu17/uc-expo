import { FlatList, FlatListProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from './Loader';
import { makeStyles, useTheme } from './Theme';

interface Props extends FlatListProps<any> {
  loading?: boolean;
}

const useStyles = makeStyles(theme => ({
  listContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    gap: theme.spacing.m,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
}));

const CustomFlatList = ({ loading, ...props }: Props) => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const keyExtractor = (item: any, index: number) => {
    return item?.id || index;
  };

  const data = props.data || [];

  return (
    <FlatList
      keyExtractor={keyExtractor}
      contentContainerStyle={[
        styles.listContainer,
        { paddingBottom: insets.bottom + theme.spacing.m },
        data.length === 0 && styles.emptyContainer,
      ]}
      {...props}
      ListEmptyComponent={loading ? <Loader /> : props.ListEmptyComponent}
      onEndReachedThreshold={0.5}
    />
  );
};

export default CustomFlatList;
