import Tabs from '@/components/ui/tabs/tabs';
import { fetchUserOrganizationId } from '@/services/organization-trace';
import { resetTreeState } from '@/store/features/tree-slice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AlarmsPageContentTopSection from './alarms-page-content-top-section';
import AlarmsTableMain from './alarms-table-main';

export const AlarmsPageContent = () => {
  const [activeTab, setActiveTab] = useState<string>('alarms_tab_active');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetTreeState());
    };
  }, [location.pathname]);

  const { data: orgIds } = useQuery({
    queryKey: ['app-user-organization-ids'],
    queryFn: () => fetchUserOrganizationId(),
    retry: false,
  });

  const { register, control, handleSubmit, watch, setValue } = useForm();
  const [filterData, setFilterData] = useState({
    lastUpdateUserFullNames: [],
    alarmLevels: '',
    deviceId: '',
  });

  return (
    <div className="page-wrapper__body org-trace alarms-page-content">
      <AlarmsPageContentTopSection
        watch={watch}
        onFilter={(formData: any) => {
          setFilterData((prev) => ({ ...prev, ...formData }));
        }}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        register={register}
        filterData={{ ...filterData, orgId: orgIds?.[0], alarmStatus: 1 }}
      />

      <div className="org-trace__tabs">
        <Tabs
          tabs={[
            {
              title: 'alarms_tab_active',
            },
            {
              title: 'alarms_tab_passive',
            },
          ]}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />
      </div>
      {activeTab === 'alarms_tab_active' && (
        <div className="alarms-table">
          <AlarmsTableMain
            filterData={{ ...filterData, orgId: orgIds?.[0], alarmStatus: 1 }}
          />
        </div>
      )}
      {activeTab === 'alarms_tab_passive' && (
        <div className="alarms-table">
          <AlarmsTableMain
            filterData={{ ...filterData, orgId: orgIds?.[0], alarmStatus: 2 }}
          />
        </div>
      )}
    </div>
  );
};
