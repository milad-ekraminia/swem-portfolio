import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  OptionType,
  SearchableDropdownProps,
} from '@/types/components/ui/searchable-select/searchable-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ErrorContent from '../../error-content/error-content';
import SkeletonLoader from '../../skeleton/skeleton-loader';
import SearchableOptionsList from './options-list';

/**
 * A searchable dropdown component that allows users to filter and select options
 * from a list. The component supports custom labels, placeholders, and required
 * input indicators. It maintains an internal state for managing the search query
 * and the open/close state of the dropdown menu.
 *
 * Props:
 * - options: Array of options to display in the dropdown.
 * - label: Label text for the dropdown.
 * - selectedVal: Currently selected value.
 * - handleChange: Callback function to handle selection changes.
 * - isRequiredInput: Indicates if the input is required. Defaults to false.
 * - name: Name of the input field.
 * - searchParameterLabel: Key to search/filter the options.
 * - placeholder: Placeholder text for the input field.
 */

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  label,
  selectedVal,
  handleChange,
  isRequiredInput = false,
  name,
  searchParameterLabel,
  placeholder,
  isLoading = false,
  disabled = false,
  error = null,
  mainClass = '',
  leftIcon
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: '100%',
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // used for close modal when click outside
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option: OptionType) => {
    setQuery(() => '');
    handleChange(option.value);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: MouseEvent) {
    if (inputRef.current?.contains(e.target as Node)) {
      setIsOpen(true); // clicked inside → open
      updateDropdownPosition();
    } else {
      setIsOpen(false); // clicked outside → close
    }
  }

  const getDisplayValue = () => (query || selectedVal) ?? '';

  const filter = (list: OptionType[]) =>
    list?.filter((option) =>
      option[searchParameterLabel]
        ?.toString()
        ?.toLowerCase()
        ?.includes(query?.toLowerCase()),
    );

  const itemsPerPage = 10;

  // Pagination function
  const paginate = (
    array: OptionType[],
    page: number,
    itemsPerPage: number,
  ) => {
    const startIndex = page * itemsPerPage; // Calculate the starting index
    const endIndex = startIndex + itemsPerPage; // Calculate the ending index
    return array?.length > 0 ? array?.slice(0, endIndex) : []; // Return the sliced portion of the array
  };

  const filteredOptions = filter(options); // add filter on all options

  const paginatedOptions = paginate(filteredOptions, page, itemsPerPage) || []; // Paginate the filtered options

  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: `${rect.width}px`,
      });
    }
  };
  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
    updateDropdownPosition();
  };

  // For outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!inputRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
      className={`${getClassNames('searchable-select', [
        [disabled, 'is-disabled'],
      ])} ${mainClass ?? ''}`}
    >
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {isRequiredInput && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}
      {isLoading ? (
        // todo styles
        <SkeletonLoader className='min-h-10' label={getTranslatedValue('Loading')} />
      ) : (
        <div
          ref={inputRef}
          onClick={handleInputClick}
          className={getClassNames('searchable-select__control', [
            [!!error, 'is-error'],
          ])}
        >
          {leftIcon && (
            <span className="select-icon">{leftIcon}</span>
          )}
          <div className="searchable-select__control-value">
            <input
              disabled={disabled}
              className={'main-select'}
              type="text"
              value={getDisplayValue()}
              name={name}
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
              }}
              placeholder={placeholder}
              autoComplete="off"
            />
            <span
              className={getClassNames('select-icon', [[false, 'has-label']])}
            >
              {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </span>
          </div>
        </div>
      )}

      {/* Options */}
      <SearchableOptionsList
        options={paginatedOptions}
        isOpen={isOpen}
        selectOption={selectOption}
        position={dropdownPosition}
        selectedVal={selectedVal}
        searchParameterLabel={searchParameterLabel}
        pageHasMore={paginatedOptions?.length >= itemsPerPage}
        hasMore={page * itemsPerPage < filteredOptions?.length}
        setPage={setPage}
      />
      <ErrorContent error={error} />
    </div>
  );
};
export default SearchableDropdown;
