import { useCallback, useEffect, useState } from 'react';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { findCaptionsByIds } from '@/helpers/reports/fint-captions-by-id';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useWatch } from 'react-hook-form';
import { CheckboxGroup } from '@/types/pages/reports/reports';
import { useUpdateFilterProfile } from '@/hooks/useCreateNewFilterProfile';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import {
  fetchAllFilterProfiles,
  fetchFilterProfileFieldValues,
} from '@/services/reports/filter-profiles-apis';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import { Button } from '@/components/ui/button/button';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import ReportNameModal from './name-modal';
import ReportsCheckboxes from './reports-checkboxes';
import ReportsOrganizationField from './reports-organization-field';
import FormFields from './shared/form-fields';

export const ReportsFormWrapper = ({
  title,
  handleSubmit,
  register,
  setValue,
  getValues,
  control,
  errors,
  optionsList,
  extraOptionsList,
  filterName,
  isSensorReport = false,
  isSystemAlarm = false,
  isPeriodicProductionConsumptions = false,
  isWeatherReport = false,
  isCarbonReport = false,
  isArchive = false,
  responseIsLoading = false,
  hasPeriodType,
  hasPhaseNo,
  onGetReport,
}: {
  title: string;
  handleSubmit: any;
  register: any;
  setValue: any;
  getValues: any;
  control: any;
  errors: any;
  optionsList?: CheckboxGroup[];
  extraOptionsList?: CheckboxGroup[];
  filterName: string;
  isSensorReport?: boolean;
  isSystemAlarm?: boolean;
  isArchive?: boolean;
  isWeatherReport?: boolean;
  isCarbonReport?: boolean;
  isPeriodicProductionConsumptions?: boolean;
  onGetReport?: VoidFunction;
  responseIsLoading: boolean;
  hasPeriodType?: boolean;
  hasPhaseNo?: boolean;
}) => {
  const [nameModal, setNameModal] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<any>(null);

  const profileKey = useWatch({
    control,
    name: 'profileId',
  });

  const { data: treeData, isLoading: treeLoading } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: () => fetchTreeDataApi(),
    retry: false,
  });

  const { data } = useQuery({
    queryKey: ['profiles', filterName],
    queryFn: () => fetchAllFilterProfiles({ filter: filterName }),
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

    setValue('filterProfileFields', updatedItems);
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
    useUpdateFilterProfile();

  const onSubmitUpdate = (data: any) => {
    const modifiedData = {
      ...data,
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
      <div className="reports-form__wrapper__header">
        <span>{title}</span>
      </div>
      <div className="reports-form__wrapper__body">
        <div className="reports-form__wrapper__body-box">
          {!isCarbonReport && (
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
          )}

          {!isWeatherReport && !isCarbonReport && (
            <ReportsOrganizationField
              treeData={treeData}
              getValues={getValues}
              fields={fields}
              setValue={setValue}
              isLoading={treeLoading}
            />
          )}

          <FormFields
            control={control}
            register={register}
            hasPeriodType={hasPeriodType}
            hasPhaseNo={hasPhaseNo}
            setValue={setValue}
            fields={fields}
            isArchive={isArchive}
            isSensorReport={isSensorReport}
            isSystemAlarm={isSystemAlarm}
            isWeatherReport={isWeatherReport}
            isCarbonReport={isCarbonReport}
            isPeriodicProductionConsumptions={isPeriodicProductionConsumptions}
          />
        </div>

        {/* Options */}
        {optionsList && optionsList?.length > 0 && (
          <div className="reports-form__wrapper__body-checkboxes">
            <ReportsCheckboxes
              control={control}
              setValue={setValue}
              fields={fields}
              optionsList={optionsList}
            />
          </div>
        )}

        {/* Extra Options */}
        {extraOptionsList && extraOptionsList?.length > 0 && (
          <div className="reports-form__wrapper__body-checkboxes">
            <ReportsCheckboxes
              control={control}
              setValue={setValue}
              fields={fields}
              optionsList={extraOptionsList}
            />
          </div>
        )}

        <div className="reports-form__wrapper__body-actions">
          <Button
            type="button"
            variant="primary"
            disabled={responseIsLoading}
            onClick={onGetReport}
          >
            {responseIsLoading ? (
              <ComponentLoader variant="primary" />
            ) : (
              getTranslatedValue('ReportButton')
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleSave}
            disabled={isUpdatePending}
          >
            {isUpdatePending ? (
              <ComponentLoader variant="secondary" />
            ) : (
              getTranslatedValue('Save')
            )}
          </Button>
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
