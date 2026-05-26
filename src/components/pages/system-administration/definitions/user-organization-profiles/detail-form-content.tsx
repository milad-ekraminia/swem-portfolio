import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

const MemoNewWorkOrderType = ({
  errors,
  register,
  control,
  organizationLookUp,
}: {
  errors: any;
  register: any;
  control: any;
  organizationLookUp: any;
}) => {
  return (
    <div className="user-organization-profiles-form-content">
      <RegisterSelectInput
        name="organizationId"
        label={getTranslatedValue('Organization')}
        required
        options={organizationLookUp?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        register={register}
        placeholder={getTranslatedValue('Organization')}
        control={control}
        error={errors?.organizationId?.message}
      />
    </div>
  );
};

const UserOrganizationDetailProfilesFormContent = memo(MemoNewWorkOrderType);

export default UserOrganizationDetailProfilesFormContent;
