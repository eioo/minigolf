import React, { CSSProperties, ReactNode } from 'react';

interface StackProps {
  children: ReactNode;
  alignItems?: CSSProperties['alignItems'];
  /** @default 'column' */
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  justifyContent?: CSSProperties['justifyContent'];
  width?: CSSProperties['width'];
}

function Stack({ children, alignItems, direction = 'column', gap, width, justifyContent }: StackProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems,
        flexDirection: direction,
        gap,
        justifyContent,
        width,
      }}
    >
      {children}
    </div>
  );
}

export default Stack;
