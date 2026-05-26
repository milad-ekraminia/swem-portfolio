import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewAlarmConfiguration,
  createNewAlarmConfigurationMultipleDeviceIds,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import {
  alarmConfigurationsInitialValues,
  alarmConfigurationsInitialValuesTypes,
  alarmConfigurationsResolver,
} from '@/validations/definitions/alarm-configurations/alarm-configurations-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AlarmConfigurationFormContent } from './form-content';
import NewEditModalAction from './new-edit-modal-buttons';

const NewAlarmConfigurationModal = ({
  setShowModal,
}: {
  setShowModal: any;
}) => {
  const queryClient = useQueryClient();

  const [level, setLevel] = useState(0);

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

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['alarm configurations list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const alarmConfDeviceSelectionType = useWatch({
    control,
    name: 'alarmConfDeviceSelectionType',
  });

  const mutationNewAlarmConfiguration = useMutation({
    mutationFn:
      alarmConfDeviceSelectionType === 2
        ? createNewAlarmConfigurationMultipleDeviceIds
        : createNewAlarmConfiguration,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: alarmConfigurationsInitialValuesTypes) => {
    const bodyData = {
      ...formData,
    } as Partial<alarmConfigurationsInitialValuesTypes>;
    if (formData?.alarmConfDeviceSelectionType === 2) {
      delete (bodyData as any).selectedOrganizations;
    }
    mutationNewAlarmConfiguration.mutate(bodyData);
  };

  return (
    <form
      className="edit-alarm-configuration-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewAlarmConfiguration" setShowModal={setShowModal} />
      <AlarmConfigurationFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        level={level}
        isEdit={false}
      />
      <div className="edit-alarm-configuration-modal__footer">
        <NewEditModalAction
          level={level}
          setLevel={setLevel}
          trigger={trigger}
          setShowModal={setShowModal}
          isLoading={mutationNewAlarmConfiguration?.isPending}
          onSubmit={() => handleSubmit(onSubmit)()}
        />
      </div>
    </form>
  );
};

export default NewAlarmConfigurationModal;
