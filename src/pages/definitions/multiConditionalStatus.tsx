import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewMultiConditionalStatusModal from '@/components/pages/definitions/multi-conditional-status/new-modal';
import MultiConditionalStatusTable from '@/components/pages/definitions/multi-conditional-status/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchDefinitionsDerivedValueLookup,
  fetchDefinitionsDeviceLookup,
  fetchDefinitionsLabelLookup,
  fetchDefinitionsTimePeriodLookup,
  fetchDefinitionsUserLookup,
} from '@/services/definitions/multi-conditional-status/multi-conditional-status-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export const MultiConditionalStatus = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    {
      label: 'Menu:MultiConditionalStatuses',
      href: '',
    },
  ];
  const title = {
    label: 'Menu:MultiConditionalStatuses',
    href: ``,
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ['Time Period Lookup'],
        queryFn: () => fetchDefinitionsTimePeriodLookup(),
        retry: false,
      },
      {
        queryKey: ['Device Lookup'],
        queryFn: () => fetchDefinitionsDeviceLookup({}),
        retry: false,
      },
      {
        queryKey: ['Lable Lookup'],
        queryFn: () => fetchDefinitionsLabelLookup(),
        retry: false,
      },
      {
        queryKey: ['Derived Value Lookup'],
        queryFn: () => fetchDefinitionsDerivedValueLookup({}),
        retry: false,
      },
      {
        queryKey: ['User Lookup'],
        queryFn: () => fetchDefinitionsUserLookup({}),
        retry: false,
      },
    ],
  });

  const [
    getTimePeriodLookupResponse,
    getDeviceLookupResponse,
    getLabelLookupyResponse,
    getDerivedValueLookupResponse,
    getUserLookupResponse,
  ] = results;

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<DefinitionsDevicesSvg />}
        />
        <div className="page-wrapper__body">
          <MultiConditionalStatusTable
            timePeriodLookupResponse={getTimePeriodLookupResponse?.data?.items}
            deviceLookupResponse={getDeviceLookupResponse?.data?.items}
            labelLookupyResponse={getLabelLookupyResponse?.data?.items}
            derivedValueLookupResponse={
              getDerivedValueLookupResponse?.data?.items
            }
            userLookupResponse={getUserLookupResponse?.data?.items}
            setNewItem={getPermission('WebNet.MultiConditionalStatuses.Create') && setNewItem}
          />
        </div>
      </div>
      {getPermission('WebNet.MultiConditionalStatuses.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <NewMultiConditionalStatusModal
            setShowEditModal={setNewItem}
            timePeriodLookupResponse={getTimePeriodLookupResponse?.data?.items}
            deviceLookupResponse={getDeviceLookupResponse?.data?.items}
            labelLookupyResponse={getLabelLookupyResponse?.data?.items}
            derivedValueLookupResponse={
              getDerivedValueLookupResponse?.data?.items
            }
            userLookupResponse={getUserLookupResponse?.data?.items}
          />
        </Modal>
      )}
    </>
  );
};
