import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewAlarmConfigurationModal from '@/components/pages/definitions/alarm-configurations/new-modal';
import AlarmConfigurationsTable from '@/components/pages/definitions/alarm-configurations/table';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchAlarmConfigurationsDeviceLookup,
  fetchAlarmConfigurationsLabelLookup,
  fetchTimePeriodsLookup,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export const AlarmConfigurations = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Menu:Definitions', href: '' },
    {
      label: 'Menu:AlarmConfigurations',
      href: '',
    },
  ];
  const title = {
    label: 'Menu:AlarmConfigurations',
    href: ``,
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ['alarm-configurations/device-lookup'],
        queryFn: () => fetchAlarmConfigurationsDeviceLookup(),
        retry: false,
      },
      {
        queryKey: ['alarm-configurations/label-lookup'],
        queryFn: () => fetchAlarmConfigurationsLabelLookup(),
        retry: false,
      },
      {
        queryKey: ['Time Periods Lookup'],
        queryFn: () => fetchTimePeriodsLookup(),
        retry: false,
      },
    ],
  });
  const isLookupsLoading = results.some((r) => r.isLoading);
  const isLookupsError = results.some((r) => r.isError);

  const [getDevicesLookup, getLabelsLookup, getTimePeriodsLookup] = results;
  const devicesList = getDevicesLookup?.data?.items ?? [];
  const labelsList = getLabelsLookup?.data ?? [];
  const timePeriodsList = getTimePeriodsLookup?.data ?? [];

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
            <AlarmConfigurationsTable
              setNewItem={getPermission('WebNet.AlarmConfigurations.Create') ? setNewItem : undefined}
              devicesList={devicesList}
              labelsList={labelsList}
              timePeriodsList={timePeriodsList}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      {getPermission('WebNet.AlarmConfigurations.Create') && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <NewAlarmConfigurationModal setShowModal={setNewItem} />
        </Modal>
      )}
    </>
  );
};
