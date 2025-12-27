import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
  onLayout: (width: number) => void;
  children: ReactNode;
}

const MeasureElement = ({ onLayout, children }: Props) => {
  return (
    <Animated.ScrollView
      horizontal
      style={css.container}
      pointerEvents="box-none"
    >
      <View onLayout={ev => onLayout(ev.nativeEvent.layout.width)}>
        {children}
      </View>
    </Animated.ScrollView>
  );
};

const css = StyleSheet.create({
  container: { opacity: 0, zIndex: -1 },
});

export default MeasureElement;
