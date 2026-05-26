import DateInput from '@/components/ui/input/date-input/date-input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

const MemoWorkOrderFilterFormContent = ({
  register,
  errors,
  setValue,
  control,
  workOrdersTypeLookup,
  categoryLookup,
  isAllDisabled,
  userLookup,
}: {
  register: any;
  errors: any;
  setValue: any;
  control: any;
  workOrdersTypeLookup: displayNameListItemType[];
  userLookup: displayNameListItemType[];
  categoryLookup: displayNameListItemType[];
  isAllDisabled?: boolean;
}) => {
  const minStartDate = useWatch({
    control,
    name: 'minStartDate',
  });
  const maxStartDate = useWatch({
    control,
    name: 'maxStartDate',
  });
  const minEndDate = useWatch({
    control,
    name: 'minEndDate',
  });
  const maxEndDate = useWatch({
    control,
    name: 'maxEndDate',
  });
  const openWorkOrders = useWatch({
    control,
    name: 'openWorkOrders',
  });

  return (
    <div className="add-work-order-form-content">
      <div className="grid">
        <RegisterSelectInput
          name="workOrderType"
          label={getTranslatedValue('WorkOrderType')}
          options={workOrdersTypeLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderType?.message}
        />
        <RegisterSelectInput
          name="creatorId"
          label={getTranslatedValue('CreatedBy', 'AbpIdentity.texts')}
          options={userLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.creatorId?.message}
        />
        <RegisterSelectInput
          name="workOrderCategory"
          label={getTranslatedValue('WorkOrderCategory')}
          options={categoryLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderCategory?.message}
        />

        <DateInput
          label={getTranslatedValue('WorkOrderMinCreationDate')}
          name="minStartDate"
          disabled={isAllDisabled}
          dateFormat={'YYYY/MM/DD'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('minStartDate', value);
            }
          }}
          value={minStartDate}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
        />
        <DateInput
          label={getTranslatedValue('WorkOrderMaxCreationDate')}
          name="maxStartDate"
          disabled={isAllDisabled}
          dateFormat={'YYYY/MM/DD'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('maxStartDate', value);
            }
          }}
          value={maxStartDate}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
        />
        <DateInput
          label={getTranslatedValue('WorkOrderMinEndDate')}
          name="minEndDate"
          disabled={isAllDisabled}
          dateFormat={'YYYY/MM/DD'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('minEndDate', value);
            }
          }}
          value={minEndDate}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
        />
        <DateInput
          label={getTranslatedValue('WorkOrderMaxEndDate')}
          name="maxEndDate"
          disabled={isAllDisabled}
          dateFormat={'YYYY/MM/DD'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('maxEndDate', value);
            }
          }}
          value={maxEndDate}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
        />

        <Toggle
          isOn={openWorkOrders}
          setIsOn={() => {
            setValue('openWorkOrders', !openWorkOrders);
          }}
          label={getTranslatedValue('OpenWorkOrders')}
        />
        {/*  */}
      </div>
    </div>
  );
};

const WorkOrderFilterFormContent = memo(MemoWorkOrderFilterFormContent);
export default WorkOrderFilterFormContent;
