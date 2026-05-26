import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewDeviceModal from '@/components/pages/definitions/devices/new-modal';
import { DevicesTable } from '@/components/pages/definitions/devices/table';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchDefinitionsDeviceModelLookupModelTypeList,
  fetchDeviceAccessPointLookupList,
  fetchDeviceCategoryLookupList,
  fetchDeviceLabelLookupList,
  fetchDeviceOrganizationLookupList,
} from '@/services/definitions/devices/devices-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export const Devices = () => {
  const [newItem, setNewItem] = useState(false);
  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    { label: 'Menu:Devices', href: '' },
  ];
  const title = {
    label: 'Menu:Devices',
    href: ``,
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ['Organization Lookup'],
        queryFn: () => fetchDeviceOrganizationLookupList(),
        retry: false,
      },
      {
        queryKey: ['Device Model Lookup by Model Type'],
        queryFn: () => fetchDefinitionsDeviceModelLookupModelTypeList({}),
        retry: false,
      },
      {
        queryKey: ['Get Device Category Lookup'],
        queryFn: () => fetchDeviceCategoryLookupList(),
        retry: false,
      },
      {
        queryKey: ['Access Point Lookup'],
        queryFn: () => fetchDeviceAccessPointLookupList(),
        retry: false,
      },
      {
        queryKey: ['Label Lookup'],
        queryFn: () => fetchDeviceLabelLookupList(),
        retry: false,
      },
    ],
  });
  const isLookupsLoading = results.some((r) => r.isLoading);
  const isLookupsError = results.some((r) => r.isError);
  const [
    getDeviceOrganizationResponse,
    getDeviceModelResponse,
    getDeviceCategoryResponse,
    getDeviceAccessPointResponse,
    getDeviceLabelResponse,
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
          {!isLookupsLoading && !isLookupsError ? (
            <DevicesTable
              organizationResponse={getDeviceOrganizationResponse?.data}
              deviceModelResponse={getDeviceModelResponse?.data}
              deviceCategoryResponse={getDeviceCategoryResponse?.data}
              deviceAccessPointResponse={getDeviceAccessPointResponse?.data}
              getDeviceLabelResponse={getDeviceLabelResponse?.data}
              setNewItem={getPermission('WebNet.Devices.Create') && setNewItem}
              isLoading={isLookupsLoading}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      {getPermission('WebNet.Devices.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <NewDeviceModal
            setShowEditModal={setNewItem}
            deviceCategoryResponse={getDeviceCategoryResponse?.data}
            deviceAccessPointResponse={getDeviceAccessPointResponse?.data}
            getDeviceLabelResponse={getDeviceLabelResponse}
          />
        </Modal>
      )}
    </>
  );
};
