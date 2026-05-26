import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceModelModbusResolver,
  deviceModelModbusInitialValues,
  deviceModelModbusInitialValuesTypes,
} from '@/validations/definitions/device-model-modbus/device-model-modbus-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateDefinitionDeviceModelModbusModel } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import DeviceModelModbusFormContent from './form-content';

const MemoEditDeviceModelModbusModal = ({
  setIsVisible,
  deviceModelProtocolId,
  formulaList,
  labelList,
  dataInfo,
  modalOpen,
}: {
  setIsVisible: (value: any) => void;
  dataInfo: any;
  deviceModelProtocolId: number;
  formulaList: displayNameListType;
  labelList: displayNameListType;
  modalOpen: any;
}) => {
  const queryClient = useQueryClient();
  const { modbusTableId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<deviceModelModbusInitialValuesTypes>({
    resolver: yupResolver(addDeviceModelModbusResolver) as any,
    defaultValues: deviceModelModbusInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (dataInfo) {
      reset(dataInfo);
    }
  }, [dataInfo, reset]);

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewDefinitionDeviceModel = useMutation({
    mutationFn: updateDefinitionDeviceModelModbusModel,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ['used labels'],
      });
      queryClient.invalidateQueries({
        queryKey: ['device model list by model id'],
      });
      toast.success(getTranslatedValue('SaveSuccess'));
      setIsVisible(false);
    },
    onError: handleError,
  });

  const onSubmit = (formData: deviceModelModbusInitialValuesTypes) => {
    mutationNewDefinitionDeviceModel.mutate({
      formData: {
        ...formData,
        deviceModelId: modbusTableId,
      },
      id: dataInfo?.id,
    });
  };

  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setIsVisible(false)}
      showCloseButton={false}
      modalSize="md"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="new-device-model-mod-bus-modal"
      >
        <ModalHeader isEdit label="Update" setShowModal={setIsVisible} />
        <DeviceModelModbusFormContent
          errors={errors}
          register={register}
          deviceModelProtocolId={deviceModelProtocolId}
          labelList={labelList}
          formulaList={formulaList}
          setValue={setValue}
          control={control}
        />
        <SubmitOrCancelButtons
          handleCancelForm={() => setIsVisible(false)}
          isPending={mutationNewDefinitionDeviceModel.isPending}
        />
      </form>
    </Modal>
  );
};

const EditDeviceModelModbusModal = memo(MemoEditDeviceModelModbusModal);

export default EditDeviceModelModbusModal;
