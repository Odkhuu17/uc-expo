import React, { ReactNode } from 'react';
import { useFrameCallback, useSharedValue } from 'react-native-reanimated';

import Cloner from './Cloner';
import TranslatedElement from './TranslatedElement';

interface Props {
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  children: ReactNode;
}

const ChildrenScroller = ({
  duration,
  childrenWidth,
  parentWidth,
  children,
}: Props) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(1);

  useFrameCallback(i => {
    offset.value +=
      (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) /
      duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index: number) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}
    >
      {children}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

export default ChildrenScroller;
