import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Box } from './Theme';

interface Props {
  children: ReactNode;
  edges: Edge[];
  scrollable?: boolean;
  noVSpace?: boolean;
  noHSpace?: boolean;
}

const Content = ({
  children,
  edges = [],
  scrollable,
  noHSpace,
  noVSpace,
}: Props) => {
  const renderContent = () => {
    return (
      <Box
        flex={1}
        px={noHSpace ? undefined : 'm'}
        py={noVSpace ? undefined : 'm'}
      >
        <Box flex={1}>{children}</Box>
      </Box>
    );
  };

  const renderContainer = () => {
    return edges.length > 0 ? (
      <SafeAreaView style={css.container} edges={edges}>
        {renderContent()}
      </SafeAreaView>
    ) : (
      renderContent()
    );
  };

  return scrollable ? (
    <ScrollView
      style={css.container}
      contentContainerStyle={css.contentContainer}
    >
      {renderContainer()}
    </ScrollView>
  ) : (
    renderContainer()
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

export default Content;
