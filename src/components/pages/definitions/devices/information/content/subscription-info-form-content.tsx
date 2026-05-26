import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

const MemoDeviceSubscriptionInfoFormContent = ({
  errors,
  register,
  control,
}: {
  errors: any;
  register: any;
  control: any;
}) => {
  return (
    <div className="device-subscription-info-form-content">
      <RegisterSelectInput
        name="invoiceInfo.tariffEnergyId"
        label={getTranslatedValue('em_device_tariff_energy_invoice')}
        options={[]}
        error={errors?.invoiceInfo?.tariffEnergyId?.message}
        isLoading={false}
        register={register}
        control={control}
        placeholder={getTranslatedValue('Search')}
      />
      <RegisterSelectInput
        name="invoiceInfo.tariffEnvironmentalId"
        label={getTranslatedValue('em_device_tariff_environmental_pollution')}
        options={[]}
        error={errors?.invoiceInfo?.tariffEnvironmentalId?.message}
        isLoading={false}
        register={register}
        control={control}
        placeholder={getTranslatedValue('Search')}
      />
      <RegisterInput
        type="text"
        name="invoiceInfo.subscriberTitle"
        label={getTranslatedValue('em_device_subscriber_title')}
        error={errors?.invoiceInfo?.subscriberTitle?.message}
        register={register}
        placeholder={getTranslatedValue('DeviceNumPlaceHolder')}
      />
      <RegisterInput
        type="text"
        name="invoiceInfo.deviceNr"
        label={getTranslatedValue('em_device_device_nr')}
        error={errors?.invoiceInfo?.deviceNr?.message}
        register={register}
        placeholder={getTranslatedValue('DeviceModelPlaceHolder')}
      />
      <RegisterInput
        type="text"
        name="invoiceInfo.facilityNr "
        label={getTranslatedValue('em_device_facility_number')}
        error={errors?.invoiceInfo?.facilityNr?.message}
        register={register}
        placeholder={getTranslatedValue('DeviceSerialNumPlaceHolder')}
      />
      <RegisterInput
        type="number"
        name="invoiceInfo.invoiceDayOfMonth"
        label={getTranslatedValue('em_device_invoice_day_of_month')}
        error={errors?.invoiceInfo?.invoiceDayOfMonth?.message}
        register={register}
        placeholder={getTranslatedValue('DeviceCommAddressPlaceHolder')}
      />
      <RegisterSelectInput
        name="device.deviceEnergyOnOffDeviceId"
        label={getTranslatedValue('em_device_energy_on_off_io_device')}
        options={[]}
        error={errors?.device?.deviceEnergyOnOffDeviceId?.message}
        isLoading={false}
        register={register}
        control={control}
        placeholder={getTranslatedValue('Search')}
      />

      <RegisterSelectInput
        name="device.deviceEnergyOnOffLabelId"
        label={getTranslatedValue('em_device_energy_on_off_io_device_label')}
        options={[]}
        error={errors?.device?.deviceEnergyOnOffLabelId?.message}
        isLoading={false}
        register={register}
        control={control}
        placeholder={getTranslatedValue('Search')}
      />
    </div>
  );
};

const DeviceSubscriptionInfoFormContent = memo(
  MemoDeviceSubscriptionInfoFormContent,
);

export default DeviceSubscriptionInfoFormContent;
