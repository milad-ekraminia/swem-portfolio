import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoNewWorkNotificationType = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <div className="work-notification-form-content">
      <RegisterInput
        required
        type="text"
        name="typeDescription"
        label={getTranslatedValue('WorkNotificationTypes')}
        autoFocus={true}
        error={errors?.typeDescription?.message}
        register={register}
      />
    </div>
  );
};

const WorkNotificationTypeFormContent = memo(MemoNewWorkNotificationType);

export default WorkNotificationTypeFormContent;
