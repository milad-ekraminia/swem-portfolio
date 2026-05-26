import { MinusSvg } from '@/assets/icons/minus-svg';
import { TikSvg } from '@/assets/icons/tik-svg';
import React from 'react';

interface SharedCheckboxProps {
  name?: string;
  label?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  status?: 'semi' | 'active' | 'deactive';
  onClick?: (e: any) => void;
}

export const Checkbox: React.FC<SharedCheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  status = 'active',
  onClick,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="custom-checkbox">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onClick={onClick}
        disabled={disabled}
      />
      <span>{status == 'semi' ? <MinusSvg /> : <TikSvg />}</span>
      {label}
    </label>
  );
};
