import { EyeSvg } from '@/assets/icons/eye-svg';
import { EyeOff } from 'lucide-react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  register: any;
  name: string;
  mainClass?: string;
  textarea?: boolean;
  checkShowPasswordHandler?: () => void;
  required?: any;
  suffix?: React.ReactNode;
}

export const RegisterInput: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  placeholder,
  disabled = false,
  register,
  name,
  textarea,
  mainClass,
  checkShowPasswordHandler,
  required,
  suffix,
  ...props
}) => {
  return (
    <div className={`main-input `}>
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className={`main-input__wrapper ${suffix ? 'has-suffix' : ''}`}>
        {leftIcon && (
          <span className="input-icon input-icon-left">{leftIcon}</span>
        )}
        {textarea ? (
          <textarea
            {...register(name)}
            {...props}
            placeholder={placeholder ?? '-'}
            id={name}
            className={`${props?.type === 'color' ? 'color-picker' : ''} input ${error ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''
              } ${rightIcon ? 'input-with-right-icon' : ''} ${name === 'password' && checkShowPasswordHandler
                ? 'input-with-right-icon'
                : ''
              } ${mainClass ?? ''} `}
            disabled={disabled}
            autoComplete="off"
          />
        ) : (
          <input
            {...register(name)}
            {...props}
            id={name}
            autoComplete="off"
            placeholder={placeholder ?? '-'}
            className={`${props?.type === 'color' ? 'color-picker' : ''} input ${error ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''
              } ${rightIcon ? 'input-with-right-icon' : ''} ${name === 'password' && checkShowPasswordHandler
                ? 'input-with-right-icon'
                : ''
              }`}
            disabled={disabled}
          />
        )}

        {rightIcon && (
          <span className="input-icon input-icon-right">{rightIcon}</span>
        )}

        {name === 'password' && checkShowPasswordHandler && (
          <span className="input-eye-icon" onClick={checkShowPasswordHandler}>
            {props?.type === 'password' ? (
              <EyeSvg />
            ) : (
              <EyeOff color="#98A2B3" size={16} />
            )}
          </span>
        )}

        {suffix && <>{suffix}</>}
      </div>
      {error && <span className="main-input__error-message">{error}</span>}
    </div>
  );
};
