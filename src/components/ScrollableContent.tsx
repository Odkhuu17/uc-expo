import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Box } from './Theme';

interface Props extends ScrollViewProps {
  children: ReactNode;
  edges: Edge[];
  scrollable?: boolean;
  noVSpace?: boolean;
  noHSpace?: boolean;
}

const ScrollableContent = ({
  children,
  edges = [],
  noHSpace,
  noVSpace,
  ...props
}: Props) => {
  return (
    <ScrollView
      style={css.container}
      contentContainerStyle={css.contentContainer}
      {...props}
    >
      <SafeAreaView style={css.container} edges={edges}>
        <Box
          flex={1}
          px={noHSpace ? undefined : 'm'}
          py={noVSpace ? undefined : 'm'}
        >
          <Box flex={1}>{children}</Box>
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ScrollableContent;
