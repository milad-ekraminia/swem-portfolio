import { useEffect, useState } from 'react';
import { handleSelectedTab } from '@/helpers/organization-tree-selected-tab-handler';
import { handleChangeTree, resetTreeState } from '@/store/features/tree-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';
import YearDateInput from '@/components/ui/input/date-input/year-date-input/year-date-input';
import { Loader } from '@/components/ui/loader/loader';
import Tabs from '@/components/ui/tabs/tabs';
import MimicDiagramPreview from '@/components/pages/organization-trace/mimic-diagram-preview';
import {
  mockCurrentOrgData,
  mockOrgData,
  mockOrgIds,
} from '@/components/pages/organization-trace/mock-data';
import { AlarmTable } from './alarms';
import ActivePowerSummary from './cards/active-power-summary';
import PeriodicIndexSummary from './cards/periodic-index-summary';
import { CommunicationInfo } from './communication-info';
import DeviceDetails from './device-details/device-details';
import IndexValues from './index-value';
import InstantValue from './instant-value/instant-value';
import InverterCalculatedDataTable from './inverter-calculated-data/inverter-calculated-data';
import DeviceInverterDefinition from './inverter-instant-value/device-inverter-definition';
import InverterInstantValue from './inverter-instant-value/inverter-instant-value';
import InverterStatusTable from './inverter-status/inverter-status';
import { PlantDetail } from './plant-detail/plant-detail';
import { PlantSummaryTable } from './plant-summary-table';
import ProductComparison from './product-comparison/product-comparison';
import SensorValue from './sensor-value/sensor-value';
import { StringValues } from './string-values/string-values';
import { SummaryTable } from './summary-table';

export const OrgTrace = () => {
  const [activeTab, setActiveTab] = useState<string>('re_plant_summary');

  const treeData = useSelector((state: any) => state?.tree?.info);
  const dispatch = useDispatch();

  const [isMockLoading, setIsMockLoading] = useState(true);
  const [orgIds, setOrgIds] = useState<number[] | null>(null);
  const [orgData, setOrgData] = useState<any>(null);
  const [currentOrgData, setCurrentOrgData] = useState<any>(null);

  useEffect(() => {
    return () => {
      dispatch(resetTreeState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = globalThis.setTimeout(() => {
      setOrgIds(mockOrgIds);
      setOrgData(mockOrgData);
      setCurrentOrgData(mockCurrentOrgData);
      setIsMockLoading(false);
    }, 2000);

    return () => {
      globalThis.clearTimeout(timer);
    };
  }, []);

  const [activePowerRefreshRate, periodicIndexRefreshRate] =
    useDataRefreshRates([490, 498]);

  useEffect(() => {
    if (orgIds?.find((elem: number) => elem === treeData?.tree_id)) {
      setActiveTab('re_plant_summary');
    } else if (treeData?.type) {
      let result = '';
      if (treeData?.type === 3 || treeData?.type === 4) {
        result = 're_plant_production_comparison';
      } else if (treeData?.type === 5) {
        result = 'em_obm_instant_values';
      } else if (treeData?.type === 6) {
        result = 'em_obm_index_values';
      } else if (treeData?.type === 7) {
        result = 'em_obm_io_sensor_value';
      } else result = 're_plant_summary';

      setActiveTab(result);
    }
  }, [treeData, orgIds]);
  console.log('🚀 ~ OrgTrsegesgace ~ result:', treeData, orgIds);

  useEffect(() => {
    // Only update when we have fresh data from the API
    if (currentOrgData && currentOrgData?.id === treeData?.tree_id) {
      const mimicDiagramId =
        treeData?.deviceModelType === 1
          ? currentOrgData?.deviceMimicDiagramId
          : currentOrgData?.organizationPlantMimicDiagramId;

      dispatch(
        handleChangeTree({
          ...treeData,
          title: currentOrgData?.organizationName,
          parentTitle:
            currentOrgData?.organizationParentNames?.split(' / ')?.[1],
          locationId: currentOrgData?.locationId,
          mimicDiagramId,
        }),
      );
    } else if (orgData && !treeData?.tree_id) {
      // Only set initial organization data when tree is not set yet
      const mimicDiagramId =
        treeData?.deviceModelType === 1
          ? orgData?.deviceMimicDiagramId
          : orgData?.organizationPlantMimicDiagramId;

      dispatch(
        handleChangeTree({
          tree_id: orgData?.id,
          title: orgData?.organizationName,
          parentTitle: orgData?.organizationParentNames?.split(' / ')?.[1],
          type: 0, // organization
          deviceModelType: 0, // organization
          locationId: orgData?.locationId,
          mimicDiagramId,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgData, currentOrgData]);

  if (isMockLoading) {
    return <Loader />;
  }

  console.log('🚀 ~ asfawf ~ treeData:', treeData);
  return (
    <div className="page-wrapper__body org-trace">
      {!treeData?.deviceModelType && (
        <div className="org-trace__cards">
          <ActivePowerSummary refetchInterval={activePowerRefreshRate} />
          <PeriodicIndexSummary refetchInterval={periodicIndexRefreshRate} />
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
          {/* {activeTab === 're_plant_forecast' && <ProductionForecast />} */}
          {/* {activeTab === 'TrendAnalysis' && <TrendAnalysisTable />} */}
          {activeTab === 'organization_alarm' && <AlarmTable />}
          {activeTab === 'MimicDiagramPreview' && <MimicDiagramPreview />}
        </>
      )}
      {treeData?.type === 5 && (
        <>
          {activeTab === 'em_obm_instant_values' && <InstantValue />}
          {activeTab === 'em_obm_index_values' && <IndexValues orgType={5} />}
          {activeTab === 'organization_alarm' && <AlarmTable isDeviceAlarm />}
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
          {activeTab === 'organization_alarm' && <AlarmTable isDeviceAlarm />}
          {activeTab === 'DeviceDetails' && <DeviceDetails />}
        </>
      )}

      {/* Action: Select a Business Town District  */}
      {treeData?.type === 7 && (
        <>
          {activeTab === 'em_obm_io_sensor_value' && <SensorValue />}
          {activeTab === 'organization_alarm' && <AlarmTable isDeviceAlarm />}
          {activeTab === 'DeviceDetails' && <DeviceDetails />}
        </>
      )}
    </div>
  );
};
