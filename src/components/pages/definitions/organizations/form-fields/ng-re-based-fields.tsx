import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { OrganizationType } from '@/enum-data/definitions/organizations-data';
import { getOrgTypeEnumOptionsByCondition } from '@/helpers/get-enum-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';

const NgReBasedFields = ({
  ng,
  re,
  register,
  errors,
  control,
  setValue,
}: {
  ng: number;
  re: number;
  register: any;
  errors: any;
  control: any;
  setValue: any;
}) => {
  const organizationShowOnTree = useWatch({
    control,
    name: 'organizationShowOnTree',
  });

  return (
    <>
      {ng == 0 && re == 0 && (
        <>
          <RegisterInput
            type="number"
            name="organizationElectricDensity"
            label={getTranslatedValue('OrganizationElectricDensity')}
            required
            error={errors?.organizationElectricDensity?.message}
            register={register}
          />

          <RegisterInput
            type="number"
            name="organizationNaturalGasDensity"
            label={getTranslatedValue('OrganizationNaturalGasDensity')}
            required
            error={errors?.organizationNaturalGasDensity?.message}
            register={register}
          />
        </>
      )}
      {(ng == 1 || re == 1) && (
        <>
          <RegisterSelectInput
            label={getTranslatedValue('OrganizationType')}
            required
            mainClass="dv-organization-modal__content-input-full"
            name="organizationType"
            options={getOrgTypeEnumOptionsByCondition(OrganizationType, ng, re)}
            error={errors?.organizationType?.message}
            register={register}
            control={control}
          />
          <Checkbox
            onChange={(value: any) => setValue('organizationShowOnTree', value)}
            checked={organizationShowOnTree}
            label={getTranslatedValue('OrganizationShowOnTree')}
          />
        </>
      )}
    </>
  );
};

export default NgReBasedFields;
