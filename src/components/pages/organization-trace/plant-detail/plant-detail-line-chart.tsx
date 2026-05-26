import { memo } from 'react';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { dateFormatter, formatTime } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchPlantProductionActivePowerList,
  fetchPlantSensorRadiationList,
} from '@/services/organization-trace/plant-detail';
import LineChart from '@/components/ui/charts/line-chart/line-chart';

const MemoPlantDetailLinechart = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );

  const plantProductionActivePowerResponse = useQuery({
    queryKey: [
      'organization active power summary',
      inserted_date,
      treeData?.tree_id,
    ],
    queryFn: () =>
      fetchPlantProductionActivePowerList({
        tree_id: treeData?.tree_id,
        date: inserted_date,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const fetchPlantSensorRadiationResponse = useQuery({
    queryKey: [
      'organization sensor radiation response',
      inserted_date,
      treeData?.tree_id,
    ],
    queryFn: () =>
      fetchPlantSensorRadiationList({
        tree_id: treeData?.tree_id,
        date: inserted_date,
      }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  const activePowerData = plantProductionActivePowerResponse?.data || [];
  const sensorRadiationData = fetchPlantSensorRadiationResponse?.data || [];

  // Map data for the x-axis categories
  const xaxisList = [
    ...new Set([
      ...activePowerData.map((item: any) => item.dateText),
      ...sensorRadiationData.map((item: any) => item.dateText),
    ]),
  ];

  const series = [
    {
      name: getTranslatedValue('ActivePowImp'),
      data: xaxisList.map((x) => ({
        x,
        y:
          activePowerData.find((item: any) => item.dateText === x)
            ?.insActPowerTotal ?? 0,
      })),
    },
    {
      name: getTranslatedValue('RadiationWUnit'),
      data: xaxisList.map((x) => ({
        x,
        y:
          sensorRadiationData.find((item: any) => item.dateText === x)
            ?.ioDataValue ?? 0,
      })),
    },
  ];

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName: getTranslatedValue('organization-plant-detail'),
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = () => {
    mutation.mutate({
      url: `app/export-to-excel/export-to-excel-organization-plant-summary-chart?api-version=${
        import.meta.env.VITE_API_VERSION
      }`,
      formData: {
        data: plantProductionActivePowerResponse?.data,
        filterParameter: null,
      },
    });
  };
  const getProductionHours =
    activePowerData?.fn_App_InverterConsumptionGraphDto?.map((item: any) =>
      period_type === 'Daily'
        ? formatTime(item.consDate)
        : dateFormatter(item.consDate, false, true),
    );
  return (
    <LineChart
      title={getTranslatedValue('PowerRadiationChart')}
      series={series}
      downloadHandler={downloadHandler}
      isLoading={
        plantProductionActivePowerResponse?.isLoading ||
        fetchPlantSensorRadiationResponse?.isLoading
      }
      removeXaxisData={true}
      colors={['#00E396', '#008FFB']}
      //   legendPosition="bottom"
      chartId="plant-detail-areachart"
      dates={getProductionHours}
    />
  );
};

const PlantDetailLinechart = memo(MemoPlantDetailLinechart);

export default PlantDetailLinechart;
