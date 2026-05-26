import noData from '@/assets/images/no-table-data.svg';
import Pagination from '@/components/ui/table/pagination/Pagination';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  ExpandedState,
  ISort,
  ITableProps,
} from '@/types/components/ui/table/index';
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from '../image/image';
import { Loader } from '../loader/loader';
import TableHeader from './table-head/table-head';
import TableRow from './table-row/table-row';

const TableWithForm = <T extends { children?: T[] }>({
  isLoading,
  data,
  columns,
  renderLoading = () => <Loader />,
  maxHeight = '300px',
  headerChildren,
  form,
  selectRowsHandler,
  hasRadio = false,
  setRadioSelect = () => { },
  selectedItem,
  hasCheckbox = false,
  selectedRows = [],
  hasPagination = true,
  handleContextMenu,
  idKey,
  totalCount = 0,
  pageChangeHandler,
  setCurrentPage,
  currentPage,
  sorting,
  setSorting,
  lastColumnSticky = false,
  setPageSize,
  pageSize = 10,
}: ITableProps<T>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const defaultColumn: Partial<ColumnDef<T>> = {
    cell: (info) => {
      const v = info.getValue();
      // treat null/undefined/empty-string/empty-object as “no data”
      if (
        v == null ||
        (typeof v === 'string' && v === '') ||
        (typeof v === 'object' && !Array.isArray(v))
      ) {
        return '-';
      }
      return v as React.ReactNode;
    },
  };
  const handleSortClick = (columnId: string, sortName: string) => {
    setSorting((prev: ISort) => {
      const existing = prev.find((s) => s.id === columnId);

      if (!existing) {
        return [...prev, { id: columnId, direction: 'asc', sortName }];
      }

      if (existing.direction === 'asc') {
        return prev.map((s) =>
          s.id === columnId ? { ...s, direction: 'desc' } : s,
        );
      }
      return prev.filter((s) => s.id !== columnId);
    });
  };
  const table = useReactTable<T>({
    data: data,
    columns: columns as ColumnDef<T>[],
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row: any) => row?.children,
    getRowCanExpand: (row: any) => !!row.original?.children,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
  });
  const { rows } = table.getRowModel();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rows?.length,
    estimateSize: () => 40,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
        navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 4,
  });

  const renderNotExist = useCallback(
    () => (
      <div className="not-exists-table">
        <Image
          src={noData}
          alt={getTranslatedValue('NoDataAvailable')}
          className="not-exists-table__image"
        />
        <p className="not-exists">{getTranslatedValue('NoDataDisplayable')}</p>
      </div>
    ),
    [],
  );
  const actualCurrentPage = currentPage ?? 0;
  // 2) default `setCurrentPage` to a no-op function
  const actualSetCurrentPage = setCurrentPage ?? (() => { });

  // …
  const handlePageChange = (page: number) => {
    // use your defaulted values
    actualSetCurrentPage(page);
    if (pageChangeHandler) {
      pageChangeHandler(page);
      tableContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const memoizedSelectRowsHandler = useCallback(
    selectRowsHandler ?? (() => { }),
    [selectRowsHandler],
  );
  const memoizedSetRadioSelect = useCallback(setRadioSelect, [setRadioSelect]);
  const memoizedHandleContextMenu = useCallback(
    handleContextMenu ?? (() => { }),
    [handleContextMenu],
  );
  const memoizedColumns = useMemo(() => columns, [columns]);
  const ROW_HEIGHT = 40;
  const LOADING_ROWS = 8;
  return (
    <div
      className={getClassNames('table-wrapper table-with-form', [
        [!!headerChildren, 'borderless'],
      ])}
    >
      {headerChildren}
      {form}
      <div
        ref={tableContainerRef}
        className={`table-container`}
        style={{
          maxHeight: maxHeight,
          overflowY: 'auto',
          overflowX: isLoading ? 'hidden' : 'auto',
        }}
      >
        <table className="table-x">
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            selectRowsHandler={selectRowsHandler}
            hasCheckbox={hasCheckbox}
            selectedRows={selectedRows}
            data={data}
            hasRadio={hasRadio}
            lastColumnSticky={lastColumnSticky}
            handleSortClick={handleSortClick}
            sorting={sorting}
          />

          <tbody
            className="table-body"
            style={{
              height:
                isLoading || data?.length === 0
                  ? `${ROW_HEIGHT * LOADING_ROWS}px`
                  : `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {!isLoading &&
              data?.length !== 0 &&
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <React.Fragment key={row.id ?? virtualRow.key}>
                    <TableRow
                      key={row.id ?? virtualRow.key}
                      rowIndex={virtualRow.index}
                      data-testid={`row-${virtualRow.index}`}
                      onClick={() => { }}
                      columns={memoizedColumns}
                      rowVirtualizer={rowVirtualizer}
                      virtualRow={virtualRow}
                      row={row}
                      selectRowsHandler={
                        memoizedSelectRowsHandler ?? (() => { })
                      }
                      hasCheckbox={hasCheckbox}
                      selectedRows={selectedRows}
                      hasRadio={hasRadio}
                      setRadioSelect={memoizedSetRadioSelect}
                      selectedItem={selectedItem}
                      handleContextMenu={
                        memoizedHandleContextMenu ?? (() => { })
                      }
                      idKey={idKey}
                      lastColumnSticky={lastColumnSticky}
                    />
                  </React.Fragment>
                );
              })}
            {!isLoading && data?.length === 0 ? (
              <tr
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  height: `${ROW_HEIGHT * LOADING_ROWS}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <td style={{ height: '100%' }} colSpan={columns?.length}>
                  {renderNotExist()}
                </td>
              </tr>
            ) : null}
          </tbody>
          {/* </div> */}
        </table>
        {isLoading ? (
          <div
            className="loading-overlay"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              bottom: 0,
              transform: 'translate(-50%,-50%) ',
              zIndex: '100',
            }}
          >
            {renderLoading?.()}
          </div>
        ) : null}
      </div>
      {totalCount > 10 && hasPagination ? (
        <Pagination
          currentPage={actualCurrentPage}
          totalPages={Math.ceil((totalCount || 0) / pageSize)}
          onPageChange={handlePageChange}
          hasCount={true}
          setPageSize={setPageSize}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableWithForm;
