import { useEffect, useState } from 'react';
import { CloseSvg } from '@/assets/icons/close-svg';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatDateTime } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceResolver,
  deviceInitialValues,
  deviceInitialValuesTypes,
} from '@/validations/definitions/devices/update-device';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchDeviceUninstallDate,
  fetchDeviceWithDetails,
  uninstallDeviceApi,
  updateDeviceInfo,
} from '@/services/definitions/devices/devices-api';
import { Button } from '@/components/ui/button/button';
import { DevicesFormContent } from './form-content';

const EditDeviceModal = ({
  showEditModal,
  setShowEditModal,
  deviceCategoryResponse,
  deviceAccessPointResponse,
  getDeviceLabelResponse,
}: {
  showEditModal: any;
  setShowEditModal: any;
  deviceCategoryResponse: any;
  deviceAccessPointResponse: any;
  getDeviceLabelResponse: any;
}) => {
  const queryClient = useQueryClient();
  const [level, setLevel] = useState(0);

  const results = useQueries({
    queries: [
      {
        queryKey: ['Device Uninstall Date'],
        queryFn: () =>
          fetchDeviceUninstallDate({ deviceId: showEditModal?.id }),
        retry: false,
      },
      {
        queryKey: ['Get a Device with Details'],
        queryFn: () => fetchDeviceWithDetails({ deviceId: showEditModal?.id }),
        retry: false,
      },
    ],
  });

  const [getDeviceUninstallDateResponse, getDeviceDetailResponse] = results;

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

  useEffect(() => {
    if (getDeviceDetailResponse?.data) {
      reset({
        device: {
          ...getDeviceDetailResponse?.data?.device,
          replaceDevice: false,
          deviceModelTypeId:
            getDeviceDetailResponse?.data?.model?.deviceModelTypeId,
          uninstallDevice:
            getDeviceUninstallDateResponse?.data !== '0001-01-01T00:00:00',
          uninstallationDate:
            getDeviceUninstallDateResponse?.data !== '0001-01-01T00:00:00'
              ? getDeviceUninstallDateResponse?.data
              : formatDateTime(String(new Date())),
        },
        invoiceInfo: {
          ...getDeviceDetailResponse?.data?.invoiceInfo,
        },
        userAdditionalData: {
          ...getDeviceDetailResponse?.data?.userAdditionalData,
        },
        // labelDescriptions: getDeviceDetailResponse?.data?.labelDescriptions,
        labelDescriptions: [],
        deviceCommunicationPeriod: {
          ...getDeviceDetailResponse?.data?.period,
        },
      });
    }
  }, [
    getDeviceDetailResponse?.data,
    getDeviceUninstallDateResponse?.data,
    reset,
  ]);

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const handleSuccessUninstallDevice = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['devices list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(false);
  };

  const mutationUninstallDefinitionDevice = useMutation({
    mutationFn: uninstallDeviceApi,
    onSuccess: handleSuccessUninstallDevice,
    onError: handleError,
  });

  const mutationUpdateDefinitionDevice = useMutation({
    mutationFn: updateDeviceInfo,
    onSuccess: ({ uninstallDate, deviceId }) => {
      if (uninstallDate && deviceId) {
        mutationUninstallDefinitionDevice.mutate({
          uninstallDate: formatDateTime(new Date(uninstallDate).toISOString()),
          deviceId,
        });
      }
      reset();
      queryClient.invalidateQueries({ queryKey: ['devices list'] });
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowEditModal(false);
    },
    onError: handleError,
  });

  const onSubmit = (formData: deviceInitialValuesTypes) => {
    mutationUpdateDefinitionDevice.mutate({
      formData,
      deviceId: showEditModal?.id,
    });
  };
  return (
    <form className="edit-device-modal" onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-device-modal__header">
        <div className="">
          <div className="edit-device-modal__header-icon">
            <PlusCircle color="var(--brand-600)" width="24" height="24" />
          </div>
          <div className="edit-device-modal__header-title">
            {getTranslatedValue('Update')}
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
          {level == 0
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
          {level == 0 ? getTranslatedValue('Next') : getTranslatedValue('save')}
        </Button>
      </div>
    </form>
  );
};

export default EditDeviceModal;
