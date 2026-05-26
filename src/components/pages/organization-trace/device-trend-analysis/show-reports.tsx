import noData from '@/assets/images/no-chart-data.svg';
import { Loader } from '@/components/ui/loader/loader';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchPlantTrendAnalysisDeviceSensorValuesList,
  fetchPlantTrendAnalysisHeatMapGraphsList,
  fetchPlantTrendAnalysisInstantDataChartList,
  fetchPlantTrendAnalysisProductionComparisonGraphList,
  fetchPlantTrendAnalysisProductionForecastGraphList,
} from '@/services/organization-trace/plant-trend-analysis-api';
import { useQueries } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ChartCard from './chart-card';

interface ChartTypeProps {
  type: string;
  id: string;
}

interface Props {
  isChartDrawn: boolean;
  selectedChartType: any;
  handleSelectChartType: (v: string) => void;
  fields: any;
  setChartIsLoading: (v: boolean) => void;
}

// --- Main Component ---
export default function ShowPlantTrendAnalysisReports({
  isChartDrawn,
  selectedChartType,
  handleSelectChartType,
  fields,
  setChartIsLoading,
}: Props) {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter?.info,
  );

  const { control } = useFormContext()
  const watchInfo = useWatch({
    control,
    name: 'filterProfileFields',
  });

  // Ensure watchInfo is always an array
  const safeWatchInfo = useMemo(() => {
    return Array.isArray(watchInfo) ? watchInfo : [];
  }, [watchInfo]);

  const selectedParameter = useMemo(() => {
    return safeWatchInfo.find((item: any) => item?.fieldName === 'Label')?.fieldValue;
  }, [safeWatchInfo]);

  const apiMap: Record<string, any> = {
    SensorDataGraphs: fetchPlantTrendAnalysisDeviceSensorValuesList,
    InstantDataChart: fetchPlantTrendAnalysisInstantDataChartList,
    ProductionForecastGraphs:
      fetchPlantTrendAnalysisProductionForecastGraphList,
    HeatMapGraphs: fetchPlantTrendAnalysisHeatMapGraphsList,
    ProductionComparisonGraphs:
      fetchPlantTrendAnalysisProductionComparisonGraphList,
  };

  const results = useQueries({
    queries: selectedChartType.map((item: ChartTypeProps) => ({
      queryKey: [
        isChartDrawn,
        item.type,
        inserted_date,
        period_type,
        selectedParameter,
        treeData?.tree_id,
      ],
      queryFn: () =>
        apiMap[item.type]({
          tree_id: treeData?.tree_id,
          deviceIds: fields?.map((device: any) => device._id),
          date: inserted_date,
          periodType: period_type,
          SelectedParameter: selectedParameter,
        }),
      enabled:
        isChartDrawn &&
        !!treeData?.tree_id &&
        !!fields.length
    })),
  });

  const isLoading = results.some((r) => r.isLoading || r.isFetching);

  useEffect(() => {
    setChartIsLoading(isLoading);
  }, [isLoading]);

  const isError = results.some((r) => r.isError);

  return isChartDrawn ? (
    <div className="charts">
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '500px',
            gridColumn: 'span 2 / span 2',
          }}
        >
          <Loader />
        </div>
      ) : isError ? (
        <div className="error">Error loading charts</div>
      ) : (
        selectedChartType.map((type: any, index: number) => {
          const result = results[index];
          const chartData = Array.isArray(result.data) ? result.data : [];

          return chartData.length > 0 ? (
            <ChartCard
              key={type.type}
              title={type.type}
              onDelete={() => handleSelectChartType(type.type)}
              apiResponse={chartData}
            />
          ) : (
            <div key={type.type} className="no-chart-data">
              <img src={noData} alt="No data" />
              <span>{getTranslatedValue('GraphDisplayErrorMessage')}</span>
            </div>
          );
        })
      )}
    </div>
  ) : (
    <div className="no-data">
      <img src={noData} alt="" />
      <span>{getTranslatedValue('GraphDisplayErrorMessage')}</span>
    </div>
  );
}
