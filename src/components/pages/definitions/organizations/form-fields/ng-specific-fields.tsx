import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  organizationStationNgSourceTypeOptions,
  organizationStationType2Options,
  organizationStationTypeOptions,
} from '@/enum-data/definitions/organizations-data';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchParentRmsaStationLookup } from '@/services/definitions/organizations/organizations-api';
import { useQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';

const NgSpecificFields = ({
  register,
  errors,
  control,
  setValue,
}: {
  register: any;
  errors: any;
  control: any;
  setValue: any;
}) => {
  const { data: parentRmsaStation } = useQuery({
    queryKey: ['Parent Rmsa Station Lookup'],
    queryFn: fetchParentRmsaStationLookup,
    retry: false,
  });

  const organizationIntegrationActive = useWatch({
    control,
    name: 'organizationIntegrationActive',
  });

  const organizationStationActive = useWatch({
    control,
    name: 'organizationStationActive',
  });

  const organizationRoundConsumption = useWatch({
    control,
    name: 'organizationRoundConsumption',
  });

  const organizationOperatorSHVSelection = useWatch({
    control,
    name: 'organizationOperatorSHVSelection',
  });

  const organizationSHVSelection = useWatch({
    control,
    name: 'organizationSHVSelection',
  });

  const organizationStationIsConductionService = useWatch({
    control,
    name: 'organizationStationIsConductionService',
  });

  const organizationIsStationFreeConsumer = useWatch({
    control,
    name: 'organizationIsStationFreeConsumer',
  });

  const organizationStationAddWrongConsumptionToTotal = useWatch({
    control,
    name: 'organizationStationAddWrongConsumptionToTotal',
  });

  const organizationStationAddRMSAConsToEBTTotal = useWatch({
    control,
    name: 'organizationStationAddRMSAConsToEBTTotal',
  });

  const organizationStationEBTIntegration = useWatch({
    control,
    name: 'organizationStationEBTIntegration',
  });

  return (
    <>
      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="organizationStationEBTIntUserName"
        label={getTranslatedValue('OrganizationStationEBTIntUserName')}
        required
        error={errors?.organizationStationEBTIntUserName?.message}
        register={register}
      />

      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="organizationStationEBTIntPassword"
        label={getTranslatedValue('OrganizationStationEBTIntPassword')}
        error={errors?.organizationStationEBTIntPassword?.message}
        register={register}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationIntegrationActive', value)
        }
        checked={organizationIntegrationActive}
        label={getTranslatedValue('organizationIntegrationActive')}
      />

      <RegisterInput
        type="text"
        name="organizationIntegrationCode"
        label={getTranslatedValue('organizationIntegrationCode')}
        error={errors?.organizationIntegrationCode?.message}
        register={register}
      />

      <RegisterSelectInput
        label={getTranslatedValue('OrganizationStationType')}
        name="organizationStationType"
        options={organizationStationTypeOptions}
        error={errors?.organizationStationType?.message}
        register={register}
        control={control}
        required
      />

      <Checkbox
        onChange={(value: any) => setValue('organizationStationActive', value)}
        checked={organizationStationActive}
        label={getTranslatedValue('OrganizationStationActive')}
      />

      <RegisterInput
        type="number"
        name="organizationGCOrganizationId"
        label={getTranslatedValue('OrganizationGCOrganizationId')}
        error={errors?.organizationGCOrganizationId?.message}
        register={register}
        required
      />

      <RegisterInput
        type="number"
        name="organizationStationUltrasonicDeviceId"
        label={getTranslatedValue('OrganizationStationUltrasonicDeviceId')}
        error={errors?.organizationStationUltrasonicDeviceId?.message}
        register={register}
        required
      />

      <RegisterSelectInput
        label={getTranslatedValue('OrganizationSubstitutionOrganizationId')}
        name="organizationSubstitutionOrganizationId"
        options={formatSelectOptionsWithoutItems(parentRmsaStation)}
        error={errors?.organizationSubstitutionOrganizationId?.message}
        register={register}
        control={control}
        required
      />

      <RegisterInput
        type="number"
        name="organizationStationFuelLineDeviceId"
        label={getTranslatedValue('OrganizationStationFuelLineDeviceId')}
        error={errors?.organizationStationFuelLineDeviceId?.message}
        register={register}
        required
      />

      <RegisterSelectInput
        label={getTranslatedValue('OrganizationStationNGSourceType')}
        name="organizationStationNGSourceType"
        options={organizationStationNgSourceTypeOptions}
        error={errors?.organizationStationNGSourceType?.message}
        register={register}
        control={control}
        required
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationRoundConsumption', value)
        }
        checked={organizationRoundConsumption}
        label={getTranslatedValue('OrganizationRoundConsumption')}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationOperatorSHVSelection', value)
        }
        checked={organizationOperatorSHVSelection}
        label={getTranslatedValue('OrganizationOperatorSHVSelection')}
      />

      <Checkbox
        onChange={(value: any) => setValue('organizationSHVSelection', value)}
        checked={organizationSHVSelection}
        label={getTranslatedValue('OrganizationSHVSelection')}
      />

      <RegisterInput
        type="text"
        name="organizationOperatorUserName"
        label={getTranslatedValue('OrganizationOperatorUserName')}
        error={errors?.organizationOperatorUserName?.message}
        register={register}
      />

      <RegisterInput
        type="text"
        name="organizationOperatorPassword"
        label={getTranslatedValue('OrganizationOperatorPassword')}
        error={errors?.organizationOperatorPassword?.message}
        register={register}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationStationIsConductionService', value)
        }
        checked={organizationStationIsConductionService}
        label={getTranslatedValue('OrganizationStationIsConductionService')}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationIsStationFreeConsumer', value)
        }
        checked={organizationIsStationFreeConsumer}
        label={getTranslatedValue('OrganizationIsStationFreeConsumer')}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationStationAddWrongConsumptionToTotal', value)
        }
        checked={organizationStationAddWrongConsumptionToTotal}
        label={getTranslatedValue(
          'OrganizationStationAddWrongConsumptionToTotal',
        )}
      />

      <div />

      <RegisterSelectInput
        label={getTranslatedValue('OrganizationParentRMSAStationId')}
        name="organizationParentRMSAStationId"
        options={formatSelectOptionsWithoutItems(parentRmsaStation)}
        error={errors?.organizationParentRMSAStationId?.message}
        register={register}
        control={control}
      />

      <RegisterSelectInput
        label={getTranslatedValue('OrganizationStationType2')}
        name="organizationStationType2"
        options={organizationStationType2Options}
        error={errors?.organizationStationType2?.message}
        register={register}
        control={control}
        required
      />

      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="organizationStationEBTIntCode"
        label={getTranslatedValue('OrganizationStationEBTIntCode')}
        error={errors?.organizationStationEBTIntCode?.message}
        register={register}
      />

      <Checkbox
        onChange={(value: any) =>
          setValue('organizationStationEBTIntegration', value)
        }
        checked={organizationStationEBTIntegration}
        label={getTranslatedValue('OrganizationStationEBTIntegration')}
      />
      <div />
      <Checkbox
        onChange={(value: any) =>
          setValue('organizationStationAddRMSAConsToEBTTotal', value)
        }
        checked={organizationStationAddRMSAConsToEBTTotal}
        label={getTranslatedValue('OrganizationStationAddRMSAConsToEBTTotal')}
      />
    </>
  );
};

export default NgSpecificFields;
