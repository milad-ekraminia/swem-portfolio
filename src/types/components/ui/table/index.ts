import { JSX } from 'react';

export interface ITableProps<T> {
  columns: any[];
  data: T[];
  className?: string;
  isFetching?: boolean;
  headerChildren?: JSX.Element;
  form?: JSX.Element;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  renderLoading?: () => React.ReactNode;
  onFilterKeyChange?: () => void;
  maxHeight?: number | string;
  perPage?: number;
  isLoading?: boolean;
  mode?: 'infinite' | 'paging';
  currentPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFetchingPreviousPage?: boolean;
  isFetchingNextPage?: boolean;
  hasCheckbox?: boolean;
  hasRadio?: boolean;
  selectedItem?: number;
  setRadioSelect?: (id: number) => void;
  selectedRows?: number[];
  lastColumnSticky?: boolean;
  hasPagination?: boolean;
  handleContextMenu?: (
    event: React.MouseEvent<HTMLDivElement>, // Accepts both row and div elements
    rowId?: number,
  ) => void;
  idKey?: string;
  totalPages?: number;
  pageChangeHandler?: (page: number) => void;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  sorting?: any;
  setSorting?: any;
  setPageSize?: any;
  pageSize?: any;
  onExpand?: any;
  singleExpand?: any;
}
export type ExpandedState = true | Record<string, boolean>;
export type ISort = {
  sortName: string;
  id: string;
  direction: 'asc' | 'desc' | '';
}[];
