import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { plantSummaryColumns as baseColumn } from '@/enum-data/organization-trace/org-trace-index';
import { getTodayDateRaw } from '@/helpers/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCustomTypeNumber } from '@/helpers/organization-data/organization-tree-selected-tab-handler';
import { handleChangeTree } from '@/store/features/tree-slice';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { ISort } from '@/types/components/ui/table';
import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';
import { fetchOrganizationPlantSummary } from '@/services/organization-trace/plant-summary';
import { Loader } from '@/components/ui/loader/loader';
import { NotificationModal } from '@/components/ui/notification/notification-modal/notification-modal';
import Table from '@/components/ui/table/table';
import { AlarmModalTable } from '@/components/pages/organization-trace/plant-summary-table/alarm-modal';
import { PlantSummaryHeader } from './plant-summary-header';

const PlantSummaryTableComponent = () => {
  const { year, monthNumber, day } = getTodayDateRaw();
  const todayDate = `${year}-${monthNumber}-${day}`;

  const dispatch = useDispatch();

  const [sortData, setSortData] = useState<ISort>([]);
  const [showRowAlarms, setShowRowAlarms] = useState(false);
  const [info, setInfo] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<string>(todayDate);

  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter?.info,
  );

  useEffect(() => {
    if (inserted_date) {
      setSelectedDate(inserted_date);
    }
  }, [inserted_date]);

  const handleAlarmClick = useCallback((info: any) => {
    setShowRowAlarms(true);
    setInfo(info);
  }, []);

  const handlePlantNavigate = useCallback(
    (info: any) => {
      dispatch(
        handleChangeTree({
          tree_id: info?.id ?? info?.organizationId,
          title: info.organizationName,
          parentTitle: info.organizationParentNames,
          locationId: info.locationId,
          type: getCustomTypeNumber(4, 1, 0),
          deviceModelType: 0,
          deviceModelId: null,
        }),
      );
    },
    [dispatch],
  );

  const plantSummaryColumns = useMemo(() => {
    return baseColumn(handleAlarmClick, handlePlantNavigate);
  }, [handleAlarmClick, handlePlantNavigate]);

  const [columnOrder, setColumnOrder] = useState<string[]>(
    plantSummaryColumns.map((col) => col.accessorKey),
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    plantSummaryColumns.map((col) => col?.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        plantSummaryColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof plantSummaryColumns;
  }, [columnOrder, selectedColumnKeys, plantSummaryColumns]);

  const [lastConnectionInterval] = useDataRefreshRates([501]);

  const {
    data: responseData,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [
      'plant-summary-tab',
      treeData?.tree_id,
      period_type,
      selectedDate,
      sortData,
    ],
    queryFn: () =>
      fetchOrganizationPlantSummary({
        tree_id: treeData?.tree_id,
        periodType: period_type,
        date: selectedDate,
        sortData,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
    refetchInterval: lastConnectionInterval ? lastConnectionInterval : false,
  });

  return (
    <>
      <Table
        data={responseData as any ?? []}
        columns={effectiveColumns}
        renderLoading={() => <Loader />}
        maxHeight="550px"
        isLoading={isLoading || isPending}
        hasPagination={false}
        headerChildren={
          <PlantSummaryHeader
            setSelectedColumnKeys={setSelectedColumnKeys}
            selectedColumnKeys={selectedColumnKeys}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        }
        setSorting={setSortData}
        sorting={sortData}
      />

      <NotificationModal
        isOpen={showRowAlarms}
        onClose={() => setShowRowAlarms(false)}
        title={`“${info?.organizationName}” ${getTranslatedValue('AlarmDetails')}`}
        onConfirm={() => setShowRowAlarms(false)}
        onCancel={() => setShowRowAlarms(false)}
        footerType="noFooter"
        modalSize="lg"
      >
        <AlarmModalTable rowId={info} />
      </NotificationModal>
    </>
  );
};

export const PlantSummaryTable = memo(PlantSummaryTableComponent);
