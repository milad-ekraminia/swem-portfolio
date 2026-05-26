import { RegisterInput } from '@/components/ui/input/register-input/Input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export default function PlantFormContent({
  errors,
  register,
  status,
  setValue,
}: {
  errors: any;
  register: any;
  status: any;
  setValue: any;
}) {
  return (
    <div className="plants-form-content">
      <RegisterInput
        type={'text'}
        name={'name'}
        label={getTranslatedValue('Plant')}
        required={true}
        autoFocus={true}
        error={errors?.name?.message}
        register={register}
      />

      <RegisterInput
        type={'text'}
        name={'coordinate'}
        label={getTranslatedValue('Coordinate')}
        autoFocus={true}
        error={errors?.coordinate?.message}
        register={register}
      />

      <RegisterInput
        type={'text'}
        name={'address'}
        label={getTranslatedValue('Address')}
        required={true}
        autoFocus={true}
        error={errors?.address?.message}
        register={register}
      />

      <Toggle
        isOn={status}
        setIsOn={() => {
          setValue('status', !status);
        }}
        label={getTranslatedValue('Status')}
      />
    </div>
  );
}
