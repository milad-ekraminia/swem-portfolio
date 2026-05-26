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
    <div className="work-orders-form-content">
      <ToggleRegister
        control={control}
        register={register}
        name="active"
        label={getTranslatedValue('Active')}
      />
      <RegisterInput
        required
        type="text"
        name="typeDescription"
        label={getTranslatedValue('WorkOrderType')}
        autoFocus={true}
        error={errors?.typeDescription?.message}
        register={register}
      />
    </div>
  );
};

const WorkOrderTypeFormContent = memo(MemoNewWorkOrderType);

export default WorkOrderTypeFormContent;
