import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { invoicingList } from '@/helpers/firm-confirmtion/firm-confirmtion-invoicing';
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

function FirmConfigurationFormContainerInvoicing({
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
    <CommonContainerWithHeader label={'Invoicing'}>
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <PartitionForm
          control={control}
          errors={errors}
          columns={3}
          register={register}
          setValue={setValue}
          list={invoicingList(errors)}
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

export default FirmConfigurationFormContainerInvoicing;
