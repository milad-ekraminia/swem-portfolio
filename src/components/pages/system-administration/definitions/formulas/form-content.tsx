import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import { formulaTypeEnumOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

const MemoFormulaFormContent = ({
  errors,
  register,
  control,
  setValue,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
}) => {
  const formulaType = Number(
    useWatch({
      control,
      name: 'formulaType',
    }),
  );
  return (
    <div className="formulas-form-content">
      <ToggleRegister
        control={control}
        register={register}
        name="active"
        label={getTranslatedValue('Active')}
      />
      <RegisterInput
        type="text"
        name="formulaName"
        required
        label={getTranslatedValue('FormulaName')}
        autoFocus={true}
        error={errors?.formulaName?.message}
        register={register}
      />
      <RegisterSelectInput
        name="formulaType"
        required
        label={getTranslatedValue('FormulaType')}
        options={formulaTypeEnumOptions}
        register={register}
        placeholder={getTranslatedValue('FormulaType')}
        control={control}
        error={errors?.formulaType?.message}
      />
      {formulaType === 2 ? (
        <div className="grid">
          <DecimalInput
            label={getTranslatedValue('FormulaInputMinimum')}
            name="formulaInputMinimum"
            register={register}
            setValue={setValue}
            placeholder="0,00"
            // step="0.01"
            error={errors?.formulaInputMinimum?.message}
          />
          <DecimalInput
            label={getTranslatedValue('FormulaInputMaximum')}
            name="formulaInputMaximum"
            register={register}
            setValue={setValue}
            placeholder="0,00"
            error={errors?.formulaInputMaximum?.message}
          />
          <DecimalInput
            label={getTranslatedValue('FormulaOutputMinimum')}
            name="formulaOutputMinimum"
            register={register}
            setValue={setValue}
            placeholder="0,00"
            error={errors?.formulaOutputMinimum?.message}
          />
          <DecimalInput
            label={getTranslatedValue('FormulaOutputMaximum')}
            name="formulaOutputMaximum"
            register={register}
            setValue={setValue}
            placeholder="0,00"
            error={errors?.formulaOutputMaximum?.message}
          />
        </div>
      ) : (
        <DecimalInput
          label={getTranslatedValue('FormulaMultiplier')}
          name="formulaMultiplier"
          register={register}
          setValue={setValue}
          placeholder="0,00"
          error={errors?.formulaMultiplier?.message}
        />
      )}
    </div>
  );
};

const FormulaFormContent = memo(MemoFormulaFormContent);

export default FormulaFormContent;
