import { useEffect, useState } from 'react';
import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import {
  fetchFirmConfigurationsList,
  saveFirmConfiguration,
} from '@/services/system-administration/definitions/firm-configurations';
import Tabs from '@/components/ui/tabs/tabs';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
// import dummyData from '@/helpers/firm-confirmtion/get.json';
import FirmConfigurationFormContainerGeneral from '@/components/pages/definitions/firm-configuration/form-container-general';
import FirmConfigurationFormContainerInvoicing from '@/components/pages/definitions/firm-configuration/form-container-invoicing';
import FirmConfigurationFormContainerNaturalGas from '@/components/pages/definitions/firm-configuration/form-container-natural-gas';
import FirmConfigurationFormContainerReporting from '@/components/pages/definitions/firm-configuration/form-container-reporting';
import FirmConfigurationFormContainerTerm from '@/components/pages/definitions/firm-configuration/form-container-term';
import FirmConfigurationFormContainerUnitPrice from '@/components/pages/definitions/firm-configuration/form-container-unit-price';

const FirmConfiguration = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'SystemAdministration',
    },
    {
      label: 'Menu:Definitions',
    },
    {
      label: 'firm_configuration_bread_crumb_header',
    },
  ];

  const title = {
    label:
      getTranslatedValue('Menu:Definitions') +
      '-' +
      getTranslatedValue('firm_configuration_bread_crumb_header'),
  };
  const [activeTab, setActiveTab] = useState<string>('Term');
  const [configurations, setConfigurations] = useState<any[]>([]);

  const handleTabChange = (tab: string) => setActiveTab(tab);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<any>();

  const { data } = useQuery({
    queryKey: ['Firm Configurations List'],
    queryFn: () => fetchFirmConfigurationsList(),
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: saveFirmConfiguration,
    onSuccess: (data) => {
      console.log('Firm configurations saved successfully', data);
      // Optionally, refetch the list or show a success message
    },
    onError: (error) => {
      console.error('Error saving firm configurations', error);
      // Handle error, show toast or something
    },
  });
  // Load configurations (currently from dummy data, replace with API call)
  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchConfigurations = async () => {
    //   const response = await api.get('/firm-configurations');
    //   setConfigurations(response.data);
    // };
    // fetchConfigurations();

    // Currently using dummy data
    setConfigurations(data);
  }, [data]);

  // Set form values when configurations are loaded
  useEffect(() => {
    if (configurations?.length > 0) {
      configurations.forEach((config: any) => {
        setValue(config.configurationKey, config.configurationValue);
      });
    }
  }, [configurations, setValue]);

  const onSubmit = (data: any) => {
    // Create a map of configurationKey to original configuration for quick lookup
    const configMap = new Map(
      configurations.map((config: any) => [config.configurationKey, config]),
    );

    // List of mimic diagram refresh time fields that should be numbers
    const mimicDiagramRefreshFields = new Set([
      'refresh_mimic_monitor_page_data',
      'refresh_mimic_monitor_page_alarm_data',
      'refresh_mimic_monitor_page_compensation_rate',
      'refresh_mimic_monitor_page_categorial_chart',
      'refresh_mimic_monitor_page_weather_data',
    ]);

    // Transform form data to API format
    const configurations2 = Object.entries(data)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      )
      .map(([key, value]) => {
        // Find the original configuration for this key
        const originalConfig = configMap.get(key);

        // Check if this is a mimic diagram refresh time field that should be a number
        const isMimicDiagramRefreshField = mimicDiagramRefreshFields.has(key);
        const processedValue = isMimicDiagramRefreshField
          ? Number(value)
          : String(value);

        return {
          active: originalConfig?.active ?? true,
          configurationKey: key,
          configurationValue: processedValue,
          configurationIntValue: originalConfig?.configurationIntValue ?? 0,
          configurationGroupName:
            originalConfig?.configurationGroupName ?? 'Firm',
          configurationGroupObjectId:
            originalConfig?.configurationGroupObjectId ??
            '324eb899-2008-4b73-98e4-3a09cf8d9d3b',
          concurrencyStamp: originalConfig?.concurrencyStamp ?? null,
          isDeleted: originalConfig?.isDeleted ?? false,
          deleterId: originalConfig?.deleterId ?? null,
          deletionTime: originalConfig?.deletionTime ?? null,
          lastModificationTime: originalConfig?.lastModificationTime ?? null,
          lastModifierId: originalConfig?.lastModifierId ?? null,
          creationTime:
            originalConfig?.creationTime ?? new Date().toISOString(),
          creatorId: originalConfig?.creatorId ?? null,
          id: originalConfig?.id ?? 0, // Use the original id from the API response
        };
      });

    // Call the mutation to save
    saveMutation.mutate({ formData: configurations2 });
  };

  const tabs = [
    {
      id: 0,
      title: getTranslatedValue('em_dashboard_widget_term'),
      value: 'Term',
    },
    {
      id: 1,
      title: getTranslatedValue('DisplayName:UnitPrice', 'Payment.texts'),
      value: 'UnitPrice',
    },
    {
      id: 2,
      title: getTranslatedValue('NaturalGas'),
      value: 'NaturalGas',
    },
    {
      id: 3,
      title: getTranslatedValue('Reporting'),
      value: 'Reporting',
    },
    {
      id: 4,
      title: getTranslatedValue('Invoicing'),
      value: 'Invoicing',
    },

    {
      id: 5,
      title: getTranslatedValue('General'),
      value: 'General',
    },
  ];

  return (
    <div className="page-wrapper warehouses-edit">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabChange} />
        {activeTab === 'Term' && (
          <FirmConfigurationFormContainerTerm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
            watch={watch}
          />
        )}
        {activeTab === 'UnitPrice' && (
          <FirmConfigurationFormContainerUnitPrice
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
            watch={watch}
          />
        )}
        {activeTab === 'NaturalGas' && (
          <FirmConfigurationFormContainerNaturalGas
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
            watch={watch}
          />
        )}
        {activeTab === 'Reporting' && (
          <FirmConfigurationFormContainerReporting
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
          />
        )}
        {activeTab === 'Invoicing' && (
          <FirmConfigurationFormContainerInvoicing
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
            watch={watch}
          />
        )}
        {activeTab === 'General' && (
          <FirmConfigurationFormContainerGeneral
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            onSubmit={onSubmit}
            watch={watch}
          />
        )}
      </div>
    </div>
  );
};

export default FirmConfiguration;
