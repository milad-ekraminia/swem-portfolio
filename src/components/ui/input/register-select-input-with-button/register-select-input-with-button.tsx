import { CheckIconSvg } from '@/assets/icons/check-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getCookie } from '@/helpers/cookies';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useClickOutside } from '@/hooks/useClickOutside';
import { FunnelIcon, Plus, Trash2 } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, Path, useWatch } from 'react-hook-form';
import { FixedSizeList as List } from 'react-window';
import { Button } from '../../button/button';

interface DropDownOption {
  title: string;
  value: number | string;
  id?: number;
}

interface MultiSelectWithButtonProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  name: TName;
  label?: string;
  required?: boolean;
  options: DropDownOption[];
  onOptionDelete?: (option: DropDownOption) => void;
  disabled?: boolean;
  isLoading?: boolean;
  openDirection?: 'up' | 'down';
  error?: string;
  register: any;
  control: any;
  mainClass?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  defaultValue?: (string | number)[];
  useTranslation?: boolean;
  setShowModal?: (value: boolean) => void;
  hasNewOption?: boolean;
  /** Button props */
  buttonText?: string;
  buttonType?: 'submit' | 'button';
  onButtonClick?: () => void;
}

export default function MultiSelectWithButton<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  defaultValue = [],
  name,
  label,
  required = false,
  options,
  disabled = false,
  isLoading = false,
  onOptionDelete,
  openDirection = 'down',
  error,
  register,
  control,
  mainClass,
  placeholder = '',
  suffix,
  useTranslation = true,
  hasNewOption = false,
  setShowModal,
  /** button props */
  buttonText = 'Filter',
  buttonType = 'button',
  onButtonClick,
}: Readonly<MultiSelectWithButtonProps<TFieldValues, TName>>) {
  const contentRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(contentRef, () => setIsOpen(false));

  // Always call hook
  const watchedValue: (string | number)[] =
    useWatch({ control, name }) as unknown as any ?? defaultValue as unknown as any;

  // Memoize RTL check to avoid repeated cookie reads
  const isRTL = useMemo(() => getCookie('CultureName') === 'fa', []);

  // Memoize dropdown position calculation
  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
  }, []);

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen((o) => !o);
      updateDropdownPosition();
    }
  }, [disabled, updateDropdownPosition]);

  const handleToggleSelect = useCallback(
    (opt: DropDownOption) => {
      const updated = watchedValue.includes(opt.value)
        ? watchedValue.filter((v) => v !== opt.value)
        : [...watchedValue, opt.value];
      register(name).onChange({ target: { name, value: updated } });
    },
    [watchedValue, register, name],
  );

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
  }, [isOpen, updateDropdownPosition]);

  // Memoize selected labels to avoid recalculation on every render
  const selectedLabels = useMemo(() => {
    if (watchedValue.length === 0) return placeholder || 'Select';

    return options
      .filter((opt) => watchedValue.includes(opt.value))
      .map((opt) =>
        useTranslation ? getTranslatedValue(opt.title) : opt.title,
      )
      .join(', ');
  }, [watchedValue, options, useTranslation, placeholder]);

  // Memoize dropdown styles
  const dropdownStyles = useMemo(
    () => ({
      top: dropdownPosition.top,
      left: isRTL ? 'auto' : dropdownPosition.left,
      right: isRTL ? dropdownPosition.right : 'auto',
      position: 'absolute' as const,
      width: buttonRef.current?.offsetWidth || '200px',
      overflowY: 'hidden' as const,
      maxHeight: '180px',
      zIndex: 1000,
      direction: isRTL ? 'rtl' as const : 'ltr' as const,
    }),
    [dropdownPosition, isRTL, buttonRef],
  );

  // Memoize list item renderer
  const renderListItem = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const opt = options[index];
      const isSelected = watchedValue.includes(opt.value);
      return (
        <li
          className="dropdown-item"
          key={opt.value}
          role="option"
          style={style}
        >
          <button
            type="button"
            className={getClassNames('dropdown-option', [
              [isSelected, 'dropdown-option-selected'],
            ])}
            onClick={() => handleToggleSelect(opt)}
          >
            {useTranslation ? getTranslatedValue(opt.title) : opt.title}
            <div className="dropdown-option-actions">
              {isSelected && <CheckIconSvg />}
              {onOptionDelete && (
                <Trash2
                  color="#F04438"
                  size={18}
                  onClick={(e) => {
                    e.preventDefault();
                    onOptionDelete(opt);
                  }}
                />
              )}
            </div>
          </button>
        </li>
      );
    },
    [options, watchedValue, useTranslation, handleToggleSelect, onOptionDelete],
  );

  // Memoize add new button click handler
  const handleAddNewClick = useCallback(() => {
    setIsOpen(false);
    if (setShowModal) setShowModal(true);
  }, [setShowModal]);
  return (
    <div className={`select-input with-button ${mainClass ?? ''}`}>
      {label && (
        <label className="select-input__label label" htmlFor={name}>
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="select-input__wrapper has-inline-button">
        {/* Select button */}
        <button
          ref={buttonRef}
          id={name}
          type="button"
          className={`select-input__select ${watchedValue.length === 0 ? 'empty' : ''
            } ${error ? 'error' : ''}`}
          onClick={toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={isLoading || disabled}
        >
          <span>{selectedLabels}</span>
          <ChevronDownSvg />
        </button>

        {/* Inline Button */}
        <button
          type={buttonType}
          className="inline-input-btn"
          onClick={onButtonClick}
        >
          <FunnelIcon size={18} />
          {getTranslatedValue(buttonText)}
        </button>

        {/* Dropdown list */}
        {isOpen &&
          createPortal(
            <ul
              ref={contentRef}
              role="listbox"
              style={dropdownStyles}
              className={`select-input__dropdown ${openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'
                }`}
            >
              <List
                height={Math.min(options.length * 40, 180)}
                itemCount={options.length}
                itemSize={40}
                width={'100%'}
              >
                {renderListItem}
              </List>

              {hasNewOption && (
                <Button
                  variant="tertiary"
                  className="add-new-button"
                  onClick={handleAddNewClick}
                >
                  <span>
                    <Plus />
                    {getTranslatedValue('report_filter_new_tittle')}
                  </span>
                </Button>
              )}
            </ul>,
            document.body,
          )}

        {suffix && <>{suffix}</>}
      </div>

      {error && <p className="select-input__error">{error}</p>}
    </div>
  );
}
