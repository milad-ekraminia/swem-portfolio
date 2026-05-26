import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoNewWorkOrderType = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <div className="user-organization-profiles-form-content">
      <RegisterInput
        required
        type="text"
        name="profileName"
        label={getTranslatedValue('ProfileName')}
        autoFocus={true}
        error={errors?.profileName?.message}
        register={register}
      />
    </div>
  );
};

const UserOrganizationProfilesFormContent = memo(MemoNewWorkOrderType);

export default UserOrganizationProfilesFormContent;
