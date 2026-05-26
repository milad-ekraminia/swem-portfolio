import { Button } from '@/components/ui/button/button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  alphabetItemEnumOptions,
  MCSFormulaOperatorOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

const MemoMultiConditionalStatusFormolContent = ({
  formErrors,
  formRegister,
  formControl,
  formSetValue,
}: {
  formErrors: any;
  formRegister: any;
  formControl: any;
  formSetValue: any;
}) => {
  const schema = yup.object().shape({
    mcsFormulaParameter: yup.string().required(),
    mcsFormulaOperator: yup.string().required(),
  });

  const { register, control } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      mcsFormulaParameter: '',
      mcsFormulaOperator: '',
    },
  });

  const mcsFormulaParameter = useWatch({
    control,
    name: 'mcsFormulaParameter',
  });

  const analogItems =
    useWatch({
      control: formControl,
      name: 'analogItems',
    }) || [];

  const digitalItems =
    useWatch({
      control: formControl,
      name: 'digitalItems',
    }) || [];

  const derivedItems =
    useWatch({
      control: formControl,
      name: 'derivedItems',
    }) || [];

  const list = analogItems.concat(digitalItems, derivedItems);

  const alphabetList = list
    ?.filter((element: any) => {
      return element?.mcsItemNr;
    })
    ?.map((element: any) => {
      return alphabetItemEnumOptions.find(
        (item: any) => item.value === element?.mcsItemNr,
      );
    });

  const mcsFormula =
    useWatch({
      control: formControl,
      name: 'multiConditionalStatus.mcsFormula',
    }) || '';

  return (
    <>
      <div className="grid">
        <RegisterSelectInput
          label={getTranslatedValue('MCSFormulaParameter')}
          options={alphabetList}
          register={register}
          control={control}
          name="mcsFormulaParameter"
          suffix={
            <Button
              type="button"
              variant="primary"
              onClick={() =>
                formSetValue(
                  'multiConditionalStatus.mcsFormula',
                  mcsFormula +
                  alphabetList?.find(
                    (item: any) =>
                      item?.value === parseInt(mcsFormulaParameter),
                  )?.title,
                )
              }
              disabled={mcsFormulaParameter === ''}
            >
              +
            </Button>
          }
        />

        <div className="operation">
          <label className="label">
            {getTranslatedValue('MCSFormulaOperator')}
          </label>
          <div className="buttons">
            {MCSFormulaOperatorOptions?.map((op, index) => {
              return (
                <Button
                  key={`operation-${index}`}
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    formSetValue(
                      'multiConditionalStatus.mcsFormula',
                      mcsFormula + op?.value,
                    )
                  }
                  disabled={op?.value === ''}
                >
                  {op?.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <RegisterInput
        type="text"
        name="multiConditionalStatus.mcsFormula"
        label={getTranslatedValue('Formula')}
        required={true}
        error={formErrors?.mcsFormula?.message}
        maxLength={100}
        register={formRegister}
      />
    </>
  );
};
const MultiConditionalStatusFormolContent = memo(
  MemoMultiConditionalStatusFormolContent,
);

export default MultiConditionalStatusFormolContent;
