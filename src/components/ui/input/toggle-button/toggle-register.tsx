import { useWatch } from 'react-hook-form';

export default function ToggleRegister({
  label,
  name,
  register,
  disabled = false,
  hasColorChange = true,
  control,
}: Readonly<{
  name?: string;
  label?: string;
  register: any;
  disabled?: boolean;
  hasColorChange?: boolean;
  control: any;
}>) {
  const isOn = Number(
    useWatch({
      control,
      name: name ?? '',
    }),
  );
  return (
    <div className="toggle-wrapper">
      <label className={`toggle ${isOn ? 'active' : ''} ${hasColorChange && !isOn ? 'color-change' : ''}`}>
        <input
          id={name}
          disabled={disabled}
          type="checkbox"
          {...register(name)}
        />
        <span className="toggle__slider"></span>
        {label && <span className="toggle__label">{label}</span>}
      </label>
    </div>
  );
}
