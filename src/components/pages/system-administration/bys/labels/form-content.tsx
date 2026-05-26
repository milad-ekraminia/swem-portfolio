import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import {
  labelGroupList,
  lableDataTypeListOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import DeviceTypeLabelField from './device-label-field';

const MemoLabelFormContent = ({
  errors,
  register,
  control,
  setValue,
  isEdit,
  info,
  reset,
}: {
  errors: any;
  register: any;
  setValue: any;
  control: any;
  isEdit?: any;
  info?: any;
  reset?: any;
}) => {
  return (
    <div className="labels-form-content">
      <div className="grid">
        <RegisterInput
          required
          type="text"
          name="labelName"
          label={getTranslatedValue('LabelName')}
          autoFocus={true}
          error={errors?.labelName?.message}
          register={register}
        />
        <RegisterInput
          required
          type="text"
          name="labelCode"
          label={getTranslatedValue('LabelCode')}
          autoFocus={true}
          error={errors?.labelCode?.message}
          register={register}
        />
        <RegisterSelectInput
          name="labelGroup"
          label={getTranslatedValue('LabelGroup')}
          required
          options={labelGroupList}
          register={register}
          placeholder={getTranslatedValue('LabelGroup')}
          control={control}
          error={errors?.labelGroup?.message}
        />
        <RegisterSelectInput
          name="labelDataTypeId"
          label={getTranslatedValue('LabelDataType')}
          required
          options={lableDataTypeListOptions}
          register={register}
          placeholder={getTranslatedValue('LabelDataType')}
          control={control}
          error={errors?.labelDataTypeId?.message}
        />
      </div>
      <div className="toggles-box">
        <ToggleRegister
          control={control}
          register={register}
          name="definitionFlag"
          label={getTranslatedValue('DefinitionFlag')}
        />
        <ToggleRegister
          control={control}
          register={register}
          name="hasFlag"
          label={getTranslatedValue('HasFlag')}
        />
      </div>
      <DeviceTypeLabelField
        isEdit={isEdit}
        setValue={setValue}
        labelId={info?.id ?? -1}
        control={control}
        info={info}
        reset={reset}
      />
    </div>
  );
};

const LabelFormContent = memo(MemoLabelFormContent);

export default LabelFormContent;
