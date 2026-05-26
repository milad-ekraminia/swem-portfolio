import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  register: any;
  name: string;
  mainClass?: string;
  step?: string;
  setValue: any;
}

export const DecimalInput: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  disabled = false,
  register,
  name,
  mainClass,
  step = '0.001',
  setValue,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setValue(name, '');
      return;
    }
    setValue(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setValue(name, '');
      return;
    }

    const number = parseFloat(value);
    if (!isNaN(number)) {
      setValue(name, number.toFixed(step.split('.')[1]?.length));
    }
  };

  return (
    <div className={`main-input ${mainClass ?? ''}`}>
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {props.required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="main-input__wrapper">
        <input
          {...register(name, {
            onChange: handleChange,
            onBlur: handleBlur,
          })}
          {...props}
          step={step}
          autoComplete="off"
          type="number"
          placeholder={placeholder}
          className={`input ${error ? 'input-error' : ''}`}
          disabled={disabled}
        />
      </div>
      {error && <span className="main-input__error-message">{error}</span>}
    </div>
  );
};
