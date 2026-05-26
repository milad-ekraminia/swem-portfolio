import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';

const MemoNewWorkOrderType = ({
  errors,
  register,
  control,
}: {
  errors: any;
  register: any;
  control: any;
}) => {
  return (
    <div className="device-categories-form-content">
      <ToggleRegister
        control={control}
        register={register}
        name="active"
        label={getTranslatedValue('Active')}
      />
      <RegisterInput
        required
        type="text"
        name="categoryName"
        label={getTranslatedValue('CategoryName')}
        autoFocus={true}
        error={errors?.categoryName?.message}
        register={register}
      />
      <RegisterInput
        type="text"
        name="categoryDescription"
        label={getTranslatedValue('CategoryDescription')}
        error={errors?.categoryDescription?.message}
        register={register}
      />
    </div>
  );
};

const WorkOrderTypeFormContent = memo(MemoNewWorkOrderType);

export default WorkOrderTypeFormContent;
