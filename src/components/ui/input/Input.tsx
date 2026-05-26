import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  placeholder,
  disabled = false,
  onChange = () => { },
  ...props
}) => {
  return (
    <div className="main-input">
      {label && <label htmlFor={props.id ?? props.name}>{label}</label>}
      <div className="main-input__wrapper">
        {leftIcon && (
          <span className="input-icon input-icon-left">{leftIcon}</span>
        )}
        <input
          onChange={(e) => {
            onChange(e);
          }}
          {...props}
          placeholder={placeholder}
          className={`input ${error ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''
            } ${rightIcon ? 'input-with-right-icon' : ''}`}
          disabled={disabled}
        />
        {rightIcon && (
          <span className="input-icon input-icon-right">{rightIcon}</span>
        )}
      </div>
      {error && <span className="main-input__error-message">{error}</span>}
    </div>
  );
};
