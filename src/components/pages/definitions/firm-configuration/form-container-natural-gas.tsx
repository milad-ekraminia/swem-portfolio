import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { naturalGasList } from '@/helpers/firm-confirmtion/firm-confirmtion-natural-gas';
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

function FirmConfigurationFormContainerNaturalGas({
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
    <CommonContainerWithHeader label={getTranslatedValue('NaturalGas')}>
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <PartitionForm
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          list={naturalGasList(errors)}
          columns={2}
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

export default FirmConfigurationFormContainerNaturalGas;
