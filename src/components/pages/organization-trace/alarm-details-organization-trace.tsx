import MimicDiagramPreview from '@/components/pages/organization-trace/mimic-diagram-preview';
import YearDateInput from '@/components/ui/input/date-input/year-date-input/year-date-input';
import Tabs from '@/components/ui/tabs/tabs';
import { handleSelectedTab } from '@/helpers/organization-tree-selected-tab-handler';
import {
  fetchOrganizationData
} from '@/services/organization-trace';
import { handleChangeTree } from '@/store/features/tree-slice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlarmTable } from './alarms';
import ActivePowerSummary from './cards/active-power-summary';
import PeriodicIndexSummary from './cards/periodic-index-summary';
import { CommunicationInfo } from './communication-info';
import DeviceDetails from './device-details/device-details';
import TrendAnalysisTable from './device-trend-analysis';
import { ExtraReports } from './extra-reports';
import IndexValues from './index-value';
import InstantValue from './instant-value/instant-value';
import InverterCalculatedDataTable from './inverter-calculated-data/inverter-calculated-data';
import DeviceInverterDefinition from './inverter-instant-value/device-inverter-definition';
import InverterInstantValue from './inverter-instant-value/inverter-instant-value';
import InverterStatusTable from './inverter-status/inverter-status';
import { PlantDetail } from './plant-detail/plant-detail';
import { PlantSummaryTable } from './plant-summary-table';
import ProductComparison from './product-comparison/product-comparison';
import { ProductionForecast } from './production-forcast/production-forecast';
import SensorValue from './sensor-value/sensor-value';
import { StringValues } from './string-values/string-values';
import { SummaryTable } from './summary-table';

export const AlarmDetailsOrganizationTrace = () => {
  const [activeTab, setActiveTab] = useState<string>('organization_alarm');

  const treeData = useSelector((state: any) => state?.tree?.info);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetTreeState());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { data: orgData } = useQuery({
    queryKey: ['alarm-details-organization-data', treeData?.tree_id],
    queryFn: () => fetchOrganizationData(treeData?.tree_id),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  // useEffect(() => {
  //   if (treeData?.type) {
  //     let result = '';
  //     if (treeData?.type === 3 || treeData?.type === 4) {
  //       result = 're_plant_production_comparison';
  //     } else if (treeData?.type === 5) {
  //       result = 'em_obm_instant_values';
  //     } else if (treeData?.type === 6) {
  //       result = 'em_obm_index_values';
  //     } else if (treeData?.type === 7) {
  //       result = 'em_obm_io_sensor_value';
  //     } else result = 'organization_alarm';

  //     setActiveTab(result);
  //   }
  // }, [treeData]);

  useEffect(() => {
    // Only update when we have fresh data from the API
    if (orgData && orgData?.id === treeData?.tree_id) {
      const mimicDiagramId = treeData?.deviceModelType === 1 ?
        orgData?.deviceMimicDiagramId :
        orgData?.organizationPlantMimicDiagramId;

      dispatch(
        handleChangeTree({
          ...treeData,
          title: orgData?.organizationName,
          parentTitle:
            orgData?.organizationParentNames?.split(" / ")?.[1],
          locationId: orgData?.locationId,
          mimicDiagramId,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgData]);

  console.log('treeData in alarm-details-organization-trace.tsx', treeData, activeTab);

  return (
    <div className="page-wrapper__body org-trace">
      {!treeData?.deviceModelType && (
        <div className="org-trace__cards">
          <ActivePowerSummary />
          <PeriodicIndexSummary />
        </div>
      )}
      {treeData?.type == 6 &&
        activeTab === 'em_elec_inverter_instant_value' && (
          <DeviceInverterDefinition />
        )}
      <div className="org-trace__tabs">
        <Tabs
          tabs={handleSelectedTab(treeData?.type) ?? []}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />
        {treeData?.type !== 6 && treeData?.type !== 5 ? (
          <YearDateInput type="normal" />
        ) : null}
      </div>
      {treeData?.type === 0 && (
        <>
          {activeTab === 're_plant_summary' && <PlantSummaryTable />}
          {activeTab === 're_summary' && <SummaryTable />}
          {activeTab === 'firm_communication_info' && <CommunicationInfo />}
          {activeTab === 'authExtraReporting' && <ExtraReports />}
          {activeTab === 'organization_alarm' && <AlarmTable />}
        </>
      )}
      {treeData?.type === 1 && (
        <>
          {activeTab === 're_plant_summary' && <PlantSummaryTable />}
          {activeTab === 'organization_alarm' && <AlarmTable />}
        </>
      )}
      {treeData?.type === 3 && (
        <>
          {activeTab === 're_plant_production_comparison' && (
            <ProductComparison />
          )}
          {activeTab === 'em_org_plant_detail' && <PlantDetail />}
          {activeTab === 'TrendAnalysis' && <TrendAnalysisTable />}
          {activeTab === 're_plant_forecast' && <ProductionForecast />}
          {activeTab === 'organization_alarm' && <AlarmTable />}
          {activeTab === 'MimicDiagramPreview' && <MimicDiagramPreview />}
        </>
      )}
      {treeData?.type === 5 && (
        <>
          {activeTab === 'em_obm_instant_values' && <InstantValue />}
          {activeTab === 'em_obm_index_values' && <IndexValues orgType={5} />}
          {activeTab === 'organization_alarm' && <AlarmTable />}
          {activeTab === 'DeviceDetails' && <DeviceDetails />}
        </>
      )}

      {/* Action: Select a Renewable Power Plant  */}
      {treeData?.type === 6 && (
        <>
          {activeTab === 'em_obm_index_values' && <IndexValues />}
          {activeTab === 'em_elec_inverter_instant_value' && (
            <InverterInstantValue />
          )}
          {activeTab === 'DeviceInverterString' && <StringValues />}
          {activeTab === 'em_device_inverter_status' && <InverterStatusTable />}
          {activeTab === 'em_device_inverter_calculated_data' && (
            <InverterCalculatedDataTable />
          )}
          {activeTab === 'organization_alarm' && <AlarmTable />}
          {activeTab === 'DeviceDetails' && <DeviceDetails />}
        </>
      )}

      {/* Action: Select a Business Town District  */}
      {treeData?.type === 7 && (
        <>
          {activeTab === 'em_obm_io_sensor_value' && <SensorValue />}
          {activeTab === 'organization_alarm' && <AlarmTable />}
          {activeTab === 'DeviceDetails' && <DeviceDetails />}
        </>
      )}
    </div>
  );
};
