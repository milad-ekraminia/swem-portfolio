import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoOrganizationModalContent = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <div className="dv-organization-modal__content-full">
      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="locationName"
        label={getTranslatedValue('Name')}
        required
        autoFocus
        error={errors?.locationName?.message}
        register={register}
      />
    </div>
  );
};

const OrganizationModalContent = memo(MemoOrganizationModalContent);

export default OrganizationModalContent;
