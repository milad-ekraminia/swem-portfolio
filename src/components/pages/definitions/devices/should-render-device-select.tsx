import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { deviceModelPeriodOptionsEnumOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';

const MemoShouldRenderDeviceSelect = ({
  readOnlyName,
  name,
  readOnlyLabel,
  label,
  errorMessage,
  register,
  showSelect,
  isReadonly,
  control,
}: {
  readOnlyName: string;
  name: string;
  readOnlyLabel: string;
  label: string;
  errorMessage?: string;
  register: any;
  showSelect: boolean;
  isReadonly: boolean;
  control: any;
}) => {
  if (!showSelect) return null;
  return (
    <>
      <RegisterSelectInput
        name={name}
        label={getTranslatedValue(label)}
        options={deviceModelPeriodOptionsEnumOptions}
        error={errorMessage}
        register={register}
        disabled={isReadonly}
        control={control}
      />
      <RegisterSelectInput
        name={readOnlyName}
        label={getTranslatedValue(readOnlyLabel)}
        options={deviceModelPeriodOptionsEnumOptions}
        error={errorMessage}
        register={register}
        control={control}
      />
    </>
  );
};

const ShouldRenderDeviceSelect = memo(MemoShouldRenderDeviceSelect);

export default ShouldRenderDeviceSelect;
