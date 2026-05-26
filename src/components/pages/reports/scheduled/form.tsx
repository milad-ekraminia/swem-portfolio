import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import MultiSelectInput from '@/components/ui/input/multi-select-input/multi-select-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchAppUserLookupList } from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { createScheduledReportApi, updateScheduledReportApi } from '@/services/reports/scheduled-reports-api';
import {
  ScheduledReport,
  ScheduledReportFormData,
} from '@/types/pages/reports/scheduled';
import { scheduledReportFormValidation } from '@/validations/reports/scheduled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultValues = {
  "Active": true,
  "Description": "",
  "FilterProfileId": undefined,
  // "ReportType": "periodic-elec-prod-cons",
  "WorkHour": undefined,
  "SendMail": true,
  "UserIds": [],
  "LastReportTime": "",
  "NextReportTime": ""
};

interface ReportsFilterProfileListProps {
  "filterProfileId": number,
  "filterProfileName": string,
  "reportType": string
}

interface Props {
  onSuccess: () => void;
  scheduledReport?: ScheduledReport;
  reportsFilterProfileList: ReportsFilterProfileListProps[]
}

const ScheduledReportsForm = ({ onSuccess, scheduledReport, reportsFilterProfileList }: Props) => {
  const queryClient = useQueryClient();

  const { data: usersLookupResponse } = useQuery({
    queryKey: ['App User Lookup List'],
    queryFn: () => fetchAppUserLookupList(),
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<ScheduledReportFormData>({
    resolver: yupResolver(scheduledReportFormValidation as any),
    defaultValues,
  });

  // Set Plant image data thats being edited
  useEffect(() => {
    if (scheduledReport) {
      reset({
        "Active": scheduledReport.active,
        "Description": scheduledReport.description,
        "FilterProfileId": scheduledReport.filterProfileId,
        // "ReportType": scheduledReport.reportType,
        "WorkHour": scheduledReport.workHour,
        "SendMail": scheduledReport.sendMail,
        "UserIds": scheduledReport.userIds,
        "LastReportTime": scheduledReport.lastReportTime,
        "NextReportTime": scheduledReport.nextReportTime,
      });
    }
  }, [scheduledReport, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['Scheduled Reports'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };
  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateScheduledReportApi,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createScheduledReportApi,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ScheduledReportFormData) => {
    if (scheduledReport) {
      editMutation.mutate({
        formData,
        scheduledId: scheduledReport.id
      });
    } else {
      createMutation.mutate({
        formData,
      });
    }
  };
  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    onSuccess();
  };

  const [SendMail, isActive, assignees, filterProfileId, workHour] = useWatch({
    control,
    name: ['SendMail', 'Active', 'UserIds', 'FilterProfileId', 'WorkHour'],
  });

  const workingHours = Array.from({ length: 24 }, (_, i) => ({
    title: i === 0
      ? getTranslatedValue("WorkingHours.Now")
      : getTranslatedValue(`WorkingHours.${i}HourLater`),
    value: i,
  }));

  const mergeList = reportsFilterProfileList?.map((reportProfileItem: ReportsFilterProfileListProps) => ({
    title: reportProfileItem.reportType + " - " + reportProfileItem.filterProfileName,
    value: reportProfileItem.filterProfileId,
  }))

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        label={getTranslatedValue('GeneralInfo')}
        setShowModal={onSuccess}
        isSetting={true}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="Description"
          label={getTranslatedValue('ScheduledReportDescription')}
          placeholder={getTranslatedValue('ScheduledReportDescription')}
          type="text"
          error={errors?.Description?.message}
          register={register}
          required={true}
        />

        <SearchableDropdown
          name="FilterProfileId"
          label={getTranslatedValue('em_report_filter_profile_name')}
          searchParameterLabel={'title'}
          options={
            reportsFilterProfileList?.length > 0 ? mergeList : []
          }
          selectedVal={
            filterProfileId
              ? mergeList?.find(
                (item: any) => item.value == filterProfileId,
              )?.title
              : null
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(e: any) => {
            setValue('FilterProfileId', parseInt(e));
          }}
          isLoading={false}
          isRequiredInput={true}
          error={errors?.FilterProfileId?.message}
        />

        <SearchableDropdown
          name="WorkHour"
          label={getTranslatedValue('NextWorkingtime')}
          searchParameterLabel={'title'}
          options={
            reportsFilterProfileList?.length > 0 ? workingHours : []
          }
          selectedVal={
            workHour >= 0
              ? workingHours?.find(
                (item: any) => item.value == workHour,
              )?.title
              : null
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(e: any) => {
            setValue('WorkHour', e);
          }}
          isLoading={false}
          isRequiredInput={true}
          error={errors?.WorkHour?.message}
        />

        <MultiSelectInput
          options={
            usersLookupResponse?.map((user: { id: string, displayName: string }) => ({
              title: user.displayName,
              value: user.id
            }))}
          onChange={(value) => {
            setValue('UserIds', value);
          }}
          watch={watch}
          selectedValues={assignees}
          name="UserIds"
          label={getTranslatedValue('em_scheduled_report_user_assign')}
          placeholder={getTranslatedValue('em_scheduled_report_user_assign')}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            width: '100%',
          }}
        >
          <Toggle
            isOn={isActive}
            setIsOn={(value: any) => setValue('Active', value)}
            label={getTranslatedValue('Active')}
          />
          <Toggle
            isOn={SendMail}
            setIsOn={(value: any) => setValue('SendMail', value)}
            label={getTranslatedValue('em_scheduled_report_send_email')}
          />
        </div>
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={createMutation?.isPending || editMutation?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default ScheduledReportsForm;
