import { useEffect, useMemo, useState } from 'react';
import { summaryTableColumns } from '@/enum-data/organization-trace/org-trace-index';
import { getTodayDateRaw } from '@/helpers/get-today-date';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { fetchOrganizationSummary } from '@/services/organization-trace/plant-summary';
import { Loader } from '@/components/ui/loader/loader';
import Table from '@/components/ui/table/table';
import { SummaryHeader } from './summary-header';

export const SummaryTable = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );

  const { year, monthNumber, day } = getTodayDateRaw();
  const todayDate = `${year}-${monthNumber}-${day}`;

  const [selectedDate, setSelectedDate] = useState<string>(todayDate);
  const [sorting, setSorting] = useState<ISort>([]);

  // Memoize static column definitions
  const memoizedColumns = useMemo(() => summaryTableColumns(), []);

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedColumns.map((col) => col.accessorKey),
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedColumns.map((col) => col.accessorKey),
  );

  // Update date when Redux value changes
  useEffect(() => {
    if (inserted_date) {
      setSelectedDate(inserted_date);
    }
  }, [inserted_date]);

  // Filter visible columns based on selection and order
  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as any;
  }, [columnOrder, selectedColumnKeys, memoizedColumns]);

  // Fetch organization summary
  const { data: responseData, isLoading } = useQuery({
    queryKey: [
      'Fetch organization summary',
      treeData?.tree_id,
      period_type,
      selectedDate,
      sorting,
    ],
    queryFn: () =>
      fetchOrganizationSummary({
        tree_id: treeData?.tree_id,
        periodType: period_type,
        date: selectedDate,
        sortData: sorting,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  return (
    <Table
      data={responseData as any ?? []}
      columns={effectiveColumns}
      renderLoading={() => <Loader />}
      maxHeight="400px"
      isLoading={isLoading}
      headerChildren={
        <SummaryHeader
          setSelectedColumnKeys={setSelectedColumnKeys}
          selectedColumnKeys={selectedColumnKeys}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
      }
      hasPagination={false}
      lastColumnSticky={false}
      setSorting={setSorting}
      sorting={sorting}
    />
  );
};
