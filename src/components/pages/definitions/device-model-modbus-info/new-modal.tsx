import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewDefinitionDeviceModelModbusModel } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import {
  addDeviceModelModbusResolver,
  deviceModelModbusInitialValues,
  deviceModelModbusInitialValuesTypes,
} from '@/validations/definitions/device-model-modbus/device-model-modbus-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeviceModelModbusFormContent from './form-content';

const MemoAddNewDeviceModelModbusModal = ({
  setIsVisible,
  deviceModelProtocolId,
  formulaList,
  labelList,
  modalOpen,
}: {
  setIsVisible: (value: boolean) => void;
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

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewDefinitionDeviceModel = useMutation({
    mutationFn: createNewDefinitionDeviceModelModbusModel,
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
        <ModalHeader
          label="NewDeviceModelModbusTable"
          setShowModal={setIsVisible}
        />
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

const AddNewDeviceModelModbusModal = memo(MemoAddNewDeviceModelModbusModal);

export default AddNewDeviceModelModbusModal;
