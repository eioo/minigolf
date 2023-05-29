import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useLocation } from 'wouter';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  style?: CSSProperties;
}

function ButtonElement({ children, size = 'medium', variant = 'gray', className, ...rest }: ButtonProps) {
  const variantClassName = styles[`variant-${variant}`];

  return (
    <button
      {...rest}
      className={`${styles.button} ${variantClassName} ${className || ''}`.trim()}
      style={{
        width: size === 'medium' ? '150px' : '100px',
        height: size === 'medium' ? '25px' : '21px',
        ...rest.style,
      }}
    >
      {children}
    </button>
  );
}

function Button({ href, onClick, ...rest }: ButtonProps) {
  const [, setLocation] = useLocation();

  return (
    <ButtonElement
      onClick={(evt) => {
        if (href) {
          setLocation(href);
        }
        onClick?.(evt);
      }}
      {...rest}
    />
  );
}

export default Button;
