import { UseFormRegisterReturn } from 'react-hook-form';

interface ToggleProps {
  register: UseFormRegisterReturn;
  disabled?: boolean;
  hasColorChange?: boolean;
  isChecked?: boolean; // Optional, used for class control
  label?: string;
}

const RegisterToggler = ({
  register,
  disabled = false,
  hasColorChange = false,
  isChecked = false,
  label = '',
}: ToggleProps) => {
  return (
    <div className="register-toggler">
      <label
        className={`toggle ${isChecked ? 'active' : ''} ${hasColorChange && !isChecked ? 'color-change' : ''
          }`}
      >
        <input type="checkbox" {...register} disabled={disabled} />
        <span className="toggle__slider"></span>
      </label>
      {label ? <span></span> : null}
    </div>
  );
};

export default RegisterToggler;
