import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoAlarmConfigurationInvManStatusLabelFormContent = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <>
      <RegisterInput
        type="number"
        name="alarmConfPinNumber"
        label={getTranslatedValue('AlarmConfPinNumber')}
        error={errors?.alarmConfPinNumber?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="alarmConfDefaultValue"
        label={getTranslatedValue('AlarmConfDefaultValue')}
        error={errors?.alarmConfDefaultValue?.message}
        register={register}
      />
    </>
  );
};
const AlarmConfigurationInvManStatusLabelFormContent = memo(
  MemoAlarmConfigurationInvManStatusLabelFormContent,
);

export default AlarmConfigurationInvManStatusLabelFormContent;
