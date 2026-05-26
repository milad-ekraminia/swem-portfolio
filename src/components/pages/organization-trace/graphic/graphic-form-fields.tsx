import { memo } from 'react';
import {
  hourRangeOptions,
  periodOptions,
} from '@/enum-data/reports/reports-data';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getDateTypeWithAllOptions } from '@/helpers/get-date-type';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import useFilterLogic from '@/hooks/report/useFilterLogic';
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
  isArchive?: boolean;
}

const MemoGraphicFormFields = ({
  control,
  fields,
  setValue,
  register,
  isSensorReport = false,
  isSystemAlarm = false,
  isWeatherReport = false,
  isCarbonReport = false,
  isPeriodicProductionConsumptions = false,
  hasPeriodType = true,
  isArchive,
}: Props) => {
  const {
    endDate,
    getDeviceCategoryResponse,
    getDeviceLabelResponse,
    handleUpdateDateGraphic: handleUpdateDate,
    startDate,
    getFieldValuePath,
  } = useFilterLogic({ control, fields, setValue });

  // Watch Period directly for graphic form
  const periodType = useWatch({
    control,
    name: 'Period',
  });

  const hasLabel = isSensorReport || isSystemAlarm;

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

      {hasPeriodType ? (
        <RegisterSelectInput
          name="Period"
          label={getTranslatedValue('Period')}
          options={periodOptions()}
          register={register}
          control={control}
        />
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

const GraphicFormFields = memo(MemoGraphicFormFields);

export default GraphicFormFields;
