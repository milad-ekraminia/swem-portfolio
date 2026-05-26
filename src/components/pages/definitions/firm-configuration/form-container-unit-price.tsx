import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import {
  electricFormListUnitPrice,
  energyFormListUnitPrice,
  heatFormListUnitPrice,
  naturalGasFormListUnitPrice,
  waterFormListUnitPrice,
} from '@/helpers/firm-confirmtion/firm-confirmtion-unit-price';
import { getTranslatedValue } from '../../../../helpers/get-translated-value';
import PartitionForm from './form-partition';

interface FormContainerProps {
  register: any;
  handleSubmit: any;
  errors: any;
  control: any;
  setValue: any;
  onSubmit: any;
  watch: any;
  isPending?: boolean;
}

function FirmConfigurationFormContainerUnitPrice({
  register,
  handleSubmit,
  errors,
  control,
  setValue,
  onSubmit,
  watch,
  isPending = false,
}: FormContainerProps) {

  return (
    <CommonContainerWithHeader
      columns={2}
      label={getTranslatedValue('DisplayName:UnitPrice', 'Payment.texts')}
    >
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <PartitionForm
          label={'electricity'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={electricFormListUnitPrice(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'em_device_natural_gas_info'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={naturalGasFormListUnitPrice(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'em_mimic_element_group_water'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={waterFormListUnitPrice(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'energy_type_4'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={heatFormListUnitPrice(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'FlowCounter'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={energyFormListUnitPrice(errors)}
          watch={watch}
        />
        <Button
          className="tab-submit-button"
          type="submit"
          variant="primary"
          disabled={isPending}
        >
          {isPending ? (
            <ComponentLoader variant="secondary" />
          ) : (
            getTranslatedValue('Save')
          )}
        </Button>
      </form>
    </CommonContainerWithHeader>
  );
}

export default FirmConfigurationFormContainerUnitPrice;
