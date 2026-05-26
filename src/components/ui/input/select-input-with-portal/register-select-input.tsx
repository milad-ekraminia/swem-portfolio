import { useEffect, useRef, useState } from 'react';
import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { createPortal } from 'react-dom';
import { FieldValues, Path, useWatch } from 'react-hook-form';
import { useClickOutside } from '@/hooks/useClickOutside';
import './select-input-with-portal';

interface DropDownOption {
  title: string;
  value: number | string;
  id?: number;
}

interface SelectInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  name: TName;
  label?: string;
  required?: boolean;
  options: DropDownOption[];
  disabled?: boolean;
  isLoading?: boolean;
  openDirection?: 'up' | 'down';
  error?: string;
  register: any;
  control: any;
  mainClass?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  defaultValue?: string | number;
}

export default function RegisterSelectInput<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  defaultValue,
  name,
  label,
  required = false,
  options,
  disabled = false,
  isLoading = false,
  openDirection = 'down',
  error,
  register,
  control,
  mainClass,
  placeholder = '',
  suffix,
}: Readonly<SelectInputProps<TFieldValues, TName>>) {
  const contentRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(contentRef, () => setIsOpen(false));

  const watchedValue = useWatch({ control, name });
  const selectedValue = defaultValue || watchedValue;
  const toggleOpen = () => {
    if (!disabled) setIsOpen((o) => !o);
    updateDropdownPosition();
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        // width: `${rect.width}px`,
      });
    }
  };

  const handleSelect = (opt: DropDownOption) => {
    setIsOpen(false);
    register(name).onChange({ target: { name, value: opt.value } });
  };
  useEffect(() => {
    const handleScrollOrResize = () => {
      if (isOpen) updateDropdownPosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <div
      className={`select-input ${mainClass ?? ''} ${
        suffix ? 'has-suffix' : ''
      }`}
    >
      {label && (
        <label className="select-input__label label" htmlFor={name}>
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="select-input__wrapper">
        <button
          ref={buttonRef}
          id={name}
          type="button"
          className={`select-input__select ${!String(selectedValue) ? 'empty' : ''} ${error ? 'error' : ''}`}
          onClick={toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={isLoading || disabled}
        >
          <span>
            {!String(selectedValue)
              ? '-'
              : getTranslatedValue(
                  options?.find((opt: any) => opt.value == selectedValue)
                    ?.title ??
                    placeholder ??
                    'Select',
                )}
          </span>
          <ChevronDownSvg />
        </button>

        {isOpen &&
          createPortal(
            <ul
              ref={contentRef}
              role="listbox"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                position: 'absolute',
                minWidth: '100px',
                maxWidth: '300px',
                overflowY: 'auto',
              }}
              className={`select-input__dropdown ${
                openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'
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
                    {getTranslatedValue(opt.title)}
                    {selectedValue === opt.value && <CheckIconSvg />}
                  </button>
                </li>
              ))}
            </ul>,
            document.body,
          )}

        {suffix && <>{suffix}</>}
      </div>

      {error && <p className="select-input__error">{error}</p>}
    </div>
  );
}
