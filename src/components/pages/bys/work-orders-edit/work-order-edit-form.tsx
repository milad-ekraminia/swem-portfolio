import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import DateInput from '@/components/ui/input/date-input/date-input';
import OrganizationInput from '@/components/ui/input/organization-picker/organization-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

const MemoWorkOrderEditForm = ({
  errors,
  register,
  control,
  categoryLookup,
  workOrdersTypeLookup,
  userLookup,
  deviceLookup,
  setValue,
}: {
  errors: any;
  register: any;
  control: any;
  categoryLookup: any;
  workOrdersTypeLookup: any;
  userLookup: any;
  deviceLookup: any;
  setValue: any;
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
    <div className="work-orders-edit-information-level">
      <RegisterInput
        required
        type="text"
        name="workOrderNo"
        label={getTranslatedValue('WorkOrderNo')}
        autoFocus={true}
        error={errors?.workOrderNo?.message}
        register={register}
        disabled
      />
      <RegisterSelectInput
        name="workOrderType"
        label={getTranslatedValue('WorkOrderType')}
        options={workOrdersTypeLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        register={register}
        control={control}
        error={errors?.workOrderType?.message}
        disabled
      />
      <RegisterSelectInput
        name="workOrderCategory"
        label={getTranslatedValue('WorkOrderCategory')}
        options={categoryLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        register={register}
        control={control}
        error={errors?.workOrderCategory?.message}
        disabled
      />
      <RegisterSelectInput
        name="workOrderAssignedUserId"
        label={getTranslatedValue('WorkOrderAssignedUserId')}
        options={userLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        register={register}
        control={control}
        error={errors?.workOrderAssignedUserId?.message}
      />

      <OrganizationInput
        isMulti={false}
        name="deviceId"
        control={control}
        onChange={(value) => setValue('deviceId', value as number)}
        assetTypeIdChange={(value) =>
          setValue('workOrderAssetType', value as number)
        }
        disabled={true}
      />
      <RegisterSelectInput
        name="workOrderDeviceId"
        label={getTranslatedValue('Device')}
        options={
          deviceLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          })) ?? []
        }
        register={register}
        control={control}
        error={errors?.workOrderDeviceId?.message}
        disabled
      />
      {/* <DateInput
        label={getTranslatedValue("WorkOrderStartDateTime")}
        name="workOrderStartDateTime"
        dateFormat={"DD/MM/YYYY"}
        onChange={(value: any) => {
          setValue("workOrderStartDateTime", value);
        }}
        value={workOrderStartDateTime}
        periodType={"1"}
        placeHolder={getTranslatedValue("Date")}
        disabled
      /> */}
      <DateInput
        label={getTranslatedValue('WorkOrderEndDateTime')}
        name="workOrderEndDateTime"
        dateFormat={'DD/MM/YYYY'}
        onChange={(value: any) => {
          setValue('workOrderEndDateTime', value);
        }}
        value={workOrderEndDateTime}
        periodType={'2'}
        placeHolder={getTranslatedValue('Date')}
        disabled
      />
      <RegisterInput
        required
        type="text"
        name="workOrderDescription"
        label={getTranslatedValue('WorkOrderDescription')}
        autoFocus={true}
        error={errors?.workOrderDescription?.message}
        register={register}
        disabled
      />
    </div>
  );
};
// "7889f9ad-60c2-d524-a23f-3a09cf8d9e4e";
// "b7dad2d1-7d10-4cf6-5116-3a0a466a1da9";
const WorkOrderEditWrapperForm = memo(MemoWorkOrderEditForm);

export default WorkOrderEditWrapperForm;
