import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import {
  alarmLevelTypeOptions,
  MCSThresholdTimeUnitOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import ActionItemsTable from './action-items-table';
import AnalogItemsTable from './analog-items-table';
import DerivedValueConditionsTable from './derived-value-conditions-table';
import DigitalConditionsTable from './digital-conditions-table';
import MultiConditionalStatusFormolContent from './formol-content';
import SubscribersTable from './subscribers-table';

const MemoMultiConditionalStatusFormContent = ({
  errors,
  register,
  control,
  setValue,
  isEdit = false,
  timePeriodLookupResponse,
  deviceLookupResponse,
  labelLookupyResponse,
  derivedValueLookupResponse,
  userLookupResponse,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  isEdit?: boolean;
  timePeriodLookupResponse: multiConditionalStatusesListType;
  deviceLookupResponse: multiConditionalStatusesListType;
  labelLookupyResponse: multiConditionalStatusesListType;
  derivedValueLookupResponse: multiConditionalStatusesListType;
  userLookupResponse: multiConditionalStatusesListType;
}) => {
  const active = useWatch({
    control,
    name: 'multiConditionalStatus.active',
  });
  const mcsCreateAlarm = useWatch({
    control,
    name: 'multiConditionalStatus.mcsCreateAlarm',
  });

  return (
    <div className="multi-conditional-status-form-content">
      <Toggle
        setIsOn={(value: any) =>
          setValue('multiConditionalStatus.active', value)
        }
        isOn={active}
        label={getTranslatedValue('Active')}
      />

      <div className="grid">
        <RegisterInput
          type="text"
          name="multiConditionalStatus.mcsDescription"
          label={getTranslatedValue('Description')}
          required
          error={errors?.multiConditionalStatus?.mcsDescription?.message}
          register={register}
        />

        <RegisterInput
          type="number"
          name="multiConditionalStatus.mcsThresholdTime"
          label={getTranslatedValue('MCSThresholdTime')}
          error={errors?.multiConditionalStatus?.mcsThresholdTime?.message}
          register={register}
          suffix={
            <RegisterSelectInput
              name="multiConditionalStatus.mcsThresholdTimeUnit"
              // label={getTranslatedValue("MCSThresholdTimeUnit")}
              options={MCSThresholdTimeUnitOptions}
              error={
                errors?.multiConditionalStatus?.mcsThresholdTimeUnit?.message
              }
              register={register}
              disabled={isEdit}
              control={control}
            />
          }
        />
      </div>

      <MultiConditionalStatusFormolContent
        formRegister={register}
        formErrors={errors}
        formControl={control}
        formSetValue={setValue}
      />

      <Toggle
        label={getTranslatedValue('MCSCreateAlarm')}
        isOn={mcsCreateAlarm}
        setIsOn={(value: any) =>
          setValue('multiConditionalStatus.mcsCreateAlarm', value)
        }
      />

      <div className="grid">
        <RegisterSelectInput
          name="multiConditionalStatus.mcsAlarmLevel"
          label={getTranslatedValue('MCSAlarmLevel')}
          options={alarmLevelTypeOptions}
          error={errors?.multiConditionalStatus?.mcsAlarmLevel?.message}
          register={register}
          disabled={isEdit}
          control={control}
        />

        <RegisterSelectInput
          name="multiConditionalStatus.mcsAlarmConfTimePeriodId"
          label={getTranslatedValue('MCSAlarmConfTimePeriodId')}
          options={
            Array.isArray(timePeriodLookupResponse)
              ? timePeriodLookupResponse.map((item: any) => ({
                title: item.displayName,
                value: item.id,
              }))
              : []
          }
          error={
            errors?.multiConditionalStatus?.mcsAlarmConfTimePeriodId?.message
          }
          register={register}
          disabled={isEdit}
          control={control}
        />
      </div>

      <AnalogItemsTable
        control={control}
        deviceLookupResponse={deviceLookupResponse}
        labelLookupyResponse={labelLookupyResponse}
      />

      <DigitalConditionsTable
        control={control}
        deviceLookupResponse={deviceLookupResponse}
        labelLookupyResponse={labelLookupyResponse}
      />

      <DerivedValueConditionsTable
        control={control}
        derivedValueLookupResponse={derivedValueLookupResponse}
      />

      <ActionItemsTable
        control={control}
        deviceLookupResponse={deviceLookupResponse}
        labelLookupyResponse={labelLookupyResponse}
      />

      <SubscribersTable
        control={control}
        userLookupResponse={userLookupResponse}
      />
    </div>
  );
};

const MultiConditionalStatusFormContent = memo(
  MemoMultiConditionalStatusFormContent,
);
export default MultiConditionalStatusFormContent;
