import { EyeSvg } from '@/assets/icons/eye-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { EyeOff, FunnelIcon } from 'lucide-react';
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
  buttonText?: string; // 👈 static button text
  buttonType?: 'submit' | 'button'; // 👈 static button text
  onButtonClick?: () => void; // 👈 static button click handler
}

export const RegisterInputWithButton: React.FC<InputProps> = ({
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
  buttonText = 'Button',
  onButtonClick,
  buttonType = 'button',
  ...props
}) => {
  return (
    <div className={`main-input with-button ${mainClass ?? ''}`}>
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="main-input__wrapper has-inline-button">
        {leftIcon && (
          <span className="input-icon input-icon-left">{leftIcon}</span>
        )}

        {textarea ? (
          <textarea
            {...register(name)}
            {...props}
            placeholder={placeholder ?? '-'}
            id={name}
            className={`input ${error ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''
              } ${rightIcon ? 'input-with-right-icon' : ''}`}
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
            className={`input ${error ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''
              } ${rightIcon ? 'input-with-right-icon' : ''}`}
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

        {/* 👇 Always visible button */}
        <button
          type={buttonType}
          className="inline-input-btn"
          onClick={onButtonClick}
        >
          <FunnelIcon size={19} />
          {getTranslatedValue(buttonText)}
        </button>
      </div>

      {error && <span className="main-input__error-message">{error}</span>}
    </div>
  );
};
