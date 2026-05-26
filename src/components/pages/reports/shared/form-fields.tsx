import { memo } from 'react';
import {
  alarmApprovalOptions,
  alarmLevelOptions,
  alarmStatusOptions,
  hourRangeOptions,
  periodOptions,
  periodOptionsWithNone,
  phaseNoOptions,
} from '@/enum-data/reports/reports-data';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getDateTypeWithAllOptions } from '@/helpers/get-date-type';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import useFilterLogic from '@/hooks/report/useFilterLogic';
import { getCountriesLookupApi } from '@/services/reports/get-device-apis';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import DateInput from '@/components/ui/input/date-input/date-input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

interface Props {
  control: any;
  fields: any;
  setValue: any;
  register: any;
  isSensorReport?: boolean;
  isSystemAlarm?: boolean;
  isWeatherReport?: boolean;
  isCarbonReport?: boolean;
  isPeriodicProductionConsumptions?: boolean;
  hasPeriodType?: boolean;
  hasPhaseNo?: boolean;
  isArchive?: boolean;
}

const MemoFormFields = ({
  control,
  fields,
  setValue,
  register,
  isSensorReport = false,
  hasPeriodType = true,
  hasPhaseNo = false,
  isSystemAlarm = false,
  isWeatherReport = false,
  isCarbonReport = false,
  isPeriodicProductionConsumptions = false,
  isArchive,
}: Props) => {
  const {
    endDate,
    getDeviceCategoryResponse,
    getDeviceModelResponse,
    getDeviceLabelResponse,
    handleUpdateDate,
    periodType,
    startDate,
    getFieldValuePath,
  } = useFilterLogic({ control, fields, setValue });

  const hasLabel = isSensorReport || isSystemAlarm;

  const { data: weatherData, isLoading: wetherSelectOptionLoader } = useQuery({
    queryKey: ['get-device-label-lookup'],
    queryFn: () => getCountriesLookupApi(),
    retry: false,
    enabled: !!isWeatherReport,
  });

  const allowTimeRange = useWatch({
    control,
    name: 'allowTimeRange',
  });

  return (
    <>
      {!isWeatherReport && !isCarbonReport && (
        <RegisterSelectInput
          name={getFieldValuePath('DeviceCategory')}
          label={getTranslatedValue('DeviceCategory')}
          options={[
            {
              title: getTranslatedValue('All'),
              value: '-1',
            },
            ...formatSelectOptions(getDeviceCategoryResponse?.data),
          ]}
          // value={deviceCategory}
          isLoading={getDeviceCategoryResponse?.isLoading}
          register={register}
          control={control}
        />
      )}

      {!isWeatherReport && !isCarbonReport && (
        <RegisterSelectInput
          name={getFieldValuePath('DeviceModel')}
          label={getTranslatedValue('DeviceModel')}
          options={[
            {
              title: getTranslatedValue('All'),
              value: '-1',
            },
            ...formatSelectOptions(getDeviceModelResponse?.data),
          ]}
          isLoading={getDeviceModelResponse?.isLoading}
          register={register}
          control={control}
        />
      )}

      {hasPeriodType ? (
        <RegisterSelectInput
          name={getFieldValuePath('ReportPeriod')}
          label={getTranslatedValue('Period')}
          options={
            isPeriodicProductionConsumptions
              ? periodOptions()
              : periodOptionsWithNone()
          }
          // value={periodType}
          register={register}
          control={control}
        />
      ) : null}

      {isWeatherReport && (
        <RegisterSelectInput
          name={getFieldValuePath('City')}
          label={getTranslatedValue('City')}
          options={formatSelectOptions(weatherData)}
          isLoading={wetherSelectOptionLoader}
          register={register}
          control={control}
        />
      )}

      {isSystemAlarm ? (
        <>
          <RegisterSelectInput
            name={getFieldValuePath('AlarmStatus')}
            label={getTranslatedValue('em_alarm_status')}
            placeholder={getTranslatedValue('em_alarm_status')}
            options={alarmStatusOptions}
            register={register}
            control={control}
          />
          <RegisterSelectInput
            name={getFieldValuePath('AlarmApproval')}
            label={getTranslatedValue('em_alarm_approved')}
            placeholder={getTranslatedValue('em_alarm_approved')}
            options={alarmApprovalOptions}
            register={register}
            control={control}
          />
          <RegisterSelectInput
            name={getFieldValuePath('AlarmLevel')}
            label={getTranslatedValue('alarm_level')}
            placeholder={getTranslatedValue('alarm_level')}
            options={alarmLevelOptions}
            register={register}
            control={control}
          />
        </>
      ) : null}

      {/* startDate & endDate */}
      <DateInput
        label={getTranslatedValue('StartDate')}
        hasMax={true}
        name="StartDateTime"
        dateFormat={getDateTypeWithAllOptions(
          isCarbonReport ? 0 : (periodType ?? 0),
        )}
        onChange={(e: any) => handleUpdateDate('StartDateTime', e)}
        value={startDate}
        periodType={isCarbonReport ? 0 : (periodType ?? 0)}
        hasTime={isCarbonReport || periodType < 2}
      />
      <DateInput
        label={getTranslatedValue('EndDate')}
        hasMax={true}
        name="EndDateTime"
        dateFormat={getDateTypeWithAllOptions(
          isCarbonReport ? 0 : (periodType ?? 0),
        )}
        onChange={(e: any) => handleUpdateDate('EndDateTime', e)}
        value={endDate}
        minDate={new Date(startDate)}
        periodType={isCarbonReport ? 0 : (periodType ?? 0)}
        hasTime={isCarbonReport || periodType < 2}
      />

      {hasPhaseNo && (
        <RegisterSelectInput
          name={getFieldValuePath('PhaseNo')}
          label={getTranslatedValue('PhaseNo')}
          placeholder={getTranslatedValue('Phase.Select')}
          options={phaseNoOptions}
          register={register}
          control={control}
        />
      )}

      {isArchive ? (
        <RegisterSelectInput
          name={getFieldValuePath('ArchiveType')}
          label={getTranslatedValue('em_archive_type')}
          options={periodOptions()}
          register={register}
          control={control}
        />
      ) : null}

      {hasLabel && (
        <RegisterSelectInput
          name={getFieldValuePath('Label')}
          label={getTranslatedValue('Label')}
          placeholder={getTranslatedValue('Label')}
          options={[
            {
              title: getTranslatedValue('All'),
              value: '-1',
            },
            ...formatSelectOptions(getDeviceLabelResponse?.data),
          ]}
          isLoading={getDeviceLabelResponse?.isLoading}
          register={register}
          control={control}
        />
      )}
      {isPeriodicProductionConsumptions ? (
        <>
          <div
            style={{
              gridColumn: '1',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Checkbox
              checked={allowTimeRange}
              onChange={(value: any) => setValue('allowTimeRange', value)}
              label={getTranslatedValue('HourRange')}
              name="allowTimeRange"
            />
          </div>
          <RegisterSelectInput
            disabled={!allowTimeRange}
            name={getFieldValuePath('RangeStartHour')}
            label={getTranslatedValue('RangeStart')}
            placeholder={getTranslatedValue('RangeStart')}
            options={hourRangeOptions}
            register={register}
            control={control}
          />
          <RegisterSelectInput
            disabled={!allowTimeRange}
            name={getFieldValuePath('RangeEndHour')}
            label={getTranslatedValue('RangeEnd')}
            placeholder={getTranslatedValue('RangeEnd')}
            options={hourRangeOptions}
            register={register}
            control={control}
          />
        </>
      ) : null}
    </>
  );
};

const FormFields = memo(MemoFormFields);

export default FormFields;
