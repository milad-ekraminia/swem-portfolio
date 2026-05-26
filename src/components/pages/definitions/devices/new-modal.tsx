import { useState } from 'react';
import { CloseSvg } from '@/assets/icons/close-svg';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceResolver,
  deviceInitialValues,
  deviceInitialValuesTypes,
} from '@/validations/definitions/devices/update-device';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewDevice } from '@/services/definitions/devices/devices-api';
import { Button } from '@/components/ui/button/button';
import { DevicesFormContent } from './form-content';

const NewDeviceModal = ({
  setShowEditModal,
  deviceCategoryResponse,
  deviceAccessPointResponse,
  getDeviceLabelResponse,
}: {
  setShowEditModal: any;
  deviceCategoryResponse: any;
  deviceAccessPointResponse: any;
  getDeviceLabelResponse: any;
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
  } = useForm<deviceInitialValuesTypes>({
    resolver: yupResolver(addDeviceResolver),
    defaultValues: deviceInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['devices list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(null);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewDefinitionDevice = useMutation({
    mutationFn: createNewDevice,
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const onSubmit = (formData: deviceInitialValuesTypes) => {
    mutationNewDefinitionDevice.mutate(formData);
  };

  return (
    <form className="edit-device-modal" onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-device-modal__header">
        <div className="">
          <div className="edit-device-modal__header-icon">
            <PlusCircle color="var(--brand-600)" width="24" height="24" />
          </div>
          <div className="edit-device-modal__header-title">
            {getTranslatedValue('NewDevice')}
          </div>
        </div>
        <button
          onClick={() => {
            setShowEditModal(false);
          }}
        >
          <CloseSvg />
        </button>
      </div>
      <DevicesFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        deviceAccessPointResponse={deviceAccessPointResponse}
        deviceCategoryResponse={deviceCategoryResponse}
        getDeviceLabelResponse={getDeviceLabelResponse}
        reset={reset}
        level={level}
        isEdit={false}
      />
      <div className="edit-device-modal__footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            if (level === 0) {
              setShowEditModal(false);
            } else {
              setLevel(0);
            }
          }}
        >
          {level === 0
            ? getTranslatedValue('Cancel')
            : getTranslatedValue('back')}
        </Button>
        <Button
          type="button" // ⛔ prevent default form submit
          variant="primary"
          onClick={async () => {
            if (level === 0) {
              const isValid = await trigger([
                'device.deviceDescription',
                'device.deviceSerialNr',
                'device.deviceOrganizationId',
                'device.deviceModelId',
              ]);
              if (isValid) {
                setLevel(1);
              } else {
                toastError(getTranslatedValue('PleaseFillRequiredFields'));
              }
            } else if (level === 1) {
              handleSubmit(onSubmit)();
            }
          }}
        >
          {level === 0
            ? getTranslatedValue('Next')
            : getTranslatedValue('save')}
        </Button>
      </div>
    </form>
  );
};

export default NewDeviceModal;
