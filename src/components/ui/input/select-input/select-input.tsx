import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useEffect, useRef, useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface DropDownOption {
  displayName: string;
  value: number | string;
  id?: number;
}

interface SelectInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  name: TName;
  label?: string;
  placeholder?: string;
  options: DropDownOption[];
  disabled?: boolean;
  openDirection?: 'up' | 'down';
  field?: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  value?: TFieldValues[TName];
  onChange?: (val: TFieldValues[TName]) => void;
}

export default function SelectInput<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  name,
  label,
  placeholder = '',
  options,
  disabled,
  openDirection = 'down',
  field,
  error,
  value,
  onChange,
}: SelectInputProps<TFieldValues, TName>) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // RHF-controlled takes priority over simple mode
  const selectedValue = field?.value ?? value;

  const toggleOpen = () => {
    if (!disabled) setIsOpen((o) => !o);
  };

  const notifyChange = (val: any) => {
    if (field) field.onChange(val);
    if (onChange) onChange(val);
  };

  const handleSelect = (opt: DropDownOption) => {
    setIsOpen(false);
    notifyChange(opt.value as TFieldValues[TName]);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);
  const rawValue = selectedValue
    ? options.find((o) => o.value === selectedValue)?.displayName
    : placeholder;
  return (
    <div className="select-input" ref={selectRef}>
      {label && (
        <label className="select-input__label" htmlFor={name}>
          {label}
        </label>
      )}
      <button
        id={name}
        type="button"
        className={getClassNames('select-input__select', [
          [!selectedValue, 'placeholder'],
        ])}
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        {/* {selectedValue
          ? options.find((o) => o.value === selectedValue)?.displayName
          : placeholder} */}
        {getTranslatedValue(rawValue ?? '')}
        <ChevronDownSvg />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={`select-input__dropdown ${openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'
            }`}
        >
          {options.map((opt) => (
            <li className="dropdown-item" key={opt.value} role="option">
              <button
                type="button"
                className={getClassNames('dropdown-option', [
                  [selectedValue === opt.value, 'dropdown-option-selected'],
                ])}
                onClick={() => handleSelect(opt)}
              >
                {getTranslatedValue(opt.displayName)}
                {selectedValue === opt.value && <CheckIconSvg />}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="select-input__error">{error}</p>}
    </div>
  );
}
