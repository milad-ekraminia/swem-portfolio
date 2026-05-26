import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { writeFunctionOptionsEnum } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';

const MemoProtocolSpecificFields = ({
  deviceModelProtocolId,
  errors,
  register,
  control,
}: {
  deviceModelProtocolId: number;
  errors: any;
  register: any;
  control: any;
}) => {
  if (deviceModelProtocolId === 9) {
    return (
      <RegisterInput
        type="text"
        name="willTopic"
        label={getTranslatedValue('WillTopic')}
        error={errors?.willTopic?.message}
        register={register}
        title={getTranslatedValue('em_mqtt_will_topic_desc')}
        className="md:col-span-2"
      />
    );
  }
  if ([1, 2, 3].includes(deviceModelProtocolId)) {
    return (
      <RegisterSelectInput
        name="writeFunction"
        label={getTranslatedValue('WriteFunction')}
        options={writeFunctionOptionsEnum}
        error={errors?.writeFunction?.message}
        register={register}
        control={control}
      />
    );
  }
};

const ProtocolSpecificFields = memo(MemoProtocolSpecificFields);

export default ProtocolSpecificFields;
