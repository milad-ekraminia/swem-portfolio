import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?:
  | 'primary'
  | 'secondary-blue'
  | 'secondary'
  | 'tertiary'
  | 'full'
  | 'danger'
  | 'danger-outline'
  | 'rounded'
  | 'destructive-secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  leftIcon,
  rightIcon,
  onClick,
  disabled,
  variant = 'primary',
  className,
  ...props
}, ref) => {
  const hasText =
    typeof children === 'string' || React.isValidElement(children);

  return (
    <button
      ref={ref}
      className={`custom-button custom-button-${variant} ${disabled ? 'disabled' : ''
        } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="icon">{leftIcon}</span>}
      {hasText && <span className="label">{children}</span>}
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
