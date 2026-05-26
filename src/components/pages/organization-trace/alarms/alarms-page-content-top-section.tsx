import { alarmLevelMainOptions } from '@/enum-data/reports/reports-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAlarmConfigurationsDeviceLookup,
  getAllUsersList,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { fetchAlarmListPage } from '@/services/organization-trace/alarm-api';
import DonutChart from '@/components/ui/charts/dount-chart';
import MultiSelectWithButton from '@/components/ui/input/register-select-input-with-button/register-select-input-with-button';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

function AlarmsPageContentTopSection({
  register,
  control,
  onFilter,
  handleSubmit,
  filterData,
  watch,
  setValue,
}: Readonly<{
  register: any;
  control: any;
  onFilter: any;
  handleSubmit: any;
  filterData: any;
  setValue: any;
  watch: any;
}>) {
  // const dummySeries = [44, 32, 24];
  const dummyStats = [1200, 870, 650];
  const { data: deviceLookupQuery, isLoading } = useQuery({
    queryKey: ['alarm-configurations/device-lookup'],
    queryFn: () => fetchAlarmConfigurationsDeviceLookup(),
    retry: false,
  });

  const { data: usersList } = useQuery({
    queryKey: ['All Users List'],
    queryFn: () => getAllUsersList(),
    retry: false,
  });

  const { data: responseData, isLoading: isLoadingChart } = useQuery({
    queryKey: ['fetch active alarm organization list', filterData],
    queryFn: () =>
      fetchAlarmListPage({
        parentType: 1, // Always 1
        deviceId: [filterData?.deviceId],
        parentId: filterData?.orgId,
        alarmStatus: [filterData?.alarmStatus],
        alarmLevels:
          filterData?.alarmLevels === -1
            ? []
            : filterData?.alarmLevels
              ? [filterData?.alarmLevels]
              : [],
        maxResultCount: 1000,
        skipCount: 0,
        sortData: [],
        lastUpdateUserFullNames: filterData?.lastUpdateUserFullNames ?? [],
      }),
    retry: false,
    enabled: !!filterData?.orgId,
  });

  console.log(
    responseData?.alarmsList?.items?.map((item: any) => item?.alarmConfLevel),
    'responseData',
  );

  const dummySeries = responseData
    ? [
        responseData?.dangerousAlarmsPercentage,
        responseData?.criticalAlarmsPercentage,
        responseData?.warningAlarmsPercentage,
      ]
    : [];

  return (
    <div className="alarms-page-content__top">
      <form
        onSubmit={handleSubmit(onFilter)}
        className="alarms-page-content__top-form"
      >
        {' '}
        <SearchableDropdown
          name="deviceId"
          label={getTranslatedValue('Device')}
          searchParameterLabel="title"
          options={deviceLookupQuery?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            watch('deviceId')
              ? deviceLookupQuery?.items?.find(
                  (item: any) => item.id === watch('deviceId'),
                )?.displayName
              : null
          }
          placeholder={getTranslatedValue('Device')}
          handleChange={(val: any) => {
            setValue('deviceId', val);
          }}
          isLoading={isLoading}
          isRequiredInput={true}
        />
        <RegisterSelectInput
          name="alarmLevels"
          label={getTranslatedValue('em_alarm_configuration_level')}
          placeholder={getTranslatedValue('em_alarm_configuration_level')}
          options={alarmLevelMainOptions}
          register={register}
          control={control}
        />
        <MultiSelectWithButton
          name="lastUpdateUserFullNames"
          label={getTranslatedValue('em_related_user')}
          register={register}
          control={control} // ✅ required for useWatch
          options={usersList?.items?.map((item: any) => ({
            title: item?.name,
            value: item?.userName,
          }))}
          placeholder={getTranslatedValue('em_related_user')}
          buttonText={getTranslatedValue('Filter')}
          buttonType="submit"
          onButtonClick={() => onFilter()}
        />
      </form>
      <div className="alarms-page-content__top-chart">
        {' '}
        <DonutChart
          // series={[]}
          isLoading={isLoadingChart}
          series={dummySeries ?? []}
          stats={dummyStats}
          title={getTranslatedValue('em_abm_alarm_percentage_bar')}
        />
      </div>
    </div>
  );
}

export default AlarmsPageContentTopSection;
