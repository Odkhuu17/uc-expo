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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={css.contentContainer}
      {...props}
    >
      <SafeAreaView style={css.container} edges={edges}>
        <Box
          flex={1}
          px={noHSpace ? undefined : 'm'}
          py={noVSpace ? undefined : 'm'}
        >
          {children}
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

export default ContentScrollable;
