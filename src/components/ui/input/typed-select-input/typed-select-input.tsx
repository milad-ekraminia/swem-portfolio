import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, Path, useWatch } from 'react-hook-form';

interface DropDownOption {
  title: string;
  value: number | string;
  id?: number;
}

interface TypedSelectInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  typeName: TName;
  valueName: TName;
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

export default function TypedSelectInput<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  defaultValue,
  typeName,
  valueName,
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
}: Readonly<TypedSelectInputProps<TFieldValues, TName>>) {
  // Value and type state
  const handleIncrease = () => {
    const newValue = Number(selectedValue) + 1;
    register(valueName).onChange({
      target: {
        name: valueName,
        value: newValue,
      },
    });
  };

  const handleDecrease = () => {
    const newValue = Number(selectedValue) - 1;
    register(valueName).onChange({
      target: {
        name: valueName,
        value: newValue,
      },
    });
  };

  const contentRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(contentRef, () => setIsOpen(false));

  const watchedValue = useWatch({ control, name: valueName });
  const selectedValue = defaultValue ?? watchedValue;

  const watchedType = useWatch({ control, name: typeName });
  const selectedType = defaultValue ?? watchedType;

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
      });
    }
  };

  const handleSelect = (opt: DropDownOption) => {
    setIsOpen(false);

    register(typeName).onChange({
      target: { name: typeName, value: opt.value },
    });
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
      className={`typed-select-input ${mainClass ?? ''} ${suffix ? 'has-suffix' : ''
        }`}
    >
      {label && (
        <label className="typed-select-input__label label" htmlFor={valueName}>
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="typed-select-input__wrapper">
        {/* Value input */}
        <input
          type="number"
          disabled={isLoading || disabled}
          className="typed-select-input__input"
          placeholder={placeholder || '-'}
          id={valueName}
          {...register(valueName)}
          value={selectedValue}
        />

        {/* Chevron buttons */}
        <div className="typed-select-input__buttons">
          <button
            type="button"
            onClick={handleIncrease}
            disabled={isLoading || disabled}
          >
            <ChevronUp stroke="#344054" size={20} />
          </button>
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isLoading || disabled}
          >
            <ChevronDown stroke="#344054" size={20} />
          </button>
        </div>

        {/* Type dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="typed-select-input__select"
            onClick={toggleOpen}
            ref={buttonRef}
            disabled={isLoading || disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            style={{ minWidth: '80px' }}
          >
            <span>
              {getTranslatedValue(
                options?.find((opt: any) => opt.value == selectedType)?.title ??
                'Type',
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
                className={`typed-select-input__dropdown ${openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'
                  }`}
              >
                {options.map((opt) => (
                  <li className="dropdown-item" key={opt.value} role="option">
                    <button
                      type="button"
                      className={getClassNames('dropdown-option', [
                        [
                          selectedValue === opt.value,
                          'dropdown-option-selected',
                        ],
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
        </div>

        {suffix && <>{suffix}</>}
      </div>

      {error && <p className="typed-select-input__error">{error}</p>}
    </div>
  );
}
