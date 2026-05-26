import AccessPointInformationLevel from './information-level';

export const AccessPointFormContent = ({
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
  return (
    <div className="access-point-form-content">
      <AccessPointInformationLevel
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
      />
    </div>
  );
};
