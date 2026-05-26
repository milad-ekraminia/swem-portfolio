import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import SkeletonLoader from '@/components/ui/skeleton/skeleton-loader';
import {
  deviceModelProtocolTypeOptionsEnum,
  deviceModelTypeOptionsForCreateEnum,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { lazy, memo, Suspense } from 'react';
import { useWatch } from 'react-hook-form';

const DeviceModelFormContentSelectedProtocolId = lazy(
  () => import('./protocol/form-content-selected-protocol-id'),
);

const MemoDeviceModelFormContent = ({
  errors,
  register,
  control,
  isEdit = false,
  setValue,
}: {
  errors: any;
  register: any;
  control: any;
  isEdit?: boolean;
  setValue: any;
}) => {
  const deviceModelProtocolId = Number(
    useWatch({
      control,
      name: 'deviceModelProtocolId',
    }),
  );
  const active = useWatch({
    control,
    name: 'active',
  });
  return (
    <div className="device-models-form-content">
      <div className="device-models-form-content__content">
        <div className="device-models-form-content__header">
          <div className="checkbox-group">
            <Toggle
              isOn={active}
              setIsOn={() => {
                setValue('active', !active);
              }}
              label={getTranslatedValue('Active')}
            />
          </div>
        </div>
        <RegisterInput
          type="text"
          name="deviceModelName"
          label={getTranslatedValue('DeviceModelName')}
          required={true}
          autoFocus={true}
          error={errors?.deviceModelName?.message}
          register={register}
        />
        <RegisterInput
          type="text"
          name="deviceModelCode"
          label={getTranslatedValue('DeviceModelCode')}
          required={true}
          autoFocus={true}
          error={errors?.deviceModelCode?.message}
          register={register}
        />
        <RegisterSelectInput
          name="deviceModelTypeId"
          label={getTranslatedValue('DeviceModelTypeId')}
          required={true}
          options={deviceModelTypeOptionsForCreateEnum}
          error={errors?.deviceModelTypeId?.message}
          register={register}
          disabled={isEdit}
          control={control}
        />
        <RegisterSelectInput
          name="deviceModelProtocolId"
          label={getTranslatedValue('DeviceModelProtocolId')}
          required={true}
          options={deviceModelProtocolTypeOptionsEnum}
          error={errors?.deviceModelProtocolId?.message}
          register={register}
          disabled={isEdit}
          control={control}
        />
        {deviceModelProtocolId >= 0 && (
          <Suspense
            fallback={
              <SkeletonLoader
                //   classList="w-full h-20 md:col-span-2"
                label={getTranslatedValue('Loading')}
              />
            }
          >
            <DeviceModelFormContentSelectedProtocolId
              errors={errors}
              register={register}
              deviceModelProtocolId={deviceModelProtocolId}
              disableInputField={deviceModelProtocolId === 9}
              control={control}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

const DeviceModelFormContent = memo(MemoDeviceModelFormContent);

export default DeviceModelFormContent;
