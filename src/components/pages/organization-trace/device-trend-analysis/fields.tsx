import { CloseSvg } from '@/assets/icons/close-svg';
import { SearchSvg } from '@/assets/icons/search-svg';
import Accordion from '@/components/ui/accordion/accordion';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { Input } from '@/components/ui/input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import { instantDataChartParameters } from '@/enum-data/organization-trace/org-trace-index';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface Device {
  id: number;
  displayName: string;
  [key: string]: any;
}

interface TrendAnalysisAccordionsProps {
  CHART_TYPES: string[];
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  openAccordion: number | null;
  handleOpenAccordion: (id: number) => void;
  selectedChartType: any[];

  fields: any[];
  devices: Device[];
  colors: string[];

  handleRemoveDevice: (id: number) => void;
  replaceDevices: any;
  appendDevices: any;

  replaceTypes: any;
  appendTypes: any;
  removeTypes: any;

  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TrendAnalysisFields({
  CHART_TYPES,
  replaceDevices,
  appendTypes,
  replaceTypes,
  removeTypes,
  openAccordion,
  handleOpenAccordion,
  selectedChartType,
  fields,
  devices,
  colors,
  appendDevices,
  handleRemoveDevice,
  handleSearch,
}: TrendAnalysisAccordionsProps) {

  const { control, setValue } = useFormContext()

  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  // Ensure watchInfo is always an array
  const safeWatchInfo = useMemo(() => {
    return Array.isArray(watchInfo) ? watchInfo : [];
  }, [watchInfo]);

  const selectedParameter = useMemo(() => {
    return safeWatchInfo.find((item: any) => item?.fieldName === 'Label')
      ?.fieldValue;
  }, [safeWatchInfo]);

  const [isAllDevicesSelected, setIsAllDevicesSelected] =
    useState<boolean>(false);

  const [isAllTypesSelected, setIsAllTypesSelected] = useState<boolean>(false);

  const handleSelectDevice = useCallback(
    (device: Device) => {
      const deviceIsSelected = fields.some(
        (field: any) => field._id === device.id || field.id === device.id,
      );

      if (deviceIsSelected) {
        handleRemoveDevice(device.id);
        return;
      }

      appendDevices({ ...device, _id: device.id });
    },
    [appendDevices, fields, handleRemoveDevice],
  );
  const handleSelectAllDevices = () => {
    if (isAllDevicesSelected) {
      setIsAllDevicesSelected(false);
      replaceDevices([]);
    } else {
      const formattedDevices = devices.map((device: any) => ({
        ...device,
        _id: device.id,
      }));
      replaceDevices(formattedDevices);
      setIsAllDevicesSelected(true);
    }
  };
  const handleSelectAllTypes = () => {
    const allTypesSelected =
      CHART_TYPES.length > 0 &&
      CHART_TYPES.every((type) =>
        selectedChartType.some((field: any) => field.type === type),
      );

    if (allTypesSelected) {
      replaceTypes([]);
    } else {
      replaceTypes(CHART_TYPES.map((type) => ({ type })));
    }
  };
  const handleSelectChartType = useCallback(
    (chart: string) => {
      const idx = selectedChartType.findIndex(
        (field: any) => field.type === chart,
      );
      if (idx === -1) appendTypes({ type: chart });
      else removeTypes(idx);
    },
    [selectedChartType, appendTypes, removeTypes],
  );

  useEffect(() => {
    const allSelected =
      devices.length > 0 &&
      devices.every((device: any) =>
        fields.some((field: any) => (field._id ?? field.id) === device.id),
      );

    setIsAllDevicesSelected(allSelected);
  }, [devices, fields]);

  useEffect(() => {
    // Check if all chart types are selected
    const allTypesSelected =
      CHART_TYPES.length > 0 &&
      CHART_TYPES.every((type) =>
        selectedChartType.some((field: any) => field.type === type),
      );

    setIsAllTypesSelected(allTypesSelected);
  }, [selectedChartType, CHART_TYPES]);

  return (
    <>
      {/* Chart Type Selection */}
      <Accordion
        title={getTranslatedValue('SelectYourGraphics')}
        clickHandler={handleOpenAccordion}
        titleBadge={
          <div
            className={`accrodion-badge ${selectedChartType.length ? 'has-item' : ''}`}
          >
            {selectedChartType.length
              ? `${selectedChartType.length} ${getTranslatedValue('GraphicSelected')}`
              : getTranslatedValue('NoGraphicSelected')}
          </div>
        }
        id={1}
        isSelected={openAccordion}
      >
        <div className="accordion-content">
          {/* <Tabs
                      tabs={CHART_TYPES.map((type) => ({
                          title: getTranslatedValue(type),
                          value: type,
                      }))}
                      activeTab={activeSubTab}
                      onTabClick={setActiveSubTab}
                  /> */}
          <Toggle
            isOn={isAllTypesSelected}
            setIsOn={handleSelectAllTypes}
            label={getTranslatedValue('SelectAll')}
          />

          <div className="chart-type-options">
            {CHART_TYPES.map((type) => (
              <div
                key={type}
                onClick={(e) => {
                  // Only handle click if it's not on the checkbox
                  if ((e.target as HTMLElement).closest('.custom-checkbox')) {
                    return;
                  }
                  handleSelectChartType(type);
                }}
                className={`${selectedChartType.find((field: any) => field.type === type) ? 'active' : ''} chart-type-options__option`}
              >
                {getTranslatedValue(type)}
                <Checkbox
                  checked={
                    !!selectedChartType.find(
                      (field: any) => field.type === type,
                    )
                  }
                  onChange={() => {
                    handleSelectChartType(type);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Accordion>

      {selectedChartType?.findIndex(
        (elem) => elem.type === 'InstantDataChart',
      ) > -1 && (
          <Accordion
            title={getTranslatedValue('InstantDataChart.Parameters')}
            clickHandler={handleOpenAccordion}
            id={5}
            isSelected={openAccordion}
          >
            <div className="accordion-content">
              <SearchableDropdown
                name="SelectedParameter"
                label={''}
                searchParameterLabel={'title'}
                options={instantDataChartParameters()}
                selectedVal={
                  selectedParameter >= 0
                    ? instantDataChartParameters()?.find(
                      (item: any) => item.value == selectedParameter,
                    )?.title
                    : null
                }
                placeholder={getTranslatedValue('Search')}
                handleChange={(e: any) => {
                  const labelFieldIndex = safeWatchInfo.findIndex(
                    (item: any) => item?.fieldName === 'Label',
                  );
                  if (labelFieldIndex !== -1) {
                    safeWatchInfo[labelFieldIndex] = {
                      ...safeWatchInfo[labelFieldIndex],
                      fieldValue: e,
                    };
                    setValue('filterProfileFields', safeWatchInfo);
                  }
                }}
                isLoading={false}
                isRequiredInput={true}
              />
            </div>
          </Accordion>
        )}

      {/* Device Selection */}
      <Accordion
        title={getTranslatedValue('select_a_device')}
        titleBadge={
          <div className={`accrodion-badge ${fields.length ? 'has-item' : ''}`}>
            {fields.length
              ? `${fields.length} ${getTranslatedValue('DeviceSelected')}`
              : getTranslatedValue('NoDeviceSelected')}
          </div>
        }
        clickHandler={handleOpenAccordion}
        id={2}
        isSelected={openAccordion}
      >
        <div className="accordion-content">
          <div className="devices-list-header">
            <Input
              leftIcon={<SearchSvg />}
              onChange={handleSearch}
              placeholder={getTranslatedValue('search')}
            />
            <Toggle
              isOn={isAllDevicesSelected}
              setIsOn={handleSelectAllDevices}
              label={getTranslatedValue('SelectAll')}
            />
          </div>
          <div className="devices-list">
            {devices.map((device, index) => (
              <div
                key={device.id}
                onClick={() => handleSelectDevice(device)}
                className={`devices-list__device ${fields.find((field: any) => field._id === device.id) ? 'selected' : ''}`}
              >
                <span
                  style={{ background: colors[index] }}
                  className="color"
                ></span>
                {device.displayName}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDevice(device.id);
                  }}
                >
                  <CloseSvg />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Accordion>
    </>
  );
}
