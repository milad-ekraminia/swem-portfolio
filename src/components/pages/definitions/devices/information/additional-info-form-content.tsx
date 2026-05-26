import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoDeviceAdditionalIInfoFormContent = ({
  errors,
  register,
  setValue,
}: {
  errors: any;
  register: any;
  setValue: any;
}) => {
  return (
    <div className="device-additional-info-form-content">
      <RegisterInput
        type="text"
        name="userAdditionalData.textInfo1"
        label={getTranslatedValue('TextInfo1')}
        error={errors?.userAdditionalData?.textInfo1?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="userAdditionalData.numberInfo1"
        label={getTranslatedValue('NumberInfo1')}
        error={errors?.userAdditionalData?.numberInfo1?.message}
        register={register}
        setValue={setValue}
      />

      <RegisterInput
        type="text"
        name="userAdditionalData.textInfo2"
        label={getTranslatedValue('TextInfo2')}
        error={errors?.userAdditionalData?.textInfo2?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="userAdditionalData.numberInfo2"
        label={getTranslatedValue('NumberInfo2')}
        error={errors?.userAdditionalData?.numberInfo2?.message}
        setValue={setValue}
        register={register}
      />

      <RegisterInput
        type="text"
        name="userAdditionalData.textInfo3"
        label={getTranslatedValue('TextInfo3')}
        error={errors?.userAdditionalData?.textInfo3?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="userAdditionalData.numberInfo3"
        label={getTranslatedValue('NumberInfo3')}
        error={errors?.userAdditionalData?.numberInfo3?.message}
        register={register}
        setValue={setValue}
      />

      <RegisterInput
        type="text"
        name="userAdditionalData.textInfo4"
        label={getTranslatedValue('TextInfo4')}
        error={errors?.userAdditionalData?.textInfo4?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="userAdditionalData.numberInfo4"
        label={getTranslatedValue('NumberInfo4')}
        error={errors?.userAdditionalData?.numberInfo4?.message}
        setValue={setValue}
        register={register}
      />

      <RegisterInput
        type="text"
        name="userAdditionalData.textInfo5"
        label={getTranslatedValue('TextInfo5')}
        error={errors?.userAdditionalData?.textInfo5?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="userAdditionalData.numberInfo5"
        label={getTranslatedValue('NumberInfo5')}
        error={errors?.userAdditionalData?.numberInfo5?.message}
        setValue={setValue}
        register={register}
      />
    </div>
  );
};

const DeviceAdditionalIInfoFormContent = memo(
  MemoDeviceAdditionalIInfoFormContent,
);

export default DeviceAdditionalIInfoFormContent;
