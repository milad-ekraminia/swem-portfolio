import DashboardHeader from '@/components/layouts/page-layout/dashboard-header/dashboard-header';
import DashboardMapBox from '@/components/pages/dashboard/map-box';
import DashboardActivePowerCard from '@/components/pages/organization-trace/dashboard/active-power-card';
import AlarmStatusType from '@/components/pages/organization-trace/dashboard/alarm-status-type';
import PanelsTable from '@/components/pages/organization-trace/dashboard/panels-table';
import PeriodicIndexSummary from '@/components/pages/organization-trace/dashboard/periodic-index-summary';
import SolarEnergyWidget from '@/components/pages/organization-trace/dashboard/solar-energy-widget';
import SolarGeneratedEnergyWidget from '@/components/pages/organization-trace/dashboard/solar-generated-energy-widget';
import TotalEnergyWidget from '@/components/pages/organization-trace/dashboard/total-energy-widget';
import TotalGeneratedEnergyWidget from '@/components/pages/organization-trace/dashboard/total-generated-energy-widget';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import Tabs from '@/components/ui/tabs/tabs';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { timeAgoFrom } from '@/helpers/time-ago';
import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { fetchUserOrganizationId } from '@/services/organization-trace';
import { fetchCountryAlarmsStatusList, fetchOrganizationActiveAlarmsCount } from '@/services/organization-trace/dashboard-api';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';


export const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [tab, setTab] = useState<'total' | 'solar-panel' | 'wind-panel'>(
    'total',
  );
  const [viewType, setViewType] = useState<'grid' | 'map'>('map');
  const [dashboardKey, setDashboardKey] = useState(1);

  const context = useOrgTraceContext();

  const [alarmStatusTypeRefreshInterval] = useDataRefreshRates([495]);
  const [mapDataRefreshInterval] = useDataRefreshRates([505]);

  const tabs = [
    {
      title: getTranslatedValue('All'),
      value: 'total',
    },
    {
      title: getTranslatedValue('SolarEnergy'),
      value: 'solar-panel',
    },
    {
      title: getTranslatedValue('WindEnergy'),
      value: 'wind-panel',
      disabled: true,
    },
  ];

  const results = useQueries({
    queries: [
      {
        queryKey: ['app-user-organization-ids'],
        queryFn: () => fetchUserOrganizationId(),
        retry: false,
        refetchInterval: mapDataRefreshInterval
          ? mapDataRefreshInterval
          : false,
      },
      {
        queryKey: ['Country Alarms Status'],
        queryFn: () => fetchCountryAlarmsStatusList(),
        retry: false,
        refetchInterval: mapDataRefreshInterval
          ? mapDataRefreshInterval
          : false,
      },
    ],
  });

  // Destructure results
  const { data: orgIds } = results?.[0] ?? { data: [] };
  const { data: provinceData, isLoading: provinceLoader } = results?.[1] ?? {
    data: null,
  };
  const { data: status } = useQuery({
    queryKey: ['Organization Active Alarms Count'],
    queryFn: () =>
      fetchOrganizationActiveAlarmsCount({
        orgId: orgIds?.[0] ?? 0,
      }),
    retry: false,
    enabled: !!orgIds?.[0],
    refetchInterval: alarmStatusTypeRefreshInterval
      ? alarmStatusTypeRefreshInterval
      : false,
  });

  useEffect(() => {
    setDashboardKey(dashboardKey + 1);
  }, [drawerOpen, context?.showRightSideBar]);

  return (
    <div className="page-wrapper">
      <DashboardHeader />

      <div className="content-container">
        <div className="container">
          <Tabs
            activeTab={tab}
            onTabClick={(value: any) => setTab(value)}
            tabs={tabs}
          />
          {/* Cards */}
          <div className="cards">
            <DashboardActivePowerCard
              mapDataRefreshInterval={mapDataRefreshInterval}
              orgId={orgIds?.[0] ?? 0}
            />
            <PeriodicIndexSummary
              mapDataRefreshInterval={mapDataRefreshInterval}
              orgId={orgIds?.[0] ?? 0}
            />
          </div>
          {/* Status */}
          <AlarmStatusType status={status} orgId={orgIds?.[0] ?? 0} />
          {/* Panels */}
          <div className="panels">
            {/* Title */}
            <div className="panels-info-container">
              <div className="panels-info">
                <div className="panels-info__title">
                  {tab === 'total'
                    ? getTranslatedValue('AllItems')
                    : tab === 'solar-panel'
                      ? getTranslatedValue('SolarEnergy')
                      : ''}
                </div>
                <div className="panels-info__description">
                  {getTranslatedValue('latest_updates')}{' '}
                  {timeAgoFrom(provinceData?.lastReadDateTime)}
                </div>
              </div>

              {tab === 'solar-panel' && (
                <div className="panels-view-type">
                  {getTranslatedValue('ListView')}
                  <Toggle
                    isOn={viewType === 'grid'}
                    setIsOn={() => {
                      if (viewType === 'grid') setViewType('map');
                      else setViewType('grid');
                    }}
                    label={getTranslatedValue('MapView')}
                  />
                </div>
              )}
            </div>

            {/* Design / List */}
            {tab === 'total' ||
              (tab === 'solar-panel' && viewType === 'grid') ? (
              <div className="map-design">
                <DashboardMapBox
                  provinceData={provinceData?.alarmStatuses}
                  isLoading={provinceLoader}
                  key={dashboardKey}
                />
              </div>
            ) : (
              <div className="panels-list">
                <PanelsTable mapDataRefreshInterval={mapDataRefreshInterval} />
              </div>
            )}
          </div>
        </div>

        {/* Drawer */}
        <div
          className="drawer"
          style={{
            width: drawerOpen ? 500 : 0,
            visibility: drawerOpen ? 'visible' : 'hidden',
          }}
        >
          <div className="widget-container">
            {tab === 'total' ? (
              <TotalEnergyWidget
                mapDataRefreshInterval={mapDataRefreshInterval ?? 0}
              />
            ) : tab === 'solar-panel' ? (
              <SolarEnergyWidget
                mapDataRefreshInterval={mapDataRefreshInterval ?? 0}
              />
            ) : (
              <></>
            )}
          </div>

          <div className="widget-container">
            {tab === 'total' ? (
              <TotalGeneratedEnergyWidget
                mapDataRefreshInterval={mapDataRefreshInterval ?? 0}
                orgId={orgIds?.[0] ?? 0}
              />
            ) : tab === 'solar-panel' ? (
              <SolarGeneratedEnergyWidget
                mapDataRefreshInterval={mapDataRefreshInterval ?? 0}
                orgId={orgIds?.[0] ?? 0}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <DrawerToggle drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </div>
    </div>
  );
};

const DrawerToggle = ({
  drawerOpen,
  setDrawerOpen,
}: {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(!drawerOpen)}
      className="drawer-toggle"
      style={{
        [isRTL ? 'left' : 'right']: drawerOpen ? '485px' : '16px',
      }}
    >
      {drawerOpen ? (
        isRTL ? (
          <ChevronsLeft stroke="#98A2B3" />
        ) : (
          <ChevronsRight stroke="#98A2B3" />
        )
      ) : isRTL ? (
        <ChevronsRight stroke="#98A2B3" />
      ) : (
        <ChevronsLeft stroke="#98A2B3" />
      )}
    </button>
  );
};