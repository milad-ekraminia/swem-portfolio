import { ContentEditSvg } from '@/assets/icons/content-edit-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import AddNewOrganization from '@/components/pages/definitions/organizations/new-modal';
import OrganizationsTable from '@/components/pages/definitions/organizations/table';
import Tabs from '@/components/ui/tabs/tabs';
import {
  organizationsBreadcrumbs,
  organizationsTitle,
} from '@/enum-data/definitions/organizations-data';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchIntegerConfigurationNg,
  fetchIntegerConfigurationRe,
} from '@/services/definitions/organizations/integer-configuration';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export default function Organizations() {
  const [activeTab, setActiveTab] = useState<string>('mobile_lang_all_of');
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
          breadcrumbs={organizationsBreadcrumbs}
          title={organizationsTitle}
          icon={<ContentEditSvg />}
        />

        <div className="page-wrapper__body">
          <Tabs
            tabs={[
              {
                title: 'mobile_lang_all_of',
              },
              {
                title: 'SolarEnergy',
              },
              {
                title: 'WindEnergy',
              },
            ]}
            activeTab={activeTab}
            onTabClick={() => {
              setActiveTab('mobile_lang_all_of');
            }}
          />

          <OrganizationsTable
            ng={ngConfig.data}
            re={reConfig.data}
            activeTab={activeTab}
            setNewItem={
              getPermission('WebNet.Organizations.Create') && setNewItem
            }
          />
        </div>
      </div>
      {getPermission('WebNet.Organizations.Create') && newItem && (
        <AddNewOrganization
          ng={ngConfig.data}
          re={reConfig.data}
          setIsVisible={setNewItem}
        />
      )}
    </>
  );
}
