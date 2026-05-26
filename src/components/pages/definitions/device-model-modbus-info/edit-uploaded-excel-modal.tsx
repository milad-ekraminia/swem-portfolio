import { memo, useEffect } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceModelModbusResolver,
  deviceModelModbusInitialValues,
  deviceModelModbusInitialValuesTypes,
} from '@/validations/definitions/device-model-modbus/device-model-modbus-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import DeviceModelModbusFormContent from './form-content';

const MemoEditUploadedExcelDeviceModelModbusModal = ({
  setIsVisible,
  deviceModelProtocolId,
  formulaList,
  labelList,
  dataInfo,
  uploadedExcelFileList,
  setUploadedExcelFileList,
  checkImportFromExcelLabels = false,
  sortedUploadedExcelFileList,
}: {
  setIsVisible: (value: any) => void;
  dataInfo: any;
  deviceModelProtocolId: number;
  formulaList: displayNameListType;
  labelList: displayNameListType;
  uploadedExcelFileList: any;
  setUploadedExcelFileList: (value: any) => void;
  checkImportFromExcelLabels?: boolean;
  sortedUploadedExcelFileList: any;
}) => {
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

  const onSubmit = (formData: deviceModelModbusInitialValuesTypes) => {
    // update (setUploadedExcelFileList) array(uploadedExcelFileList) with use index (arrayIndex)
    const arrayIndex = dataInfo?.arrayIndex;

    if (arrayIndex !== -1) {
      uploadedExcelFileList[arrayIndex] = {
        ...formData,
        labelName: getTranslatedValue(
          labelList?.find((item) => Number(item.id) === formData.labelId)
            ?.displayName ?? '-',
        ),
      };
    }

    setUploadedExcelFileList([...uploadedExcelFileList]);

    setIsVisible(false);
  };

  const updatedLabelList = labelList?.map((label: any) => ({
    ...label,
    disabled: sortedUploadedExcelFileList?.find(
      (uploadedItem: any) => uploadedItem.labelId == label.id,
    ),
  }));

  return (
    <Modal
      isOpen={true}
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
          labelList={updatedLabelList}
          formulaList={formulaList}
          setValue={setValue}
          control={control}
          checkImportFromExcelLabels={checkImportFromExcelLabels}
        />
        <SubmitOrCancelButtons
          handleCancelForm={() => setIsVisible(false)}
          isPending={false}
        />
      </form>
    </Modal>
  );
};

const EditUploadedExcelDeviceModelModbusModal = memo(
  MemoEditUploadedExcelDeviceModelModbusModal,
);

export default EditUploadedExcelDeviceModelModbusModal;
