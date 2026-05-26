import { useMemo, useState } from 'react';
import { ContentEditSvg } from '@/assets/icons/content-edit-svg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import {
  fetchDefinitionsDeviceDataTypeLabelLabelsList,
  fetchDefinitionsDeviceFormulasList,
} from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import {
  fetchDefinitionsDeviceModel,
  fetchDuplicatedLabels,
} from '@/services/definitions/device-models';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import AddNewDeviceModelModbusModal from '@/components/pages/definitions/device-model-modbus-info/new-modal';
import DevicesModelModbusInfoTable from '@/components/pages/definitions/device-model-modbus-info/table';
import UploaderExcelDevicesModelModbusInfoTable from '@/components/pages/definitions/device-model-modbus-info/uploaded-excel-table';

const DeviceModelModbusTablesInfo = () => {
  const { modbusTableId } = useParams();

  const [newItem, setNewItem] = useState(false);
  const [uploadedExcelFileList, setUploadedExcelFileList] = useState(null);

  const { data } = useQuery({
    queryKey: ['device model label types', modbusTableId],
    queryFn: () =>
      fetchDefinitionsDeviceDataTypeLabelLabelsList(
        modbusTableId ? Number(modbusTableId) : 1,
      ),
    retry: false,
  });

  const formulaResponse = useQuery({
    queryKey: ['device model formulas lookup'],
    queryFn: () => fetchDefinitionsDeviceFormulasList(),
    retry: false,
  });

  const deviceModelInfoResponse = useQuery({
    queryKey: ['device model', modbusTableId],
    queryFn: () =>
      fetchDefinitionsDeviceModel({
        deviceModelId: Number(modbusTableId),
      }),
    retry: false,
    enabled: !!modbusTableId,
  });

  const usedLabelResponse = useQuery({
    queryKey: ['used labels', modbusTableId],
    queryFn: () =>
      fetchDuplicatedLabels({
        deviceModelId: Number(modbusTableId),
      }),
    retry: false,
    enabled: !!modbusTableId,
  });

  const updatedLabelList: any = useMemo(() => {
    const updatedLabelList = data?.map((item: any) => ({
      ...item,
      disabled: usedLabelResponse.data?.includes(item.id),
    }));
    return updatedLabelList;
  }, [data, usedLabelResponse]);

  const deviceModelResponse = useQuery({
    queryKey: ['device model', modbusTableId],
    queryFn: () =>
      fetchDefinitionsDeviceModel({
        deviceModelId: Number(modbusTableId),
      }),
    retry: false,
    enabled: !!modbusTableId,
  });
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    {
      label: 'Menu:DeviceModelModbusTables',
      href: '/definitions/device-model-modbus-tables',
    },
    {
      label: `${deviceModelResponse?.data?.deviceModelName} (${deviceModelResponse?.data?.deviceModelCode})`,
      href: '',
    },
  ];
  const title = {
    label: 'Menu:DeviceModelModbusTables',
    href: `/definitions/device-model-modbus-tables`,
  };

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<ContentEditSvg stroke="#344054" />}
        />
        <div className="page-wrapper__body">
          {uploadedExcelFileList ? (
            <UploaderExcelDevicesModelModbusInfoTable
              labelList={data}
              uploadedExcelFileList={uploadedExcelFileList}
              setUploadedExcelFileList={setUploadedExcelFileList}
              formulaList={formulaResponse.data?.items}
              isFetchOptionListLoading={
                formulaResponse.isLoading || deviceModelInfoResponse.isLoading
              }
              setNewItem={setNewItem}
              deviceModelProtocolId={
                deviceModelInfoResponse?.data?.deviceModelProtocolId
              }
              deviceModelResponse={deviceModelResponse}
            />
          ) : (
            <DevicesModelModbusInfoTable
              labelList={updatedLabelList}
              // filteredLabelList={updatedLabelList}
              formulaList={formulaResponse.data?.items}
              isFetchOptionListLoading={
                formulaResponse.isLoading ||
                deviceModelInfoResponse.isLoading ||
                usedLabelResponse?.isLoading
              }
              deviceModelProtocolId={
                deviceModelInfoResponse?.data?.deviceModelProtocolId
              }
              setNewItem={setNewItem}
              setUploadedExcelFileList={setUploadedExcelFileList}
              deviceModelResponse={deviceModelResponse}
            />
          )}
        </div>
      </div>
      {newItem && (
        <AddNewDeviceModelModbusModal
          deviceModelProtocolId={
            deviceModelInfoResponse?.data?.deviceModelProtocolId
          }
          labelList={updatedLabelList}
          formulaList={formulaResponse.data?.items}
          setIsVisible={setNewItem}
          modalOpen={newItem}
        />
      )}
    </>
  );
};

export default DeviceModelModbusTablesInfo;
