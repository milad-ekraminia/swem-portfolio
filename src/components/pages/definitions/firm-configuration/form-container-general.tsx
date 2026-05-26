import {
  communicationList,
  emList,
  endUserReportsList,
  generalList,
  isoList,
  mapList,
  mimicDiagramList,
  organizationBasedMonitoringList,
  // panelMonitoringList,
  specialReportsList,
} from '@/helpers/firm-confirmtion/firm-confirmtion-general';
import { useQuery } from '@tanstack/react-query';
import {
  fetchMimicDiagramLookupList,
  fetchOrganizationUserRolesLookupList,
} from '@/services/system-administration/definitions/firm-configurations';
import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
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

function FirmConfigurationFormContainerGeneral({
  register,
  handleSubmit,
  errors,
  control,
  setValue,
  onSubmit,
  watch,
  isPending = false,
}: FormContainerProps) {
  const { data: mimicDiagramLookup, isLoading: isMimicDiagramLookupLoading } =
    useQuery({
      queryKey: ['Mimic Diaigrams Lookup List'],
      queryFn: () => fetchMimicDiagramLookupList(),
      retry: false,
    });
  const { data: userRolesLookup, isLoading: isUserRolesLookupLoading } =
    useQuery({
      queryKey: ['Organization User Roles Lookup List'],
      queryFn: () => fetchOrganizationUserRolesLookupList(),
      retry: false,
    });

  return (
    <CommonContainerWithHeader label={'Invoicing'}>
      <form className="inner-form" onSubmit={handleSubmit(onSubmit)}>
        <PartitionForm
          title={'organization_based_monitoring'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={organizationBasedMonitoringList(errors)}
          watch={watch}
        />

        {/* <PartitionForm
          title={'Dashboard.Title'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={panelMonitoringList(errors)}
          watch={watch}
        /> */}
        <PartitionForm
          title={'Map'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={mapList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={'MimicDiagram'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={
            isMimicDiagramLookupLoading
              ? []
              : mimicDiagramList(errors, mimicDiagramLookup?.items)
          }
          watch={watch}
        />
        <PartitionForm
          title={'ISO50001'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={isoList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={'Communication'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={communicationList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={'mnuEMReportCddHdd'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={emList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={'General'}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={generalList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={getTranslatedValue('SpecialReports')}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={specialReportsList(errors)}
          watch={watch}
        />
        <PartitionForm
          title={getTranslatedValue('EndUser')}
          control={control}
          errors={errors}
          columns={2}
          register={register}
          setValue={setValue}
          list={
            isUserRolesLookupLoading
              ? []
              : endUserReportsList(errors, userRolesLookup)
          }
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

export default FirmConfigurationFormContainerGeneral;
