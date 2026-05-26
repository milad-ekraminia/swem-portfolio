import { useId } from 'react';

interface ToggleProps {
  isOn: boolean;
  hasColorChange?: boolean;
  setIsOn: (isOn: boolean) => void;
  label?: string;
}

const Toggle = ({
  isOn,
  hasColorChange = true,
  setIsOn,
  label,
}: ToggleProps) => {
  const id = useId();

  return (
    <label htmlFor={id} className="toggle-wrapper">
      <div
        className={`toggle ${isOn ? 'active' : ''} ${hasColorChange && !isOn ? 'color-change' : ''
          }`}
      >
        <input
          type="checkbox"
          id={id}
          checked={isOn}
          onChange={() => setIsOn(!isOn)}
        />
        <span className="toggle__slider"></span>
      </div>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
};

export default Toggle;
