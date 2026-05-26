import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { workOrderActionTypeList } from '@/enum-data/bys/bys-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchWorkOrderUserLookup } from '@/services/bys/work-orders/work-orders';
import { fetchWorkOrderLookup } from '@/services/system-administration/bys/work-order-actions-api';
import { useQueries } from '@tanstack/react-query';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

const MemoNewWorkOrderActionType = ({
  errors,
  register,
  control,
  setValue,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
}) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['Work Order Lookup'],
        queryFn: () => fetchWorkOrderLookup(),
        retry: false,
      },
      {
        queryKey: ['Users Lookup'],
        queryFn: () => fetchWorkOrderUserLookup(),
        retry: false,
      },
    ],
  });

  const [getWorkOrderLookup, getUsersLookup] = results;

  const workOrdersList = getWorkOrderLookup?.data?.items ?? [];
  const usersList = getUsersLookup?.data?.items ?? [];

  const actionDateTime = useWatch({
    control,
    name: 'actionDateTime',
  });
  return (
    <div className="work-order-actions-modal-form-content">
      <RegisterSelectInput
        name="workOrderId"
        label={getTranslatedValue('WorkOrderId')}
        options={workOrdersList?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        required
        register={register}
        placeholder={getTranslatedValue('WorkOrderId')}
        control={control}
        error={errors?.workOrderId?.message}
      />
      <RegisterSelectInput
        name="actionUserId"
        label={getTranslatedValue('ActionUserId')}
        required
        options={usersList?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        register={register}
        placeholder={getTranslatedValue('ActionUserId')}
        control={control}
        error={errors?.actionUserId?.message}
      />
      <DateInput
        label={getTranslatedValue('ActionDateTime')}
        name="actionDateTime"
        dateFormat={'YYYY/MM/DD'}
        onChange={(value: any) => {
          setValue('actionDateTime', value);
        }}
        required
        value={actionDateTime}
        periodType={'2'}
        placeHolder={getTranslatedValue('Date')}
        error={errors?.actionDateTime?.message}
      />
      <RegisterSelectInput
        name="actionType"
        label={getTranslatedValue('ActionType')}
        options={workOrderActionTypeList?.map((item: any) => ({
          value: item.id,
          title: item.value,
        }))}
        register={register}
        placeholder={getTranslatedValue('ActionType')}
        control={control}
        error={errors?.actionType?.message}
      />
      <RegisterInput
        type="text"
        name="actionDescription"
        label={getTranslatedValue('ActionDescription')}
        autoFocus={true}
        error={errors?.actionDescription?.message}
        register={register}
      />
    </div>
  );
};

const SystemManagementWorkOrderActionFormContent = memo(
  MemoNewWorkOrderActionType,
);

export default SystemManagementWorkOrderActionFormContent;
