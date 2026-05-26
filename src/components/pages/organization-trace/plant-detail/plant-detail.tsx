import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchPlantProductionActivePowerList } from '@/services/organization-trace/plant-detail';
import PlantDetailCustomChart from './plant-detail-custom-charts';
import { PlantDetailTable } from './plant-detail-table';

export const PlantDetail = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { inserted_date } = useSelector((state: any) => state.dateFilter.info);

  // Fetch active power data
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
  });

  // Default to empty arrays if data is undefined
  // const activePowerData = plantProductionActivePowerResponse.data ?? [];
  // const sensorRadiationData = fetchPlantSensorRadiationResponse.data ?? [];

  // // Create unique sorted x-axis categories from both data sources
  // const xaxisList = Array.from(
  //   new Set([
  //     ...activePowerData.map((item: any) => item.dateText),
  //     ...sensorRadiationData.map((item: any) => item.dateText),
  //   ]),
  // ).sort();

  // Prepare series for chart with x/y pairs
  // const series = [
  //   {
  //     name: getTranslatedValue('ActivePowImp'),
  //     data: xaxisList.map((x) => ({
  //       x,
  //       y:
  //         activePowerData.find((item: any) => item.dateText === x)
  //           ?.insActPowerTotal ?? 0,
  //     })),
  //   },
  //   {
  //     name: getTranslatedValue('RadiationWUnit'),
  //     data: xaxisList.map((x) => ({
  //       x,
  //       y:
  //         sensorRadiationData.find((item: any) => item.dateText === x)
  //           ?.ioDataValue ?? 0,
  //     })),
  //   },
  // ];

  return (
    <div className="plant-detail">
      <div className="plant-detail__charts">
        <PlantDetailCustomChart
          title={getTranslatedValue('PowerRadiationChart')}
          series={plantProductionActivePowerResponse?.data?.series as any}
          isLoading={plantProductionActivePowerResponse.isLoading}
          colors={['#00E396', '#008FFB']}
          chartId="plant-detail-areachart"
        />
      </div>
      <div className="plant-detail__table">
        <PlantDetailTable />
        </div>
    </div>
  );
};
