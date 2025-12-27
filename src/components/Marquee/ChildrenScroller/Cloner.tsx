import React, { ReactNode } from 'react';

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

const Cloner = ({
  count,
  renderChild,
}: {
  count: number;
  renderChild: (index: number) => ReactNode;
}) => <>{getIndicesArray(count).map(renderChild)}</>;

export default Cloner;
