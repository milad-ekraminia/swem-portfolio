import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchGetUserAlarmConfigurationList,
  updateAlarmConfigurationDetails,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import {
  alarmConfigurationsInitialValues,
  alarmConfigurationsInitialValuesTypes,
  alarmConfigurationsResolver,
} from '@/validations/definitions/alarm-configurations/alarm-configurations-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AlarmConfigurationFormContent } from './form-content';
import NewEditModalAction from './new-edit-modal-buttons';

const EditAlarmConfigurationModal = ({
  setShowEditModal,
  alarmConfiguration,
}: {
  setShowEditModal: any;
  alarmConfiguration: any;
}) => {
  const queryClient = useQueryClient();
  const [level, setLevel] = useState(0);

  // get device model info
  const userAlarmConfigurationResponse = useQuery({
    queryKey: ['Get User Alarm Configuration List', alarmConfiguration?.id],
    queryFn: () =>
      fetchGetUserAlarmConfigurationList({
        alarmConfigurationlId: alarmConfiguration?.id,
      }),
    retry: false,
    enabled: !!alarmConfiguration?.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    trigger,
  } = useForm<alarmConfigurationsInitialValuesTypes>({
    resolver: yupResolver(alarmConfigurationsResolver) as any,
    defaultValues: alarmConfigurationsInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (alarmConfiguration) {
      reset({
        ...alarmConfiguration,
        userAlarmConfigurationList:
          userAlarmConfigurationResponse?.data?.items ?? [],
      });
    }
  }, [reset, alarmConfiguration, userAlarmConfigurationResponse?.data]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['alarm configurations list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateAlarmConfiguration = useMutation({
    mutationFn: updateAlarmConfigurationDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: alarmConfigurationsInitialValuesTypes) => {
    delete (formData as any).selectedOrganizations;
    mutationUpdateAlarmConfiguration.mutate({
      body: formData,
      alarmConfigurationId: alarmConfiguration?.id,
    });
  };

  return (
    <form
      className="edit-alarm-configuration-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="Update" setShowModal={setShowEditModal} />
      <AlarmConfigurationFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        level={level}
        isEdit={true}
      />
      <div className="edit-alarm-configuration-modal__footer">
        <NewEditModalAction
          level={level}
          setLevel={setLevel}
          trigger={trigger}
          setShowModal={setShowEditModal}
          isLoading={mutationUpdateAlarmConfiguration?.isPending}
          onSubmit={() => handleSubmit(onSubmit)()}
        />
      </div>
    </form>
  );
};

export default EditAlarmConfigurationModal;
