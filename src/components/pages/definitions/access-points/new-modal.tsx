import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  accessPointsInitialValues,
  accessPointsInitialValuesTypes,
  accessPointsResolver,
} from '@/validations/definitions/access-points/access-point-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewAccessPoint } from '@/services/definitions/access-points/access-points-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { AccessPointFormContent } from './form-content';

const NewAccessPointModal = ({
  setShowEditModal,
}: {
  setShowEditModal: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    // trigger
  } = useForm<accessPointsInitialValuesTypes>({
    resolver: yupResolver(accessPointsResolver) as any,
    defaultValues: accessPointsInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['access points list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewAccessPoint = useMutation({
    mutationFn: createNewAccessPoint,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: accessPointsInitialValuesTypes) => {
    mutationNewAccessPoint.mutate({
      ...formData,
      accessPointSerialNr: formData.accessPointSerialNr?.toString(),
      accessPointPort: formData.accessPointPort?.toString(),
      accessPointConfPort: formData.accessPointConfPort?.toString(),
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewAccessPoint"
        setShowModal={setShowEditModal}
      />
      <AccessPointFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowEditModal(false);
        }}
        isPending={mutationNewAccessPoint?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewAccessPointModal;
