import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { customWorkOrderActionTypeList } from '@/enum-data/bys/bys-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import ActionImages from './action-image';

const MemoWorkOrderActionFormContent = ({
  register,
  errors,
  control,
}: {
  register: any;
  errors: any;
  control: any;
}) => {
  return (
    <div className="inventory-form-content">
      <RegisterSelectInput
        name="actionType"
        label={getTranslatedValue('ActionType')}
        required
        options={customWorkOrderActionTypeList?.map((item: any) => ({
          value: item.id,
          title: item.value,
        }))}
        error={errors?.actionType?.message}
        register={register}
        control={control}
      />
      <RegisterInput
        name={'actionDescription'}
        label={getTranslatedValue('ActionDescription')}
        type={'text'}
        register={register}
      />

      <ActionImages control={control} />
    </div>
  );
};

const WorkOrderActionFormContent = memo(MemoWorkOrderActionFormContent);
export default WorkOrderActionFormContent;
