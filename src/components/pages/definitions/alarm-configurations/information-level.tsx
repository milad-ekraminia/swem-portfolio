import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import {
  alarmControlTypeOptions,
  alarmLevelTypeOptions,
  alarmWorkingTypeOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchAlarmConfigurationsLabelLookup,
  fetchTimePeriodsLookup,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { useQueries } from '@tanstack/react-query';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import AlarmConfigurationDeviceFormContent from './device-form-content';

const MemoAlarmConfigurationFormContent = ({
  errors,
  register,
  control,
  setValue,
  isEdit = false,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  isEdit?: boolean;
}) => {
  const results = useQueries({
    queries: [
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

  const [getLabelsLookup, getTimePeriodsLookup] = results;

  const labelsList = getLabelsLookup?.data ?? [];
  const timePeriodsList = getTimePeriodsLookup?.data ?? [];

  const active = useWatch({
    control,
    name: 'active',
  });
  const alarmDataLogFlag = useWatch({
    control,
    name: 'alarmDataLogFlag',
  });

  const alarmWorkingType = Number(
    useWatch({
      control,
      name: 'alarmWorkingType',
    }),
  );

  return (
    <div className="alarm-configuration-information-level">
      <Toggle
        isOn={active}
        setIsOn={() => {
          setValue('active', !active);
        }}
        label={getTranslatedValue('StateLable')}
      />

      <RegisterInput
        type="text"
        name="alarmConfDescription"
        label={getTranslatedValue('AlarmDescription')}
        error={errors?.alarmConfDescription?.message}
        maxLength={100}
        required={true}
        register={register}
      />

      <div className="alarm-configuration-information-level__grid">
        <AlarmConfigurationDeviceFormContent
          control={control}
          setValue={setValue}
          register={register}
          errors={errors}
          labelsList={labelsList}
          isEdit={isEdit}
        />

        <RegisterSelectInput
          name="alarmConfLevel"
          label={getTranslatedValue('AlarmLevel')}
          options={alarmLevelTypeOptions}
          error={errors?.alarmConfLevel?.message}
          register={register}
          control={control}
        />

        <RegisterSelectInput
          name="alarmConfTimePeriodId"
          label={getTranslatedValue('em_alarm_configuration_time_period')}
          options={timePeriodsList?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          error={errors?.alarmConfTimePeriodId?.message}
          register={register}
          control={control}
        />

        <RegisterSelectInput
          name="alarmWorkingType"
          label={getTranslatedValue('em_alarm_configuration_working_type')}
          options={alarmWorkingTypeOptions}
          error={errors?.alarmWorkingType?.message}
          register={register}
          control={control}
        />

        {alarmWorkingType === 0 ||
          alarmWorkingType === 1 ||
          alarmWorkingType === 2 ? (
          <>
            <RegisterSelectInput
              name="alarmConfControlArea"
              label={getTranslatedValue('em_alarm_configuration_control_type')}
              options={alarmControlTypeOptions}
              error={errors?.alarmConfControlArea?.message}
              register={register}
              control={control}
            />
            <DecimalInput
              label={getTranslatedValue('AlarmConfMinimum')}
              error={errors?.alarmConfMinimum?.message}
              name="alarmConfMinimum"
              register={register}
              setValue={setValue}
              placeholder="0,00"
              step="0.01"
            />
            <DecimalInput
              label={getTranslatedValue('AlarmConfMaximum')}
              error={errors?.alarmConfMaximum?.message}
              name="alarmConfMaximum"
              register={register}
              setValue={setValue}
              placeholder="0,00"
              step="0.01"
            />
          </>
        ) : null}

        {alarmWorkingType === 0 && (
          <>
            <DecimalInput
              label={getTranslatedValue('em_alarm_configuration_histminimum')}
              error={errors?.alarmConfMinHysteresis?.message}
              name="alarmConfMinHysteresis"
              register={register}
              setValue={setValue}
              placeholder="0,00"
              step="0.01"
            />
            <DecimalInput
              label={getTranslatedValue('em_alarm_configuration_histmaximum')}
              error={errors?.alarmConfMaxHysteresis?.message}
              name="alarmConfMaxHysteresis"
              register={register}
              setValue={setValue}
              placeholder="0,00"
              step="0.01"
            />
          </>
        )}

        {alarmWorkingType === 1 && (
          <RegisterInput
            type="number"
            name="alarmNumberRepetition"
            label={getTranslatedValue('em_alarm_number_repetition')}
            error={errors?.alarmNumberRepetition?.message}
            register={register}
          />
        )}

        {alarmWorkingType === 2 && (
          <RegisterInput
            type="number"
            name="alarmWaitTime"
            label={getTranslatedValue('em_alarm_wait_time')}
            error={errors?.alarmWaitTime?.message}
            register={register}
          />
        )}

        {alarmWorkingType === 3 && (
          <RegisterInput
            type="number"
            name="alarmValueChangeVolume"
            label={getTranslatedValue('em_alarm_value_change_volume')}
            error={errors?.alarmValueChangeVolume?.message}
            register={register}
          />
        )}
        <Toggle
          isOn={alarmDataLogFlag}
          setIsOn={() => {
            setValue('alarmDataLogFlag', !alarmDataLogFlag);
          }}
          label={getTranslatedValue('em_alarm_data_log_active')}
        />
      </div>
    </div>
  );
};

const AlarmConfigurationInformationLevel = memo(
  MemoAlarmConfigurationFormContent,
);

export default AlarmConfigurationInformationLevel;
