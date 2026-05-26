import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInputAction from '@/components/ui/input/select-input-action/register-select-input-action';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import TypedSelectInput from '@/components/ui/input/typed-select-input/typed-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import {
  alphabetItemEnumOptions,
  deviceModelPeriodOptionsEnumOptions,
  operatorsOptions,
  thresholdTimeUnitTypesEnumOptions,
} from '@/enum-data/definitions/enum';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewDerivedValueApi,
  createNewDerivedValueDetailsApi,
  editDerivedValueApi,
  getDerivedValueDetailsList,
} from '@/services/system-administration/definitions/derived-values';
import {
  DerivedValueFormData,
  Parameter,
} from '@/types/pages/system-administration/definitions/derived-values';
import {
  derivedValueFormValidation,
  derivedValueInitialValues,
} from '@/validations/system-administration/definitions/dervied-values';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import ParametersTable from './parameters/parameters-table';

interface Props {
  onClose: () => void;
  derivedValue?: any;
}
export default function DerivedValuesForm({ onClose, derivedValue }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<DerivedValueFormData>({
    resolver: yupResolver(derivedValueFormValidation) as any,
    defaultValues: derivedValueInitialValues,
  });
  useEffect(() => {
    if (derivedValue) {
      reset(derivedValue);
    }
  }, [derivedValue, reset]);

  const derivedValueDetail = useQuery({
    queryKey: ['derived value detail list', derivedValue?.id],
    queryFn: () =>
      getDerivedValueDetailsList({ derivedValueId: derivedValue?.id }),
    retry: false,
    enabled: !!derivedValue,
  });
  useEffect(() => {
    if (derivedValueDetail.data) {
      append(derivedValueDetail.data);
    }
  }, [derivedValueDetail.isLoading, derivedValueDetail.data]);

  const {
    register: formulaRegister,
    control: formulaControl,
    getValues: formulaGetValues,
  } = useForm<any>({
    defaultValues: {
      alphabet: '',
      operator: '',
    },
  });

  const handleSuccess = async (result: any) => {
    const details = result?.submitedFormData?.derivedValueParametersDetails;
    if (details?.length > 0 && !derivedValue) {
      details.forEach((element: any, idx: number) => {
        createDetailMutation.mutate({
          formData: { ...element, dvId: result?.response?.id },
          lastParams: details.length - 1 === idx,
        });
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['derivedValues'] });
      toast.success(getTranslatedValue('SaveSuccess'));
      onClose();
      reset();
    }
  };
  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const createDetailMutation = useMutation({
    mutationFn: createNewDerivedValueDetailsApi,
    onSuccess: ({ lastParams }) => {
      if (lastParams) {
        queryClient.invalidateQueries({ queryKey: ['derivedValues'] });
        toast.success(getTranslatedValue('SaveSuccess'));
        onClose();
        reset();
      }
    },
    onError: handleError,
  });
  const createMutation = useMutation({
    mutationFn: createNewDerivedValueApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) =>
    derivedValue
      ? mutationEditDerivedValues.mutate({ formData })
      : createMutation.mutate({ formData });

  const handleChangeFormula = (name: any) => {
    const dvFormula = getValues('dvFormula');
    if (name === 'alphabet') {
      const alphabet = formulaGetValues('alphabet');
      setValue(
        'dvFormula',
        dvFormula +
        alphabetList?.find((item: any) => item?.value === parseInt(alphabet))
          ?.title,
      );
    } else {
      const operator = formulaGetValues('operator');
      setValue(
        'dvFormula',
        dvFormula +
        operatorsOptions?.find((item: any) => item?.value === operator)
          ?.title,
      );
    }
  };
  const mutationEditDerivedValues = useMutation({
    mutationFn: editDerivedValueApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { fields, append, remove } = useFieldArray<{
    derivedValueParametersDetails: Parameter[];
  }>({
    control: control as any,
    name: 'derivedValueParametersDetails',
  });

  const isActive = useWatch({ control, name: 'active' });
  const formula = useWatch({ control, name: 'dvFormula' });

  const derivedValueParametersDetails =
    useWatch({
      control,
      name: 'derivedValueParametersDetails' as any,
    }) || [];

  const list = derivedValueParametersDetails;
  const alphabetList = list
    ?.filter((element: any) => {
      return element?.dvItemNr;
    })
    ?.map((element: any) => {
      return alphabetItemEnumOptions.find(
        (item: any) => item.value === element?.dvItemNr,
      );
    });
  const handleCancelForm = () => {
    onClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="global-modal">
      <ModalHeader
        isEdit={!!derivedValue}
        label={
          derivedValue
            ? 'Edit'
            : `${getTranslatedValue('New')} ${getTranslatedValue('DerivedValue')}`
        }
        setShowModal={onClose}
      />
      <div className="derived-values-form-content">
        <div>
          <Checkbox
            label={getTranslatedValue('Active')}
            onChange={(state) => {
              setValue('active', state);
            }}
            checked={isActive}
          />
        </div>
        <div className="row">
          <RegisterInput
            name="dvDescription"
            label={getTranslatedValue('Description')}
            placeholder={getTranslatedValue('Description')}
            type="text"
            error={errors?.dvDescription?.message}
            register={register}
            required
          />
          <TypedSelectInput
            typeName="dvThresholdTimeUnit"
            valueName="dvThresholdTime"
            label={getTranslatedValue('em_derived_value_threshold_time')}
            options={thresholdTimeUnitTypesEnumOptions}
            register={register}
            placeholder={getTranslatedValue('em_derived_value_threshold_time')}
            control={control}
          />
        </div>
        <RegisterSelectInput
          name="dvRecordValue"
          label={getTranslatedValue('RecordValue')}
          options={deviceModelPeriodOptionsEnumOptions}
          register={register}
          placeholder={getTranslatedValue('RecordValue')}
          control={control}
        />
        <div className="row">
          <RegisterSelectInputAction
            name="alphabet"
            label={getTranslatedValue('em_derived_value_item_number')}
            options={alphabetList}
            register={formulaRegister}
            placeholder={getTranslatedValue('em_derived_value_item_number')}
            control={formulaControl}
            onActionClick={() => {
              handleChangeFormula('alphabet');
            }}
          />
          <RegisterSelectInputAction
            name="operator"
            label={getTranslatedValue('em_derived_value_math_operator')}
            options={operatorsOptions}
            register={formulaRegister}
            placeholder={getTranslatedValue('em_derived_value_math_operator')}
            control={formulaControl}
            onActionClick={() => {
              handleChangeFormula('operator');
            }}
          />
        </div>
        <RegisterInput
          name="dvFormula"
          label={getTranslatedValue('em_derived_value_formula')}
          placeholder={getTranslatedValue('em_derived_value_formula')}
          type="text"
          error={errors?.dvFormula?.message}
          register={register}
          required
        />
        <ParametersTable
          control={control}
          formula={formula}
          fields={fields}
          append={append}
          remove={remove}
          isLoading={derivedValueDetail.isLoading}
        />
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          handleCancelForm();
        }}
        isPending={createMutation.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
}
