import AnalysisTableContentProfileHeader from '@/components/pages/organization-trace/device-trend-analysis/analysis-table-content-profile-header';
import ShowPlantTrendAnalysisReports from '@/components/pages/organization-trace/device-trend-analysis/show-reports';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { generateRandomColors } from '@/helpers/generate-random-colors';
import { getTodayDateRaw } from '@/helpers/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchDevicesListLookup } from '@/services/system-administration/definitions/derived-values';
import { reportsAddProfileInitialValuesTypes } from '@/types/pages/reports/reports';
import { addPlantTrendAnalysisProfileInitialValues } from '@/validations/organization-trace/device-trend-analysis';
import { useQuery } from '@tanstack/react-query';
import { ChartColumnBig } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import TrendAnalysisFields from './fields';

// --- Types ---
interface Device {
  id: number;
  displayName: string;
  [key: string]: any;
}

const CHART_TYPES = [
  'ProductionComparisonGraphs',
  'HeatMapGraphs',
  'ProductionForecastGraphs',
  'InstantDataChart',
  'SensorDataGraphs',
];

// --- Main Component ---
export default function TrendAnalysisTable() {
  const treeData = useSelector((state: any) => state?.tree?.info);
  // const dispatch = useDispatch();

  const [activeSubTab, setActiveSubTab] = useState<string>(CHART_TYPES[0]);
  const [isChartDrawn, setIsChartDrawn] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [chartIsLoading, setChartIsLoading] = useState(false);

  const { year, monthNumber, day } = getTodayDateRaw();
  const todayDate = `${year}-${monthNumber}-${day}`;

  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter?.info,
  );

  const methods = useForm<reportsAddProfileInitialValuesTypes>({
    defaultValues:
      addPlantTrendAnalysisProfileInitialValues as reportsAddProfileInitialValuesTypes,
  });

  const { setValue, getValues, control } = methods;

  useEffect(() => {
    const currentFields = getValues('filterProfileFields') || [];

    // Find indices of Date and PeriodType fields
    const dateIndex = currentFields.findIndex((field: any) => field.fieldName === 'Date');
    const periodTypeIndex = currentFields.findIndex((field: any) => field.fieldName === 'PeriodType');

    // Create updated fields array
    const updatedFields = [...currentFields];

    // Update or add Date field
    if (dateIndex >= 0) {
      updatedFields[dateIndex] = {
        ...updatedFields[dateIndex],
        fieldValue: inserted_date || todayDate,
      };
    } else {
      updatedFields.push({
        fieldName: 'Date',
        fieldType: 3,
        fieldValue: inserted_date || todayDate,
        filterProfileId: 0,
      });
    }

    // Update or add PeriodType field
    if (periodTypeIndex >= 0) {
      updatedFields[periodTypeIndex] = {
        ...updatedFields[periodTypeIndex],
        fieldValue: period_type || 'Daily',
      };
    } else {
      updatedFields.push({
        fieldName: 'PeriodType',
        fieldType: 4,
        fieldValue: period_type || 'Daily',
        filterProfileId: 0,
      });
    }

    setValue('filterProfileFields', updatedFields);
  }, [inserted_date, period_type, todayDate, setValue, getValues]);

  const { data } = useQuery({
    queryKey: ['derived values device list'],
    queryFn: fetchDevicesListLookup,
    retry: false,
  });

  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  // Ensure watchInfo is always an array
  const safeWatchInfo = useMemo(() => {
    return Array.isArray(watchInfo) ? watchInfo : [];
  }, [watchInfo]);

  // Find indices of SelectedDevices and SelectedGraphs in filterProfileFields
  const devicesFieldIndex = useMemo(() => {
    return safeWatchInfo.findIndex((item: any) => item?.fieldName === 'SelectedDevices') ?? -1;
  }, [safeWatchInfo]);

  const graphsFieldIndex = useMemo(() => {
    return safeWatchInfo.findIndex((item: any) => item?.fieldName === 'SelectedGraphs') ?? -1;
  }, [safeWatchInfo]);

  // Get the current values (ensure they're arrays)
  const devicesFields = useMemo(() => {
    const fieldValue = safeWatchInfo.find((item: any) => item?.fieldName === 'SelectedDevices')?.fieldValue;
    return Array.isArray(fieldValue) ? fieldValue : [];
  }, [safeWatchInfo]);

  const graphsFields = useMemo(() => {
    const fieldValue = safeWatchInfo.find((item: any) => item?.fieldName === 'SelectedGraphs')?.fieldValue;
    return Array.isArray(fieldValue) ? fieldValue : [];
  }, [safeWatchInfo]);

  // Helper functions for SelectedDevices
  const appendDevice = useCallback((device: any) => {
    if (devicesFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const currentDevices = Array.isArray(currentFields[devicesFieldIndex]?.fieldValue)
        ? currentFields[devicesFieldIndex].fieldValue
        : [];
      const updatedFields = [...currentFields];
      updatedFields[devicesFieldIndex] = {
        ...updatedFields[devicesFieldIndex],
        fieldValue: [...currentDevices, device],
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [devicesFieldIndex, getValues, setValue]);

  const removeDevice = useCallback((index: number) => {
    if (devicesFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const currentDevices = Array.isArray(currentFields[devicesFieldIndex]?.fieldValue)
        ? currentFields[devicesFieldIndex].fieldValue
        : [];
      const updatedDevices = currentDevices.filter((_: any, i: number) => i !== index);
      const updatedFields = [...currentFields];
      updatedFields[devicesFieldIndex] = {
        ...updatedFields[devicesFieldIndex],
        fieldValue: updatedDevices,
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [devicesFieldIndex, getValues, setValue]);

  const replaceDevices = useCallback((devices: any[]) => {
    if (devicesFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const updatedFields = [...currentFields];
      updatedFields[devicesFieldIndex] = {
        ...updatedFields[devicesFieldIndex],
        fieldValue: devices,
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [devicesFieldIndex, getValues, setValue]);

  // Helper functions for SelectedGraphs
  const appendGraph = useCallback((graph: any) => {
    if (graphsFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const currentGraphs = Array.isArray(currentFields[graphsFieldIndex]?.fieldValue)
        ? currentFields[graphsFieldIndex].fieldValue
        : [];
      const updatedFields = [...currentFields];
      updatedFields[graphsFieldIndex] = {
        ...updatedFields[graphsFieldIndex],
        fieldValue: [...currentGraphs, graph],
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [graphsFieldIndex, getValues, setValue]);

  const removeGraph = useCallback((index: number) => {
    if (graphsFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const currentGraphs = Array.isArray(currentFields[graphsFieldIndex]?.fieldValue)
        ? currentFields[graphsFieldIndex].fieldValue
        : [];
      const updatedGraphs = currentGraphs.filter((_: any, i: number) => i !== index);
      const updatedFields = [...currentFields];
      updatedFields[graphsFieldIndex] = {
        ...updatedFields[graphsFieldIndex],
        fieldValue: updatedGraphs,
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [graphsFieldIndex, getValues, setValue]);

  const replaceGraphs = useCallback((graphs: any[]) => {
    if (graphsFieldIndex >= 0) {
      const currentFields = getValues('filterProfileFields') || [];
      const updatedFields = [...currentFields];
      updatedFields[graphsFieldIndex] = {
        ...updatedFields[graphsFieldIndex],
        fieldValue: graphs,
      };
      setValue('filterProfileFields', updatedFields);
    }
  }, [graphsFieldIndex, getValues, setValue]);

  // --- Effects ---
  useEffect(() => {
    if (data?.length) {
      setColors(generateRandomColors(data.length));
      setDevices(data.slice(0, 20));
    }
  }, [data]);

  useEffect(() => {
    if (!graphsFields.length || !devicesFields.length || !treeData?.tree_id)
      setIsChartDrawn(false);
  }, [graphsFields, devicesFields, treeData?.tree_id]);

  useEffect(() => {
    setIsChartDrawn(false);
  }, [devicesFields]);

  // --- Handlers ---
  const handleOpenAccordion = useCallback((id: number) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  }, []);

  const handleRemoveDevice = useCallback(
    (id: number) => {
      const itemIndex = devicesFields.findIndex((item: any) => item._id === id || item.id === id);
      if (itemIndex !== -1) {
        removeDevice(itemIndex);
      }
    },
    [devicesFields, removeDevice],
  );

  const handleSelectChartType = useCallback(
    (chart: string) => {
      const idx = graphsFields.findIndex(
        (field: any) => field.type === chart,
      );
      if (idx === -1) appendGraph({ type: chart });
      else removeGraph(idx);
    },
    [graphsFields, appendGraph, removeGraph],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      if (value.length && data) {
        setDevices(
          data.filter((device: Device) => device.displayName.includes(value)),
        );
      } else if (data) {
        const selectedIds = devicesFields.map((field: any) => field._id || field.id);
        const selectedItems = data.filter((device: Device) =>
          selectedIds.includes(device.id),
        );
        setDevices(selectedItems.length ? selectedItems : data.slice(0, 20));
      }
    },
    [data, devicesFields],
  );

  const handleShowCharts = () => {
    setIsChartDrawn(true);
  }

  const canCreateChart =
    graphsFields.length && devicesFields.length && treeData?.tree_id;

  return (
    <FormProvider {...methods}>
      <div className="org-trace__analysis-table">

        {/* Content */}
        <div className="org-trace__analysis-table-content">

          <div className="org-trace__analysis-table-content-profile">

            {/* Header */}
            <AnalysisTableContentProfileHeader
              canCreateChart={canCreateChart}
              chartIsLoading={chartIsLoading}
            />

            <div className="org-trace__analysis-table-content-profile-fields">
              <TrendAnalysisFields
                CHART_TYPES={CHART_TYPES}
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
                openAccordion={openAccordion}
                handleOpenAccordion={handleOpenAccordion}
                appendTypes={appendGraph}
                replaceTypes={replaceGraphs}
                selectedChartType={graphsFields}
                removeTypes={removeGraph}
                fields={devicesFields}
                devices={devices}
                colors={colors}
                appendDevices={appendDevice}
                replaceDevices={replaceDevices}
                handleRemoveDevice={handleRemoveDevice}
                handleSearch={handleSearch}
              />

              <Button
                disabled={!canCreateChart || chartIsLoading}
                onClick={handleShowCharts}
                variant="primary"
                className="org-trace__analysis-table-content-profile-fields-button"
              >
                <div className="row">
                  {
                    chartIsLoading ?
                      <ComponentLoader variant="secondary" /> :
                      <ChartColumnBig size={18} />
                  }

                  {getTranslatedValue('CreateChart')}
                </div>
              </Button>
            </div>
          </div>

          {/* Chart Display */}
          <div className="org-trace__analysis-table-content-charts">
            <div className="org-trace__analysis-table-content-charts-header">
              <span>
                {getTranslatedValue('Plant')}/{getTranslatedValue('DeviceTrendAnalysis')}
              </span>
            </div>
            <ShowPlantTrendAnalysisReports
              isChartDrawn={isChartDrawn}
              selectedChartType={graphsFields}
              handleSelectChartType={handleSelectChartType}
              fields={devicesFields}
              setChartIsLoading={setChartIsLoading}
            />
          </div>

        </div>

      </div>
    </FormProvider>
  );
}
