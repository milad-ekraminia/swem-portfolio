import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  alphabetItemEnumOptions,
  operatorsOptions,
} from '@/enum-data/definitions/enum';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import {
  fetchDevicesListLookup,
  getLablesListBasedDeviceIdLookup,
} from '@/services/system-administration/definitions/derived-values';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

interface Props {
  mainControl: any;
  fields: any;
  append: any;
  remove: any;
}
export default function DerivedValuesParameterForm({ append, fields }: Props) {
  const { handleSubmit, register, reset, control, watch, setValue } =
    useForm<any>({
      defaultValues: {},
    });
  const dvDeviceId = useWatch({
    control: control,
    name: 'dvDeviceId',
  });

  const derivedValueLabelListResponse = useQuery({
    queryKey: ['derived valued label list', dvDeviceId],
    queryFn: () => dvDeviceId && getLablesListBasedDeviceIdLookup(dvDeviceId),
    retry: false,
    enabled: !!dvDeviceId,
  });
  const derivedValueLabelDefaultListResponse = useQuery({
    queryKey: ['derived valued label list default'],
    queryFn: () => getLablesListBasedDeviceIdLookup(0.0),
    retry: false,
  });

  const fieldsAlphabetList = fields?.map((item: any) => item.dvItemNr) || [];
  const detailFieldsAlphabetList: any = [];

  const savedAlphabetList = fieldsAlphabetList.concat(detailFieldsAlphabetList);
  const derivedValueDeviceListResponse = useQuery({
    queryKey: ['derived values device list'],
    queryFn: () => fetchDevicesListLookup(),
    retry: false,
  });
  const labelList = derivedValueLabelListResponse?.data
    ? derivedValueLabelListResponse?.data
    : derivedValueLabelDefaultListResponse?.data;
  const handleAddDetail = (data: any) => {
    append({
      dvItemNr: data.dvItemNr,
      dvDeviceId: data.dvDeviceId,
      dvLabelId: data.dvLabelId,
      dvMathOperator: data.dvMathOperator,
      dvConstantValue: data.dvConstantValue,
    });
    reset({
      dvConstantValue: null as any,
      dvDeviceId: null,
      dvItemNr: null,
      dvLabelId: null,
      dvMathOperator: null,
    });
  };

  const isActionDisabled =
    !watch('dvItemNr') ||
    !watch('dvDeviceId') ||
    !watch('dvLabelId') ||
    !watch('dvMathOperator') ||
    !watch('dvConstantValue');

  return (
    <div className="derived-values-form-table__body-row">
      <div
        className="derived-values-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1' }}
      >
        <RegisterSelectInput
          name="dvItemNr"
          required
          options={alphabetItemEnumOptions?.filter(
            (item: any) => !savedAlphabetList.includes(item.value),
          )}
          isLoading={false}
          register={register}
          placeholder={'-'}
          control={control}
        />
      </div>
      <div className="derived-values-form-table__body-row-column">
        <RegisterSelectInput
          name="dvDeviceId"
          options={formatSelectOptionsWithoutItems(
            derivedValueDeviceListResponse.data,
          )}
          isLoading={derivedValueDeviceListResponse.isLoading}
          register={register}
          placeholder={'-'}
          control={control}
        />
      </div>
      <div className="derived-values-form-table__body-row-column">
        <RegisterSelectInput
          name="dvLabelId"
          options={labelList?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
            disabled: item.disabled,
          }))}
          isLoading={derivedValueLabelListResponse.isLoading}
          register={register}
          placeholder={'-'}
          control={control}
        />
      </div>
      <div className="derived-values-form-table__body-row-column">
        <RegisterSelectInput
          name="dvMathOperator"
          options={operatorsOptions}
          isLoading={false}
          register={register}
          control={control}
          placeholder={'-'}
        />
      </div>
      <div className="derived-values-form-table__body-row-column">
        <DecimalInput
          setValue={setValue}
          name="dvConstantValue"
          register={register}
          placeholder={'0,00'}
        />
      </div>
      <div
        className="derived-values-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1' }}
      >
        <button
          disabled={isActionDisabled}
          onClick={() => {
            handleSubmit(handleAddDetail)();
          }}
        >
          <PlusCircle stroke={isActionDisabled ? '#98A2B3' : '#2E90FA'} />
        </button>
      </div>
    </div>
  );
}
