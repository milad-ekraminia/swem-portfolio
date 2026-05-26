import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import AddNewLocationModal from '@/components/pages/system-administration/dashboard-map/new-modal';
import DashboardMapTable from '@/components/pages/system-administration/dashboard-map/table';
import {
  dashboardMapBreadcrumbs,
  dashboardMapTitle,
} from '@/enum-data/system-administration/dashboard-map-data';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchIntegerConfigurationNg,
  fetchIntegerConfigurationRe,
} from '@/services/definitions/organizations/integer-configuration';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export default function DashboardMap() {
  const [newItem, setNewItem] = useState<boolean>(false);

  const integerConfigs = useQueries({
    queries: [
      {
        queryKey: ['Integer Configuration Ng'],
        queryFn: () => fetchIntegerConfigurationNg(),
        retry: false,
      },
      {
        queryKey: ['Integer Configuration Re'],
        queryFn: () => fetchIntegerConfigurationRe(),
        retry: false,
      },
    ],
  });

  const [ngConfig, reConfig] = integerConfigs;

  return (
    <>
      <div className="page-wrapper">
        {/* <OrganizationsHeader /> */}
        <PagesHeader
          breadcrumbs={dashboardMapBreadcrumbs}
          title={dashboardMapTitle}
          icon={<SingleUserSettingSvg />}
        />

        <div className="page-wrapper__body">
          <DashboardMapTable
            ng={ngConfig.data}
            re={reConfig.data}
            activeTab={'mobile_lang_all_of'}
            setNewItem={
              getPermission('WebNet.Organizations.Create') && setNewItem
            }
          />
        </div>
      </div>
      {getPermission('WebNet.Organizations.Create') && newItem && (
        <AddNewLocationModal
          ng={ngConfig.data}
          re={reConfig.data}
          setIsVisible={setNewItem}
        />
      )}
    </>
  );
}
