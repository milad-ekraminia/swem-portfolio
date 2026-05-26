import DateInput from '@/components/ui/input/date-input/date-input';
import OrganizationInput from '@/components/ui/input/organization-picker/organization-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { workNotificationPriorityTypeList } from '@/enum-data/bys/bys-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

const MemoEditWorkOrderFormContent = ({
  register,
  errors,
  setValue,
  control,
  workOrdersTypeLookup,
  categoryLookup,
  userLookup,
  isAllDisabled,
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
  // const workOrderStartDateTime = useWatch({
  //   control,
  //   name: "workOrderStartDateTime",
  // });
  const workOrderEndDateTime = useWatch({
    control,
    name: 'workOrderEndDateTime',
  });

  return (
    <div className="add-work-order-form-content">
      <div className="grid">
        <RegisterInput
          name="workOrderNo"
          label={getTranslatedValue('WorkOrderNo')}
          type={'text'}
          required={true}
          disabled
          error={errors?.workOrderNo?.message}
          register={register}
        />

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

        <RegisterSelectInput
          name="workOrderPriority"
          label={getTranslatedValue('WorkOrderPriority')}
          options={workNotificationPriorityTypeList?.map((item: any) => ({
            value: item.id,
            title: item.value,
          }))}
          register={register}
          disabled={isAllDisabled}
          control={control}
          error={errors?.workOrderPriority?.message}
        />

        <OrganizationInput
          isMulti={false}
          name="deviceId"
          control={control}
          disabled={isAllDisabled}
          onChange={(value) => setValue('deviceId', value as number)}
          assetTypeIdChange={(value) =>
            setValue('workOrderAssetType', value as number)
          }
        />

        <RegisterInput
          name="workOrderDescription"
          required
          disabled={isAllDisabled}
          label={getTranslatedValue('WorkOrderDescription')}
          type={'text'}
          error={errors?.workOrderDescription?.message}
          register={register}
        />

        {/* <DateInput
          label={getTranslatedValue("WorkOrderStartDateTime")}
          name="workOrderStartDateTime"
          disabled={isAllDisabled}
          dateFormat={"DD/MM/YYYY"}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue("workOrderStartDateTime", value);
            }
          }}
          value={workOrderStartDateTime}
          periodType={"1"}
          placeHolder={getTranslatedValue("Date")}
        /> */}

        <DateInput
          label={getTranslatedValue('WorkOrderEndDateTime')}
          name="workOrderEndDateTime"
          dateFormat={'DD/MM/YYYY'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('workOrderEndDateTime', value);
            }
          }}
          disabled={isAllDisabled}
          value={workOrderEndDateTime}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
        />

        <RegisterSelectInput
          name="workOrderAssignedUserId"
          label={getTranslatedValue('WorkOrderAssignedUserId')}
          options={userLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderAssignedUserId?.message}
        />
      </div>
    </div>
  );
};

const EditWorkOrderFormContent = memo(MemoEditWorkOrderFormContent);
export default EditWorkOrderFormContent;
