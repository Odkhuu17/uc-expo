import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Box } from './Theme';

interface Props extends ScrollViewProps {
  children: ReactNode;
  edges: Edge[];
  noVSpace?: boolean;
  noHSpace?: boolean;
}

const ContentScrollable = ({
  children,
  edges = [],
  noHSpace,
  noVSpace,
  ...props
}: Props) => {
  return (
    <SafeAreaView style={css.container} edges={edges}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={css.contentContainer}
        {...props}
      >
        <Box
          flex={1}
          px={noHSpace ? undefined : 'm'}
          py={noVSpace ? undefined : 'm'}
        >
          {children}
        </Box>
      </ScrollView>
    </SafeAreaView>
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

export default ContentScrollable;
