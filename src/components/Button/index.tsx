import React, { ReactNode } from 'react';
import { useLocation } from 'wouter';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  /**
   * @default "gray"
   */
  variant?: 'gray' | 'red' | 'yellow' | 'blue';

  /**
   * @default "medium"
   */
  size?: 'small' | 'medium';
  href?: string;
}

function ButtonElement({ children, size = 'medium', variant = 'gray', className, ...rest }: ButtonProps) {
  const variantClassName = styles[`variant-${variant}`];

  return (
    <button
      {...rest}
      className={`${styles.button} ${variantClassName} ${className || ''}`.trim()}
      style={{
        width: size === 'medium' ? '150px' : '100px',
        height: size === 'medium' ? '25px' : '20px',
        ...rest.style,
      }}
    >
      {children}
    </button>
  );
}

function Button({ href, ...rest }: ButtonProps) {
  const [, setLocation] = useLocation();

  if (href) {
    rest.onClick = () => setLocation(href);
  }

  return <ButtonElement {...rest} />;
}

export default Button;
