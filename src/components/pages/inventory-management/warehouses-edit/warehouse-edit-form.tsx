import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';

const MemoWareHouseEditForm = ({
  errors,
  register,
  control,
}: {
  errors: any;
  register: any;
  control: any;
}) => {
  return (
    <div className="warehouse-edit-information-level">
      <RegisterInput
        required
        type="text"
        name="name"
        label={getTranslatedValue('WarehouseName')}
        autoFocus={true}
        error={errors?.name?.message}
        register={register}
      />
      <RegisterInput
        type="text"
        name="coordinate"
        label={getTranslatedValue('Coordinate')}
        autoFocus={true}
        error={errors?.coordinate?.message}
        register={register}
      />
      <RegisterInput
        required
        type="text"
        name="address"
        label={getTranslatedValue('Address')}
        autoFocus={true}
        error={errors?.address?.message}
        register={register}
      />

      <ToggleRegister
        control={control}
        register={register}
        name="status"
        label={getTranslatedValue('Status')}
      />
      <ToggleRegister
        control={control}
        register={register}
        name="isDiscard"
        label={getTranslatedValue('IsDiscard')}
      />
    </div>
  );
};

const WareHouseEditWrapperForm = memo(MemoWareHouseEditForm);

export default WareHouseEditWrapperForm;
