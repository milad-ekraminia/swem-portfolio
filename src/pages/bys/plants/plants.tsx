import { GridSvg } from '@/assets/icons/grid-svg';
import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import { ListSvg } from '@/assets/icons/list-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import PlantsBoxView from '@/components/pages/bys/plants/boxes';
import PlantsTable from '@/components/pages/bys/plants/table';
import { Button } from '@/components/ui/button/button';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { PlantsTableColumns as basicColumns } from '@/enum-data/bys/plants-table-columns';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchPlantsList } from '@/services/bys/plants/plants-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type plantsExportFilterProps = {
  address: null;
  coordinate: null;
  downloadToken: null;
  filterText: string | null;
  isDiscard: boolean | null;
  isPlant: null;
  name: null;
  status: boolean | null; // Use the boolean | null type
  warehouseId: null;
};

export const Plants = () => {
  const navigate = useNavigate();
  const [tableShow, setTableShow] = useState(false);
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    { label: 'Menu:Plants', href: '/bys/plants' },
  ];
  const title = {
    label: 'Menu:Plants',
    href: '/bys/plants',
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      'Get Plants List',
      sortData,
      searchInputValue,
      pageSize,
      currentPage,
    ],
    queryFn: () =>
      fetchPlantsList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('Plants'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = () => {
    const formData: plantsExportFilterProps = {
      downloadToken: null,
      filterText: null,
      name: null,
      status: null,
      coordinate: null,
      address: null,
      isDiscard: null,
      isPlant: null,
      warehouseId: null,
    };

    if (searchInputValue) {
      formData.filterText = searchInputValue;
    }

    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-plant-list?api-version=${import.meta.env.VITE_API_VERSION}`,
      formData,
    });
  };
  const editHandler = (id: string) => {
    navigate(`/bys/plants/edit/${id}`);
  };

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        setEditItem(row) {
          editHandler(row?.original?.warehouse?.id);
        },
        setInventoriesItem(row) {
          navigate(`/bys/plants/${row?.original?.warehouse?.id}/inventories`);
        },
      }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        handleDownload={downloadHandler}
        isExcelDownloading={mutation.isPending}
        label={getTranslatedValue('Plants')}
        tableColumns={memoizedBaseColumns}
        hasFilterTable={tableShow}
        actions={
          <Button
            onClick={() => {
              setTableShow(!tableShow);
            }}
            variant="secondary-blue"
            leftIcon={
              tableShow ? (
                <GridSvg width="20" stroke="var(--brand-600)" />
              ) : (
                <ListSvg width="20" stroke="var(--brand-600)" />
              )
            }
            style={{ whiteSpace: 'nowrap' }}
          >
            {getTranslatedValue('ChangeViewStyle')}
          </Button>
        }
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue, tableShow],
  );

  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<KeyRepairCircleSvg stroke="#344054" />}
      />
      <div className="page-wrapper__body plants-list">
        {header}

        {tableShow ? (
          <PlantsTable
            currentPage={currentPage}
            data={data}
            effectiveColumns={memoizedBaseColumns}
            isTableLoading={isLoading}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
            setSortData={setSortData}
            sortData={sortData}
          />
        ) : (
          <PlantsBoxView
            data={data}
            isLoading={isLoading}
            onEdit={editHandler}
          />
        )}
      </div>
    </div>
  );
};
