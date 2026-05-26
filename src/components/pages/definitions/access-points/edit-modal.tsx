import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  accessPointsInitialValues,
  accessPointsInitialValuesTypes,
  accessPointsResolver,
} from '@/validations/definitions/access-points/access-point-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchAccessPointDetails,
  fetchAccessPointWithBrokerSubscriptionInfoListDetails,
  updateAccessPointDetails,
} from '@/services/definitions/access-points/access-points-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { AccessPointFormContent } from './form-content';

const EditAccessPointModal = ({
  setShowEditModal,
  accessPointId,
}: {
  setShowEditModal: any;
  accessPointId: number;
}) => {
  const queryClient = useQueryClient();

  const accessPointResponse = useQuery({
    queryKey: ['access point info', accessPointId],
    queryFn: () =>
      fetchAccessPointDetails({
        accessPointId,
      }),
    retry: false,
  });
  const accessPointWithBrokerResponse = useQuery({
    queryKey: ['access point with broker info', accessPointId],
    queryFn: () =>
      fetchAccessPointWithBrokerSubscriptionInfoListDetails({
        accessPointId,
      }),
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<accessPointsInitialValuesTypes>({
    resolver: yupResolver(accessPointsResolver) as any,
    defaultValues: accessPointsInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (accessPointResponse.data && accessPointWithBrokerResponse.data) {
      reset({
        ...accessPointResponse.data,
        brokerSubscriberInfos: accessPointWithBrokerResponse.data?.map(
          (item: any) => ({
            subscriptionTopic: item.subscriptionTopic,
            subscriptionTopicQos: item.subscriptionTopicQos,
          }),
        ),
        active: Boolean(accessPointResponse.data?.active),
      });
    }
  }, [accessPointResponse.data, accessPointWithBrokerResponse.data, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['access points list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(null);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateAccessPoint = useMutation({
    mutationFn: updateAccessPointDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: accessPointsInitialValuesTypes) => {
    mutationUpdateAccessPoint.mutate({
      body: {
        ...formData,
        accessPointSerialNr: formData.accessPointSerialNr?.toString(),
        accessPointPort: formData.accessPointPort?.toString(),
        accessPointConfPort: formData.accessPointConfPort?.toString(),
      },
      accessPointId,
      data: accessPointResponse.data,
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={setShowEditModal} />
      <AccessPointFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowEditModal(null);
        }}
        isPending={mutationUpdateAccessPoint?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default EditAccessPointModal;
