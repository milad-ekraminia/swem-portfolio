import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

export const RoleFormContent = ({
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
  const isDefault = useWatch({
    control,
    name: 'isDefault',
  });

  const isPublic = useWatch({
    control,
    name: 'isPublic',
  });

  return (
    <div className="role-form-content">
      <RegisterInput
        type={'text'}
        name={'name'}
        label={getTranslatedValue('RoleName', 'AbpIdentity.texts')}
        required={true}
        error={errors?.name?.message}
        register={register}
      />

      <div className="role-form-content__grid">
        <Checkbox
          onChange={(value: any) => setValue('isDefault', value)}
          checked={isDefault}
          label={getTranslatedValue(
            'DisplayName:IsDefault',
            'AbpIdentity.texts',
          )}
          name="isDefault"
        />

        <Checkbox
          onChange={(value: any) => setValue('isPublic', value)}
          checked={isPublic}
          label={getTranslatedValue(
            'DisplayName:IsPublic',
            'AbpIdentity.texts',
          )}
          name="isPublic"
        />
      </div>
    </div>
  );
};
