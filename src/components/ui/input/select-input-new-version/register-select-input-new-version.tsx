import type { KeyboardEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getCookie } from '@/helpers/cookies';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Plus, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { FieldValues, Path, useWatch } from 'react-hook-form';
import { FixedSizeList as List } from 'react-window';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from '../../button/button';

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
  onOptionDelete?: (option: DropDownOption) => void;
  onOptionSelect?: (option: DropDownOption) => void;
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
  useTranslation?: boolean;
  setShowModal?: (value: boolean) => void;
  hasNewOption?: boolean;
  isFull?: boolean;
  isSearchable?: boolean;
}

type InternalOption = DropDownOption & { label: string };

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getHighlightedLabel = (text: string, rawQuery: string) => {
  const query = rawQuery.trim();

  if (!query) return text;

  const normalizedQuery = query.toLowerCase();
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'ig');
  const segments = text.split(regex);

  return segments.map((segment, index) => {
    if (!segment) return null;

    return segment.toLowerCase() === normalizedQuery ? (
      <span key={`${segment}-${index}`} className="select-input__highlight">
        {segment}
      </span>
    ) : (
      segment
    );
  });
};

export default function RegisterSelectInputNewVersion<
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
  onOptionDelete,
  onOptionSelect,
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
  isFull = false,
  isSearchable = false,
}: Readonly<SelectInputProps<TFieldValues, TName>>) {
  const contentRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useClickOutside(contentRef, () => setIsOpen(false));

  const selectedValue = useWatch({ control, name }) ?? defaultValue;

  const resolvedOptions = useMemo<InternalOption[]>(
    () =>
      options.map((opt) => ({
        ...opt,
        label: useTranslation
          ? getTranslatedValue(opt.title)
          : String(opt.title),
      })),
    [options, useTranslation],
  );

  const placeholderLabel = useMemo(() => {
    const fallback = placeholder ?? 'Select';
    return useTranslation ? getTranslatedValue(fallback) : fallback;
  }, [placeholder, useTranslation]);

  const selectedOption = useMemo(
    () => resolvedOptions.find((opt) => opt.value == selectedValue),
    [resolvedOptions, selectedValue],
  );

  const activeQuery = searchQuery.trim();

  const displayedOptions = useMemo<InternalOption[]>(() => {
    if (!isSearchable || !activeQuery) return resolvedOptions;
    const lowerQuery = activeQuery.toLowerCase();
    return resolvedOptions.filter((opt) =>
      opt.label?.toLowerCase().includes(lowerQuery),
    );
  }, [resolvedOptions, isSearchable, activeQuery]);

  const hasResults = displayedOptions.length > 0;

  const hasSelectedValue = !(
    String(selectedValue) === 'undefined' || !String(selectedValue)
  );
  const isEmptyState = !hasSelectedValue && !(isSearchable && searchQuery);

  const buttonText =
    isSearchable && isOpen && searchQuery
      ? searchQuery
      : (selectedOption?.label ?? placeholderLabel);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    updateDropdownPosition();
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleSelect = (opt: InternalOption) => {
    const { label: _unusedLabel, ...option } = opt;
    void _unusedLabel;
    setIsOpen(false);
    if (isSearchable) {
      setSearchQuery('');
    }
    if (onOptionSelect) {
      onOptionSelect(option as DropDownOption);
    }
    register(name).onChange({ target: { name, value: opt.value } });
  };

  const emitOptionDelete = (opt: any) => {
    if (!onOptionDelete) return;
    const { ...option } = opt;
    onOptionDelete(option as DropDownOption);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (displayedOptions[0]) handleSelect(displayedOptions[0]);
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

  useEffect(() => {
    if (!isSearchable) return;

    if (isOpen) {
      searchInputRef.current?.focus();
    } else {
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  }, [isOpen, isSearchable]);

  const isRTL = useMemo(() => getCookie('CultureName') === 'fa', []);

  const renderOptionLabel = (opt: InternalOption) => {
    if (!isSearchable || !activeQuery) return opt.label;
    return getHighlightedLabel(opt.label, activeQuery);
  };

  return (
    <div
      className={`select-input new-version ${mainClass ?? ''} ${suffix ? 'has-suffix' : ''}`}
    >
      {label && (
        <label className="select-input__label label" htmlFor={name}>
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <div className="select-input__wrapper">
        {isSearchable && (
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoComplete="off"
            className="select-input__search-input"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        <button
          ref={buttonRef}
          id={name}
          type="button"
          className={`select-input__select ${isEmptyState ? 'empty' : ''} ${error ? 'error' : ''}`}
          onClick={toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={isLoading || disabled}
        >
          <span>{buttonText}</span>
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
                width: isFull ? 'max-content' : `${dropdownPosition.width}px`,
                minWidth: isFull ? `${dropdownPosition.width}px` : 'auto',
                maxWidth: isFull ? '500px' : 'auto',
                direction: isRTL ? ('rtl' as const) : ('ltr' as const),
              }}
              className={`select-input__dropdown outside-modal-dropdown ${openDirection === 'up' ? 'dropdown-up' : 'dropdown-down'} ${isFull ? 'dropdown-full' : ''}`}
            >
              {hasResults ? (
                isFull ? (
                  displayedOptions.map((opt) => (
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
                        <span className="dropdown-option__label">
                          {renderOptionLabel(opt)}
                        </span>
                        <div className="dropdown-option-actions">
                          {onOptionDelete && (
                            <Trash2
                              className="dropdown-option__delete-icon"
                              color="#F04438"
                              size={18}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                emitOptionDelete(opt);
                              }}
                            />
                          )}
                        </div>
                      </button>
                    </li>
                  ))
                ) : (
                  <List
                    key={`select-${String(name)}-${activeQuery}`}
                    height={Math.min(displayedOptions.length, 6) * 40}
                    itemCount={displayedOptions.length}
                    itemSize={40}
                    width={'100%'}
                    direction={isRTL ? ('rtl' as const) : ('ltr' as const)}
                    itemData={displayedOptions}
                    itemKey={(index, data) => data[index].value}
                  >
                    {({ index, style, data }) => {
                      const opt = data[index];
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
                              [
                                selectedValue === opt.value,
                                'dropdown-option-selected',
                              ],
                            ])}
                            onClick={() => handleSelect(opt)}
                          >
                            <span className="dropdown-option__label">
                              {renderOptionLabel(opt)}
                            </span>
                            <div className="dropdown-option-actions">
                              {onOptionDelete && (
                                <Trash2
                                  className="dropdown-option__delete-icon"
                                  color="#F04438"
                                  size={18}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    emitOptionDelete(opt);
                                  }}
                                />
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    }}
                  </List>
                )
              ) : (
                <li className="select-input__empty">
                  {getTranslatedValue('NoDataAvailable')}
                </li>
              )}
              {hasNewOption && (
                <Button
                  variant="tertiary"
                  className="add-new-button"
                  onClick={() => {
                    setIsOpen(false);
                    if (isSearchable) setSearchQuery('');
                    if (setShowModal) setShowModal(true);
                  }}
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
