import SendOrCancelButtons from '@/components/ui/button/send-or-cancel-button';
import Table from '@/components/ui/table/table';
import { UploaderExcelDevicesModelModbusInfoTableHeaders } from '@/enum-data/definitions/uploaded-excel-device-model-modbus-info-tables';
import {
  downloadExcelFileTokenApi,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { handleError } from '@/helpers/handle-error';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewDefinitionDeviceModelModbusListWithUseExcel } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditUploadedExcelDeviceModelModbusModal from './edit-uploaded-excel-modal';
import { ExcelDevicesModelModbusInfoTableHeader } from './excel-table-header';
import ImportToExcelDeviceModelModbusModal from './import-to-excel-modal';
import { DevicesModelModbusInfoSearchBoxes } from './search-boxes';

const MemoUploaderExcelDevicesModelModbusInfoTable = ({
  labelList,
  formulaList,
  isFetchOptionListLoading,
  deviceModelProtocolId,
  uploadedExcelFileList,
  setNewItem,
  setUploadedExcelFileList,
  deviceModelResponse,
}: {
  labelList: displayNameListType;
  formulaList: displayNameListType;
  isFetchOptionListLoading: boolean;
  deviceModelProtocolId: number;
  uploadedExcelFileList: any;
  deviceModelResponse: any;
  setNewItem: (value: any) => void;
  setUploadedExcelFileList: (value: any) => void;
}) => {
  const queryClient = useQueryClient();
  const { modbusTableId } = useParams();
  const navigate = useNavigate();
  const [sortData, setSortData] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const onBack = () => {
    navigate(-1);
  };

  const editActionHandler = useCallback((info: any, index: number) => {
    setShowEditModal({
      arrayIndex: index,
      ...info,
    });
  }, []);

  const deleteItemHandler = useCallback(
    (index: number) => {
      const updatedList = uploadedExcelFileList.filter(
        (_: any, i: number) => i !== index,
      );
      setUploadedExcelFileList(updatedList);
    },
    [uploadedExcelFileList, setUploadedExcelFileList],
  );

  const memoizedBaseColumns: any = useMemo(
    () =>
      UploaderExcelDevicesModelModbusInfoTableHeaders({
        deviceModelProtocolId,
        formulaList,
        editActionHandler,
        deleteItemHandler,
      }),
    [
      labelList,
      deleteItemHandler,
      editActionHandler,
      deviceModelProtocolId,
      formulaList,
      uploadedExcelFileList,
    ],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col: any) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col: any) => col.accessorKey),
  );
  const mutationNewDefinitionDevicesModel = useMutation({
    mutationFn: createNewDefinitionDeviceModelModbusListWithUseExcel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['device model list by model id'],
      });
      queryClient.invalidateQueries({
        queryKey: ['used labels', modbusTableId],
      });
      toast.success(getTranslatedValue('SaveSuccess'));
      setUploadedExcelFileList(null);
    },
    onError: handleError,
  });

  const handleSubmitForm = () => {
    mutationNewDefinitionDevicesModel.mutate({
      formData: uploadedExcelFileList,
      id: Number(modbusTableId),
    });
  };
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

  // filter and sort data for all labelId = 0, all of labelId = 0 data should show in first indexes of array
  const sortedUploadedExcelFileList = uploadedExcelFileList.sort(
    (a: any, b: any) => {
      if (a.labelId === 0 && b.labelId !== 0) return -1;
      if (a.labelId !== 0 && b.labelId === 0) return 1;
      return 0;
    },
  );

  // Pagination function
  const paginate = (
    array: typeof sortedUploadedExcelFileList,
    page: number,
    itemsPerPage: number,
  ) => {
    const startIndex = page * itemsPerPage; // Calculate the starting index
    const endIndex = startIndex + itemsPerPage; // Calculate the ending index
    return array.slice(startIndex, endIndex); // Return the sliced portion of the array
  };

  const paginatedList = paginate(
    sortedUploadedExcelFileList,
    currentPage,
    pageSize,
  );

  const downloadHandler = () => {
    getTokenMutation.mutate({
      url: `app/device-model-modbus-tables/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  const header = useMemo(
    () => (
      <ExcelDevicesModelModbusInfoTableHeader
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
    <div className="devices-model-modbus-info">
      <div className="devices-model-modbus-info__header">{header}</div>
      <div className="devices-model-modbus-info__body">
        <DevicesModelModbusInfoSearchBoxes
          deviceModelResponse={deviceModelResponse}
        />
        <Table
          data={paginatedList ?? []}
          columns={effectiveColumns}
          maxHeight="650px"
          isLoading={isFetchOptionListLoading}
          totalCount={uploadedExcelFileList?.length ?? 0}
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
      {showEditModal && (
        <EditUploadedExcelDeviceModelModbusModal
          formulaList={formulaList}
          labelList={labelList}
          sortedUploadedExcelFileList={sortedUploadedExcelFileList}
          deviceModelProtocolId={deviceModelProtocolId}
          setIsVisible={setShowEditModal}
          dataInfo={showEditModal}
          uploadedExcelFileList={uploadedExcelFileList}
          setUploadedExcelFileList={setUploadedExcelFileList}
          checkImportFromExcelLabels={false}
        />
      )}
      {showImportModal && (
        <ImportToExcelDeviceModelModbusModal
          setIsVisible={setShowImportModal}
          setUploadedExcelFileList={setUploadedExcelFileList}
          modalOpen={showImportModal}
        />
      )}
      <SendOrCancelButtons
        handleCancelForm={() => setUploadedExcelFileList(null)}
        handleSubmitForm={handleSubmitForm}
        isPending={mutationNewDefinitionDevicesModel?.isPending}
        isSubmitDisabled={
          uploadedExcelFileList?.length === 0 ||
          uploadedExcelFileList?.some((item: any) => item.labelId === 0)
        }
      />
    </div>
  );
};
const UploaderExcelDevicesModelModbusInfoTable = memo(
  MemoUploaderExcelDevicesModelModbusInfoTable,
);

export default UploaderExcelDevicesModelModbusInfoTable;
