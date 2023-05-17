import React, { CSSProperties, ReactNode } from 'react';

interface StackProps {
  children: ReactNode;
  className?: string;
  alignItems?: CSSProperties['alignItems'];
  /** @default 'column' */
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  justifyContent?: CSSProperties['justifyContent'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  onClick?: () => void;
}

function Stack({
  children,
  alignItems,
  className,
  direction = 'column',
  gap,
  width,
  height,
  justifyContent,
  onClick,
}: StackProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems,
        flexDirection: direction,
        gap,
        justifyContent,
        width,
        height,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Stack;
