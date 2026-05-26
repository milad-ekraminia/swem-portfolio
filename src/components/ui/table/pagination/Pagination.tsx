import SelectInput from '@/components/ui/input/select-input/select-input';
import { getCookie } from '@/helpers/cookies';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { memo, useState } from 'react';
import { Button } from '../../button/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasCount?: boolean;
  isFullWidth?: boolean;
  setPageSize?: (pageSize: number) => void;
  pageSize?: number;
  totalCount?: number;
};

const MemoPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasCount = false,
  isFullWidth = true,
  setPageSize,
  pageSize = 10,
  totalCount,
}: PaginationProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputPage, setInputPage] = useState<string>('');

  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      if (start > 2) {
        pageNumbers.push('...');
      }
      const maxRange = end < totalPages - 1 ? end + 1 : end;
      for (let i = start; i <= maxRange; i++) {
        pageNumbers.push(i);
      }

      if (end + 1 < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number | string) => {
    onPageChange(Number(page));
  };

  const selectOptions = [
    {
      displayName: '10',
      value: 10,
      id: 1,
    },
    {
      displayName: '20',
      value: 20,
      id: 2,
    },
    {
      displayName: '50',
      value: 50,
      id: 3,
    },
    {
      displayName: '100',
      value: 100,
      id: 4,
    },
  ];

  return (
    <div
      className={getClassNames('pagination-container', [
        [isFullWidth === false, 'minified-pagination'],
      ])}
    >
      <div className="pagination-wrapper">
        <div className=""></div>
        {isFullWidth && (
          <div className="page-numbers">
            <div className="icon-wrappers">
              <Button
                style={{ rotate: '180deg', background: 'unset' }}
                disabled={totalPages === 1 || currentPage == 0}
                onClick={() => handlePageChange(0)}
                variant="secondary"
              >
                {
                  currentLanguage === 'fa' ? <ChevronsLeft size={20} color="#344054" /> : <ChevronsRight size={20} color="#344054" />
                }
              </Button>
              <Button
                style={{ rotate: '180deg', background: 'unset' }}
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                variant="secondary"
              >
                {
                  currentLanguage === 'fa' ? <ChevronLeft size={20} color="#344054" /> : <ChevronRight size={20} color="#344054" />
                }
              </Button>
            </div>
            <div className="page-numbers-wrapper">
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {editIndex === index ? (
                    <input
                      type="number"
                      className="page-number-input"
                      placeholder="-"
                      value={inputPage}
                      min={1}
                      onChange={(e) => setInputPage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const parsed = Number(inputPage);
                          if (
                            !isNaN(parsed) &&
                            parsed >= 1 &&
                            parsed <= totalPages
                          ) {
                            handlePageChange(parsed - 1);
                            setEditIndex(null);
                            setInputPage('');
                          }
                        } else if (e.key === 'Escape') {
                          setEditIndex(null);
                          setInputPage('');
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <button
                      // disabled={typeof page === "string"}
                      className={`page-number ${typeof page === 'number' && page - 1 === currentPage
                        ? 'active'
                        : 'hover'
                        }`}
                      onClick={() => {
                        if (typeof page === 'string') {
                          setEditIndex(index);
                          setInputPage('');
                        } else {
                          handlePageChange(page - 1);
                        }
                      }}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="icon-wrappers">
              <Button
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
                variant="secondary"
              >
                {
                  currentLanguage === 'fa' ? <ChevronLeft size={20} color="#344054" /> : <ChevronRight size={20} color="#344054" />
                }
              </Button>
              <Button
                variant="secondary"
                disabled={totalPages === 1 || currentPage === totalPages - 1}
                onClick={() => handlePageChange(totalPages - 1)}
              >
                {
                  currentLanguage === 'fa' ? <ChevronsLeft size={20} color="#344054" /> : <ChevronsRight size={20} color="#344054" />
                }
              </Button>
            </div>
          </div>
        )}
        {!isFullWidth && (
          <div className="page-numbers">
            <span>
              sayfa {currentPage} - {totalPages}
            </span>
          </div>
        )}

        {/* <Button
          variant="secondary"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {isFullWidth ? <span>ileri</span> : <ArrowRightSvg />}
        </Button> */}
        <div className=""></div>
      </div>
      {hasCount && (
        <div className="row-select-box">
          {totalCount && (
            <div className="records">
              <span>{totalCount}</span>
              <span className="">{getTranslatedValue('record')}</span>
            </div>
          )}
          <SelectInput
            name="pageSize"
            options={selectOptions}
            value={pageSize}
            onChange={(value: number | string) => setPageSize?.(Number(value))}
            openDirection="up"
            placeholder="10"
          />
        </div>
      )}
    </div>
  );
};

const Pagination = memo(MemoPagination);

export default Pagination;
