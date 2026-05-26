import { useCallback, useEffect, useState } from 'react';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { findCaptionsByIds } from '@/helpers/reports/fint-captions-by-id';
import { useQuery } from '@tanstack/react-query';
import { DownloadIcon } from 'lucide-react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { GraphicFormWrapperProps } from '@/types/pages/organization-trace';
import { useUpdateFilterProfileTrendAnalyse } from '@/hooks/useCreateNewFilterProfileTrenAnalysis';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import {
  fetchAllFilterProfilesTrendAnalyse,
  fetchFilterProfileFieldValues,
} from '@/services/reports/filter-profiles-apis';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import { Button } from '@/components/ui/button/button';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import GraphicFormFields from './graphic-form-fields';
import ReportNameModal from './name-modal';
import { transformData } from './transformer';

export const GraphicFormWrapper = ({
  handleSubmit,
  register,
  setValue,
  control,
  errors,
  filterName,
  isSensorReport = false,
  isSystemAlarm = false,
  isPeriodicProductionConsumptions = false,
  isWeatherReport = false,
  isArchive = false,
  responseIsLoading = false,
  onGetReport,
  children,
  handleDownload,
  isExcelDownloading,
}: GraphicFormWrapperProps) => {
  const [nameModal, setNameModal] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<any>(null);

  const profileKey = useWatch({
    control,
    name: 'profileId',
  });

  const { data: treeData } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: () => fetchTreeDataApi(),
    retry: false,
  });

  const { data } = useQuery({
    queryKey: ['profiles', filterName],
    queryFn: () => fetchAllFilterProfilesTrendAnalyse(),
    retry: false,
    enabled: !!filterName,
  });

  const { data: filterProfileData } = useQuery({
    queryKey: ['filter-profile-fields-by-profile-id', profileKey],
    queryFn: () =>
      fetchFilterProfileFieldValues({
        filter_profile_id: profileKey,
      }),
    retry: false,
    enabled: !!(profileKey !== '0' && profileKey),
  });

  const findIndexByFieldName = useCallback(
    (fieldName: string) => {
      return (
        filterProfileData?.items?.findIndex(
          (item: any) => item.fieldName === fieldName,
        ) ?? -1
      );
    },
    [filterProfileData],
  );

  useEffect(() => {
    if (!filterProfileData?.items || !treeData) return;

    // --- handle SelectedOrganizationsObjects ---
    const orgIdsIndex = findIndexByFieldName('SelectedOrganizations');
    const receivedOrgIds =
      filterProfileData?.items[orgIdsIndex]?.fieldValue
        ?.split(';')
        .map((id: any) => Number(id)) ?? [];
    const captions = findCaptionsByIds(treeData, receivedOrgIds);

    const formattedOrganizations = {
      fieldName: 'SelectedOrganizationsObjects',
      fieldType: 4,
      fieldValue: captions,
      filterProfileId: filterProfileData.filterProfileId || 0,
    };

    const updatedItems = [...filterProfileData.items, formattedOrganizations];

    // --- write into form state ---
    setValue('filterProfileFields', updatedItems);

    // map simple fields directly into form values
    // Map Period from API to Period in form
    const fieldMappings: Record<string, string> = {
      Period: 'Period',
      StartDateTime: 'StartDateTime',
      EndDateTime: 'EndDateTime',
    };

    Object.entries(fieldMappings).forEach(([apiFieldName, formFieldName]) => {
      const field = filterProfileData.items.find(
        (f: any) => f.fieldName === apiFieldName,
      );
      if (field) {
        setValue(formFieldName, field.fieldValue); // <-- update react-hook-form
      }
    });
    const finalData = transformData(filterProfileData ?? []);
    setValue(
      'measurementDataFields',
      finalData.measurementDataFields?.map((m: any) => ({
        DeviceId: m.DeviceId,
        LabelId: m.LabelId,
        AggregationType: m.AggregationType,
        Serial: m?.Serial,
        Color: m.Color,
        YAxis: m.YAxis,
        Description: m.Description,
      })) ?? [],
    );
    setValue(
      'consInformationFields',
      finalData.consInformationFields?.map((m: any) => ({
        DeviceId: m.DeviceId,
        LabelId: m.LabelId,
        Period: m.Period,
        Serial: m?.Serial,
        Color: m.Color,
        YAxis: m.YAxis,
        Description: m.Description,
      })) ?? [],
    );
    setValue(
      'deviceArchiveFields',
      finalData.deviceArchiveFields?.map((m: any) => ({
        DeviceId: m.DeviceId,
        LabelId: m.LabelId,
        AggregationType: m.AggregationType,
        Serial: m?.Serial,
        Color: m.Color,
        YAxis: m.YAxis,
        Description: m.Description,
      })) ?? [],
    );
    setValue(
      'weatherInfoFields',
      finalData.weatherInfoFields?.map((m: any) => ({
        CityId: m.CityId,
        AggregationType: m.AggregationType,
        LabelId: m.LabelId,
        Serial: m?.Serial,
        Color: m.Color,
        YAxis: m.YAxis,
        Description: m.Description,
      })) ?? [],
    );
  }, [
    filterProfileData?.items,
    filterProfileData?.filterProfileId,
    treeData,
    findIndexByFieldName,
    setValue,
  ]);

  const { fields } = useFieldArray({
    control,
    name: 'filterProfileFields',
  });

  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateFilterProfileTrendAnalyse();

  const onSubmitUpdate = (data: any) => {
    console.log(data, 'updated', profileKey);
    const modifiedData = {
      ...data,
      id: profileKey,
      filterProfileFields: isWeatherReport
        ? data.filterProfileFields?.map((elem: any) => ({
            ...elem,
            fieldValue: String(elem?.fieldValue),
          }))
        : data.filterProfileFields
            .slice(0, -1) // Exclude the last element
            ?.map((elem: any) => ({
              ...elem,
              fieldValue: String(elem?.fieldValue),
            })),
    };
    mutateUpdate(modifiedData);
  };

  const handleSave = useCallback(() => {
    if (profileKey) handleSubmit(onSubmitUpdate)();
    else setNameModal(true);
  }, [profileKey]);

  const handleDelete = useCallback((option: any) => {
    setDeleteModal(option);
  }, []);

  return (
    <div className="reports-form__wrapper">
      <div className="reports-form__wrapper__body">
        <div className="reports-form__wrapper__body-box">
          <RegisterSelectInput
            register={register}
            control={control}
            name="profileId"
            onOptionDelete={handleDelete}
            label={getTranslatedValue('report_filter_profile')}
            options={formatSelectOptions(data)}
            error={errors?.profileName?.message}
            setShowModal={setNameModal}
            hasNewOption={true}
          />

          <GraphicFormFields
            control={control}
            register={register}
            setValue={setValue}
            fields={fields}
            isArchive={isArchive}
            isSensorReport={isSensorReport}
            isSystemAlarm={isSystemAlarm}
            isWeatherReport={isWeatherReport}
            isPeriodicProductionConsumptions={isPeriodicProductionConsumptions}
          />
        </div>

        {children}
        {/* Options */}
        <div className="tab-submit-button-container">
          <Button
            // onClick={() => setShowResult(true)}
            className="tab-submit-button"
            type="submit"
            variant="primary"
            onClick={onGetReport}
          >
            {responseIsLoading ? (
              <ComponentLoader variant="primary" />
            ) : (
              getTranslatedValue('ReportButton')
            )}
          </Button>
          <Button
            className="tab-submit-button"
            type="submit"
            variant="secondary-blue"
            onClick={handleSave}
          >
            {isUpdatePending ? (
              <ComponentLoader variant="secondary" />
            ) : (
              getTranslatedValue('Save')
            )}
          </Button>
          {handleDownload && (
            <Button
              variant="secondary"
              onClick={handleDownload}
              disabled={isExcelDownloading}
            >
              {/* <Loader className="animate-spin" stroke="#344054" /> */}
              {isExcelDownloading ? (
                <ComponentLoader variant="secondary" />
              ) : (
                <DownloadIcon stroke="#344054" width={20} height={20} />
              )}
            </Button>
          )}
        </div>
      </div>

      {nameModal && (
        <Modal
          isOpen={nameModal}
          onClose={() => setNameModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <ReportNameModal
            filterName={filterName}
            isWeatherReport={isWeatherReport}
            register={register}
            setShowModal={setNameModal}
            handleSubmit={handleSubmit}
            setValue={setValue}
          />
        </Modal>
      )}
      {deleteModal && (
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <SureDeleteModal
            queryKey=""
            deleteItemUrl={`app/filter-profiles/${deleteModal?.value}?api-version=${import.meta.env.VITE_API_VERSION}`}
            multiQueryKey={['profiles', filterName]}
            setShowModal={setDeleteModal}
            onSuccess={() => {
              if (profileKey === deleteModal?.value) setValue('profileId', '');
            }}
          />
        </Modal>
      )}
    </div>
  );
};
