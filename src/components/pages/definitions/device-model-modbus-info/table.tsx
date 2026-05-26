import Table from '@/components/ui/table/table';
import { finalDevicesModelModbusInfoTableHeaders } from '@/enum-data/definitions/device-model-modbus-info-tables';
import {
  downloadExcelFileTokenApi,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchDefinitionsDeviceModelsListByModelId, getAsduTypesLookup } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import { ISort } from '@/types/components/ui/table';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditDeviceModelModbusModal from './edit-modal';
import ImportToExcelDeviceModelModbusModal from './import-to-excel-modal';
import { DevicesModelModbusInfoSearchBoxes } from './search-boxes';
import { DevicesModelModbusInfoTableHeader } from './table-header';

const MemoDevicesModelModbusInfoTable = ({
  labelList,
  formulaList,
  isFetchOptionListLoading,
  deviceModelProtocolId,
  setNewItem,
  setUploadedExcelFileList,
  deviceModelResponse,
}: {
  labelList: displayNameListType;
  formulaList: displayNameListType;
  isFetchOptionListLoading: boolean;
  deviceModelProtocolId: number;
  deviceModelResponse: any;
  setNewItem: (value: any) => void;
  setUploadedExcelFileList: (value: any) => void;
}) => {
  const { modbusTableId } = useParams();
  const navigate = useNavigate();
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const onBack = () => {
    navigate(-1);
  };
  const onEdit = (row: any) => {
    setShowEditModal(row);
  };

  const { data: asduTypesLookup } = useQuery({
    queryKey: ['ASDU Types Lookup'],
    queryFn: () => getAsduTypesLookup(),
    retry: false,
    enabled: deviceModelProtocolId === 11,
  });

  const memoizedBaseColumns: any = useMemo(
    () =>
      finalDevicesModelModbusInfoTableHeaders({
        deviceModelProtocolId,
        labelList,
        formulaList,
        onEdit,
        queryKey: 'device model list by model id',
        asduTypesLookup: asduTypesLookup?.items ?? [],
      }),
    [deviceModelProtocolId, labelList, formulaList, asduTypesLookup?.items],
  );
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col: any) => col.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col: any) => col.accessorKey),
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      'device model list by model id',
      modbusTableId,
      currentPage,
      sortData,
      pageSize,
    ],
    queryFn: () =>
      fetchDefinitionsDeviceModelsListByModelId({
        deviceModelId: Number(modbusTableId),
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
    retry: false,
    enabled: !!modbusTableId,
  });

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col: any) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const getTokenMutation = useMutation({
    mutationFn: downloadExcelFileTokenApi,
    onSuccess: async (responseData) => {
      await downloadGetMethodExcelFile({
        excelUrl: `app/device-model-modbus-tables/modbus-data-mappings-as-excel-file?DownloadToken=${responseData?.token}&DeviceModelIdMin=${modbusTableId}&DeviceModelIdMax=${modbusTableId}`,
        fileName:
          getTranslatedValue('Menu:DeviceModelModbusTables') +
          '-' +
          deviceModelResponse?.data?.deviceModelCode,
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = () => {
    getTokenMutation.mutate({
      url: `app/device-model-modbus-tables/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };
  const header = useMemo(
    () => (
      <DevicesModelModbusInfoTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        handleDownload={downloadHandler}
        setNewItem={setNewItem}
        onBack={onBack}
        setShowUploadExcel={setShowImportModal}
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue],
  );
  return (
    <>
      <div className="devices-model-modbus-info">
        <div className="devices-model-modbus-info__header">{header}</div>
        <div className="devices-model-modbus-info__body">
          <DevicesModelModbusInfoSearchBoxes
            deviceModelResponse={deviceModelResponse}
          />
          <Table
            data={data?.items ?? []}
            columns={effectiveColumns}
            maxHeight="650px"
            isLoading={isLoading || isFetchOptionListLoading}
            totalCount={data?.totalCount ?? 0}
            pageChangeHandler={setCurrentPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setSorting={setSortData}
            sorting={sortData}
            lastColumnSticky
            setPageSize={setPageSize}
            pageSize={pageSize}
          />
        </div>
      </div>

      {showEditModal && (
        <EditDeviceModelModbusModal
          formulaList={formulaList}
          labelList={labelList}
          deviceModelProtocolId={deviceModelProtocolId}
          setIsVisible={setShowEditModal}
          dataInfo={showEditModal}
          modalOpen={showEditModal}
        />
      )}

      {showImportModal && (
        <ImportToExcelDeviceModelModbusModal
          setIsVisible={setShowImportModal}
          setUploadedExcelFileList={setUploadedExcelFileList}
          modalOpen={showImportModal}
        />
      )}
    </>
  );
};
const DevicesModelModbusInfoTable = memo(MemoDevicesModelModbusInfoTable);

export default DevicesModelModbusInfoTable;
