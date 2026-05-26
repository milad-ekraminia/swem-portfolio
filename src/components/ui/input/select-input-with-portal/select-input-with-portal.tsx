import { useEffect, useRef, useState } from 'react';
import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ReactDOM from 'react-dom';

interface DropDownOption {
  displayName: string;
  value: number | string;
  id?: number | string;
}

interface SelectInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: DropDownOption[];
  disabled?: boolean;
  portalClassName?: string;
  openDirection?: 'up' | 'down';
  value?: string | number;
  onChange?: (val: string | number) => void;
  error?: string;
}

export default function SelectInputPortal({
  name,
  label,
  placeholder = '',
  options,
  disabled,
  openDirection = 'down',
  value,
  portalClassName,
  onChange,
  error,
}: SelectInputProps) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const toggleOpen = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (opt: DropDownOption) => {
    setIsOpen(false);
    onChange?.(opt.value);
  };

  const updateDropdownPosition = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const top =
        openDirection === 'down'
          ? rect.bottom + window.scrollY
          : rect.top + window.scrollY - rect.height; // adjust for "up"
      setDropdownPosition({
        top,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen, openDirection]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        !document
          .getElementById('select-input-portal-dropdown')
          ?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      updateDropdownPosition();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen]);

  const selectedOption = options.find((o) => o.value === value);
  const rawValue = selectedOption?.displayName || placeholder;

  return (
    <>
      <div className="select-input with-portal" ref={selectRef}>
        {label && (
          <label className="select-input__label" htmlFor={name}>
            {label}
          </label>
        )}
        <button
          id={name}
          type="button"
          className={getClassNames('select-input__select', [
            [!value, 'empty'],
            [!!error, 'error'],
          ])}
          onClick={toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          <span>{getTranslatedValue(rawValue)}</span>
          <ChevronDownSvg />
        </button>
        {error && <p className="select-input__error">{error}</p>}
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <ul
            id="select-input-portal-dropdown"
            role="listbox"
            className={`select-input__dropdown ${openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'
              } ${portalClassName ? portalClassName : ""}`}
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 9999,
              margin: 0,
              padding: 0,
              listStyle: 'none',
              background: 'white', // ensure background for clicks
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              borderRadius: 4,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {options.map((opt) => (
              <li
                className="dropdown-item"
                key={opt.id ?? opt.value}
                role="option"
                aria-selected={value === opt.value}
                tabIndex={-1}
              >
                <button
                  type="button"
                  className={getClassNames('dropdown-option', [
                    [value === opt.value, 'dropdown-option-selected'],
                  ])}
                  onClick={() => handleSelect(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    background: value === opt.value ? '#e6f7ff' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {getTranslatedValue(opt.displayName)}
                  {value === opt.value && <CheckIconSvg />}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
}
