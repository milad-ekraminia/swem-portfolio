import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import {
  electricFormList,
  energyFormList,
  heatFormList,
  naturalGasFormList,
  waterFormList,
} from '@/helpers/firm-confirmtion/firm-confirmtion-terms';
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

function FirmConfigurationFormContainerTerm({
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
    <CommonContainerWithHeader label={'em_dashboard_widget_term'}>
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <PartitionForm
          label={'electricity'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={electricFormList(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'em_device_natural_gas_info'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={naturalGasFormList(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'em_mimic_element_group_water'}
          control={control}
          errors={errors}
          setValue={setValue}
          register={register}
          list={waterFormList(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'energy_type_4'}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={heatFormList(errors)}
          watch={watch}
        />
        <PartitionForm
          label={'energy'}
          control={control}
          errors={errors}
          setValue={setValue}
          register={register}
          list={energyFormList(errors)}
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

export default FirmConfigurationFormContainerTerm;
