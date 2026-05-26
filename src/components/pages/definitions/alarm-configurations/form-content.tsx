import { getTranslatedValue } from '@/helpers/get-translated-value';
import AlarmSubscriptionField from './alarm-subscription/field';
import AlarmConfigurationInformationLevel from './information-level';
import Stepper from './stepper';

export const AlarmConfigurationFormContent = ({
  errors,
  register,
  control,
  setValue,
  level,
  isEdit = true,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  level: any;
  isEdit?: boolean;
}) => {
  const steps = [
    {
      title: getTranslatedValue('General'),
      description: '',
    },
    {
      title: getTranslatedValue('em_alarm_Subscription'),
      description: '',
    },
  ];

  return (
    <div className="alarm-configuration-form-content">
      <Stepper steps={steps} activeStep={level} />
      {level === 0 ? (
        <AlarmConfigurationInformationLevel
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          isEdit={isEdit}
        />
      ) : (
        <AlarmSubscriptionField control={control} />
      )}
    </div>
  );
};
