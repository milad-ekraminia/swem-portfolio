import { getTranslatedValue } from '@/helpers/get-translated-value';
import { GeneralInformationLevel } from './information/general-information-level';
import DeviceFormContent from './information/information-level';
import Stepper from './stepper';

export const DevicesFormContent = ({
  errors,
  register,
  control,
  setValue,
  deviceAccessPointResponse,
  deviceCategoryResponse,
  getDeviceLabelResponse,
  reset,
  level,
  isEdit = true,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  deviceAccessPointResponse: any;
  deviceCategoryResponse: any;
  getDeviceLabelResponse: any;
  reset: any;
  level: any;
  isEdit?: boolean;
}) => {
  const steps = [
    {
      title: getTranslatedValue('DeviceInformation'),
      description: getTranslatedValue('DeviceRequiredFieldsError'),
    },
    {
      title: getTranslatedValue('GeneralInfo'),
      description: getTranslatedValue('DevcieGeneralInformation'),
    },
  ];

  return (
    <div className="device-form-content">
      <Stepper steps={steps} activeStep={level} />
      {level === 0 ? (
        <DeviceFormContent
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          deviceAccessPointResponse={deviceAccessPointResponse}
          deviceCategoryResponse={deviceCategoryResponse}
          isEdit={isEdit}
        />
      ) : (
        <GeneralInformationLevel
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          getDeviceLabelResponse={getDeviceLabelResponse}
          reset={reset}
        />
      )}
    </div>
  );
};
