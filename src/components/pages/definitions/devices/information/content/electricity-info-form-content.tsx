import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

const MemoDeviceElectricityInfoFormContent = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <div className="device-electric-info-form-content">
      <RegisterInput
        type="number"
        name="device.deviceVoltTransValue"
        label={getTranslatedValue('em_voltage_transformer_value')}
        error={errors?.device?.deviceVoltTransValue?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="device.deviceCurrTransValue"
        label={getTranslatedValue('em_current_transformer_value')}
        error={errors?.device?.deviceCurrTransValue?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="invoiceInfo.facilityArm"
        label={getTranslatedValue('em_device_facility_arm')}
        error={errors?.invoiceInfo?.facilityArm?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="invoiceInfo.contractArm"
        label={getTranslatedValue('em_device_contract_arm')}
        error={errors?.invoiceInfo?.contractArm?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="invoiceInfo.inductiveLimit"
        label={getTranslatedValue('em_device_inductive_limit')}
        error={errors?.invoiceInfo?.inductiveLimit?.message}
        register={register}
      />
      <RegisterInput
        type="number"
        name="invoiceInfo.capacitiveLimit"
        label={getTranslatedValue('em_device_capacitive_limit')}
        error={errors?.invoiceInfo?.capacitiveLimit?.message}
        register={register}
      />
      <DecimalInput
        type="number"
        name="device.deviceACRatedPower"
        label={getTranslatedValue('em_inv_ac_rated_power')}
        error={errors?.device?.deviceACRatedPower?.message}
        step={'0.01'}
        register={register}
        setValue={register.setValue}
      />
      <DecimalInput
        type="number"
        name="device.deviceDCRatedPower"
        label={getTranslatedValue('em_inv_dc_rated_power')}
        error={errors?.device?.deviceDCRatedPower?.message}
        step={'0.01'}
        register={register}
        setValue={register.setValue}
      />
      <DecimalInput
        setValue={register.setValue}
        type="number"
        name="device.deviceACLimitedPower"
        label={getTranslatedValue('em_inv_ac_limited_power')}
        error={errors?.device?.deviceACLimitedPower?.message}
        step={'0.01'}
        register={register}
      />
    </div>
  );
};

const DeviceElectricityInfoFormContent = memo(
  MemoDeviceElectricityInfoFormContent,
);

export default DeviceElectricityInfoFormContent;
