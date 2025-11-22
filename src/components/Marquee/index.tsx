import React, { ReactNode, useState } from 'react';

import { Box } from '../Theme';
import ChildrenScroller from './ChildrenScroller';
import MeasureElement from './MeasureElement';

interface Props {
  children: ReactNode;
  duration?: number;
}

const Marquee = ({ duration = 2000, children }: Props) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);

  return (
    <Box
      onLayout={ev => {
        setParentWidth(ev.nativeEvent.layout.width);
      }}
      pointerEvents="box-none"
    >
      <Box flexDirection="row" overflow="hidden" pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
          >
            {children}
          </ChildrenScroller>
        )}
      </Box>
    </Box>
  );
};

export default Marquee;
