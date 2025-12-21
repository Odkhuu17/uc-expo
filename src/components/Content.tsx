import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Box } from './Theme';

interface Props {
  children: ReactNode;
  edges: Edge[];
  noVSpace?: boolean;
  noHSpace?: boolean;
}

const Content = ({ children, edges = [], noHSpace, noVSpace }: Props) => {
  return (
    <SafeAreaView style={css.container} edges={edges}>
      <Box
        flex={1}
        px={noHSpace ? undefined : 'm'}
        py={noVSpace ? undefined : 'm'}
      >
        {children}
      </Box>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Content;
