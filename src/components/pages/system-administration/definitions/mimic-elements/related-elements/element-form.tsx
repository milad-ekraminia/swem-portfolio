import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { componentConditionEnumOptions } from '@/enum-data/definitions/enum';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import {
  MimicElementFormData,
  MimicElementLookupItem,
  RelatedElementFormData,
} from '@/types/pages/system-administration/definitions/mimic-elements';
import { PlusCircle } from 'lucide-react';
import { UseFieldArrayAppend, useForm, useWatch } from 'react-hook-form';

interface Props {
  mimicElementLookup: MimicElementLookupItem[];
  append: UseFieldArrayAppend<MimicElementFormData, 'mimicElementDetails'>;
  fields: RelatedElementFormData[];
}

const defaultValues: RelatedElementFormData = {
  id: 0,
  componentCondition: 1,
  componentConditionEqual: 0,
  componentConditionMinimum: 0,
  componentConditionMaximum: 0,
  conditionElementId: null,
};

export default function ElementForm({
  mimicElementLookup,
  append,
  fields,
}: Props) {
  const { handleSubmit, register, reset, setValue, control, watch } =
    useForm<RelatedElementFormData>({
      defaultValues,
    });

  const handleAddRelatedElement = (data: RelatedElementFormData) => {
    append({
      id: fields.length + 1,
      componentCondition: data.componentCondition,
      componentConditionEqual: data.componentConditionEqual,
      componentConditionMinimum: data.componentConditionMinimum,
      componentConditionMaximum: data.componentConditionMaximum,
      conditionElementId: data.conditionElementId,
    });

    reset(defaultValues);
  };

  const isAddDisabled =
    !watch('componentCondition') ||
    !watch('componentConditionMaximum') ||
    !watch('componentConditionMinimum') ||
    !watch('conditionElementId');
  const conditionElementId = useWatch({
    control,
    name: 'conditionElementId',
  });
  return (
    <div className="related-elements-form-table__body-row">
      <div className="related-elements-form-table__body-row-column">
        <RegisterSelectInput
          name="componentCondition"
          control={control}
          register={register}
          options={componentConditionEnumOptions}
          placeholder="-"
          isLoading={false}
        />
      </div>

      <div
        className="related-elements-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1' }}
      >
        <RegisterInput
          name="componentConditionEqual"
          register={register}
          type="number"
          placeholder="0"
        />
      </div>

      <div className="related-elements-form-table__body-row-column">
        <DecimalInput
          name="componentConditionMinimum"
          register={register}
          setValue={setValue}
          placeholder="0,00"
        />
      </div>

      <div className="related-elements-form-table__body-row-column">
        <DecimalInput
          name="componentConditionMaximum"
          register={register}
          setValue={setValue}
          placeholder="0,00"
        />
      </div>

      <div className="related-elements-form-table__body-row-column">
        <SearchableDropdown
          handleChange={(value: any) => {
            setValue('conditionElementId', value);
          }}
          name="conditionElementId"
          options={formatSelectOptionsWithoutItems(mimicElementLookup)}
          placeholder="-"
          selectedVal={
            conditionElementId
              ? formatSelectOptionsWithoutItems(mimicElementLookup)?.find(
                (item: any) => item.value == conditionElementId,
              )?.title
              : null
          }
          searchParameterLabel={'title'}
        />
      </div>

      <div
        className="related-elements-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1' }}
      >
        <button
          type="button"
          disabled={isAddDisabled}
          onClick={handleSubmit(handleAddRelatedElement)}
        >
          <PlusCircle stroke={isAddDisabled ? '#98A2B3' : '#2E90FA'} />
        </button>
      </div>
    </div>
  );
}
