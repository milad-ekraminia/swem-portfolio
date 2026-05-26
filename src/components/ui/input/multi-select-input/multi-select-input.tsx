import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import Badge from '../../badge/badge';

export interface MultiSelectOption {
  label?: string;
  title?: string;
  value: string | number;
  disabled?: boolean;
}

interface MultiSelectInputProps<T extends FieldValues = FieldValues> {
  label?: string;
  name: string;
  placeholder?: string;
  options: MultiSelectOption[];
  selectedValues?: (string | number | null | undefined)[] | null | undefined;
  onChange?: (values: any[]) => void;
  isRequiredInput?: boolean;
  disabled?: boolean;
  error?: string | null;
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  watch?: (name: string) => any;
  isLoading?: boolean;
  useTranslation?: boolean;
}

const MultiSelectInput = <T extends FieldValues>({
  label,
  name,
  placeholder = getTranslatedValue('ShowAll'),
  options,
  selectedValues = [],
  onChange,
  isRequiredInput = false,
  disabled = false,
  isLoading = false,
  error = null,
  register,
  setValue,
  watch,
  useTranslation = false,
}: MultiSelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });
  const watchedValues = watch?.(name as Path<T>) ?? selectedValues;
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  const toggleValue = (val: string | number) => {
    const current = watchedValues ?? [];
    const updated = current?.includes(val)
      ? current.filter((v: string | number) => v !== val)
      : [...current, val];

    // Update RHF form state
    setValue?.(name as Path<T>, updated);

    // Optionally trigger external onChange
    onChange?.(updated);
  };

  const getLabelForValue = (val: string | number) =>
    options.find((opt) => opt.value == val)?.title ??
    options.find((opt) => opt.value == val)?.label ??
    val;
  useClickOutside(contentRef, () => setIsOpen(false));

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
    <div ref={ref} className="multi-select">
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {isRequiredInput && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <button
        className={`multi-select__control`}
        ref={buttonRef}
        id={name}
        disabled={isLoading || disabled}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="multi-select__control-values">
          {watchedValues?.length > 0 ? (
            watchedValues.map((val: string | number) => (
              <Badge
                key={val}
                color="green"
                onRemove={() => toggleValue(val)}
                onClick={() => toggleValue(val)}
              >
                {getLabelForValue(val)}
              </Badge>
            ))
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <ChevronDownSvg />
        </div>
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
            className="multi-select__dropdown"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                className={getClassNames('multi-select__option', [
                  [watchedValues?.includes(opt.value), 'selected'],
                  [!!opt?.disabled, 'disabled'],
                ])}
              >
                <button
                  type="button"
                  className="multi-select__option-button"
                  onClick={() => !opt.disabled && toggleValue(opt.value)}
                >
                  <input
                    type="checkbox"
                    checked={watchedValues?.includes(opt.value)}
                    readOnly
                    className="multi-select__option-checkbox"
                  />
                  {useTranslation
                    ? getTranslatedValue(opt?.title as string)
                    : opt.title}

                  {watchedValues?.includes(opt.value) && (
                    <span className=" multi-select__option-icon">
                      <CheckIconSvg stroke="var(--brand-600)" />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}

      {error && <div className="error-message">{error}</div>}
      {register && <input type="hidden" {...register(name as Path<T>)} />}
    </div>
  );
};

export default MultiSelectInput;
