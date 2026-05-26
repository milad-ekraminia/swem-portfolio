import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { ExportSvg } from '@/assets/icons/export-svg';
import { SettingSvg } from '@/assets/icons/setting-svg';
import { Button } from '@/components/ui/button/button';
import { DropdownWrapper } from '@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper';
import FilterContent from '@/components/ui/table/filter-content/filter-content';
import { finalDevicesModelModbusInfoTableHeaders } from '@/enum-data/definitions/device-model-modbus-info-tables';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { DevicesModelModbusInfoTableHeaderTypes } from '@/types/pages/definitions/device-model-modbus-info-table-header-types';
import { ArrowLeft, ArrowRight, DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export const DevicesModelModbusInfoTableHeader = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  setShowUploadExcel,
  setNewItem,
  handleDownload,
  onBack,
}: DevicesModelModbusInfoTableHeaderTypes) => {
  const [resetCount, setResetCount] = useState(0);
  const isRTL = getCookie('CultureName') === 'fa';

  const resetFilter = () => setResetCount((prev) => prev + 1);

  const deviceModelsTableColumns = finalDevicesModelModbusInfoTableHeaders({
    queryKey: '',
    onEdit: () => { },
    deviceModelProtocolId: 0,
    labelList: [],
    formulaList: [],
    asduTypesLookup: [],
  });
  return (
    <div className="devices-model-modbus-info-table-header">
      <span className="title">
        <button onClick={onBack}>
          {isRTL ? (
            <ArrowRight stroke="#344054" width={20} height={20} />
          ) : (
            <ArrowLeft stroke="#344054" width={20} height={20} />
          )}
        </button>
        {getTranslatedValue('Update')}
      </span>
      <div className="actions">
        <Button
          onClick={() => setNewItem(true)}
          leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
        >
          {getTranslatedValue('NewDeviceModelModbusTable')}
        </Button>
        <Button
          onClick={() => setShowUploadExcel(true)}
          leftIcon={<ExportSvg stroke="#344054" />}
          variant="secondary"
        >
          {getTranslatedValue('ImportFromExcel')}
        </Button>

        <Button variant="secondary" onClick={handleDownload}>
          <DownloadIcon stroke="#344054" width={20} height={20} />
        </Button>
        <DropdownWrapper
          title={getTranslatedValue('ColumnsList')}
          toggleBtn={
            <Button
              leftIcon={<SettingSvg fill="var(--brand-600)" />}
              variant="secondary"
            />
          }
          closeButton={true}
          direction="left"
          size="semi-medium"
          bottomButtons={
            <div>
              <Button onClick={resetFilter} variant="secondary">
                {getTranslatedValue('Clear', 'AbpUi.texts')}
              </Button>
            </div>
          }
        >
          <FilterContent
            setSelectedColumnKeys={setSelectedColumnKeys}
            selectedColumnKeys={selectedColumnKeys}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            resetSignal={resetCount}
            columns={deviceModelsTableColumns}
          />
        </DropdownWrapper>
      </div>
    </div>
  );
};
