import { CheckIconSvg } from '@/assets/icons/check-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import useHiddenScroll from '@/hooks/use-hidden-scroll';
import useScroll from '@/hooks/useScroll';
import { memo, useRef } from 'react';
import ReactDOM from 'react-dom';

const MemoSearchableOptionsList = ({
  options,
  isOpen,
  selectOption,
  position,
  selectedVal,
  searchParameterLabel,
  pageHasMore,
  hasMore,
  setPage,
}: {
  options: any;
  isOpen: boolean;
  selectOption: any;
  position: any;
  selectedVal: any;
  searchParameterLabel: any;
  pageHasMore: boolean;
  hasMore: boolean;
  setPage: any;
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  // Modify the hook to handle null cases
  useScroll(
    listRef,
    () => {
      if (listRef.current) {
        // Make sure current is not null
        setPage((prevPage: number) => prevPage + 1);
      }
    },
    hasMore,
  );

  useHiddenScroll({ isOpen });

  return ReactDOM.createPortal(
    <div
      ref={listRef}
      className={getClassNames('options-list', [[!!isOpen, 'is-open']])}
      style={{ top: position.top, left: position.left, width: position.width }}
    >
      {isOpen &&
        options.map((option: any, index: number) => {
          return (
            <button
              disabled={option?.disabled}
              type="button"
              onClick={() => selectOption(option)}
              className={getClassNames('options-list__item', [
                [option[searchParameterLabel] === selectedVal, 'selected'],
                [option?.disabled, 'disabled'],
              ])}
              key={`${option.value}-${index}`}
            >
              {getTranslatedValue(option[searchParameterLabel] as string)}
              {option[searchParameterLabel] === selectedVal && (
                <span className="selected-icon">
                  <CheckIconSvg stroke="var(--brand-600)" />
                </span>
              )}
            </button>
          );
        })}
      {isOpen && pageHasMore && hasMore && (
        <div className="options-list__load-more">
          {getTranslatedValue('LoadMore') + '...'}
        </div>
      )}
    </div>,
    document.body,
  );
};
const SearchableOptionsList = memo(MemoSearchableOptionsList);

export default SearchableOptionsList;
