import { CloseSvg } from '@/assets/icons/close-svg';
import { ExportSvg } from '@/assets/icons/export-svg';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ImportExcelModalContent from '@/components/ui/import-excel/import-excel-modal-content';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { convertExcelToBase64 } from '@/helpers/convert-to-base64';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewDefinitionDeviceModelModbusWithUseExcel } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import { useMutation } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MemoImportToExcelDeviceModelModbusModal = ({
  setIsVisible,
  setUploadedExcelFileList,
  modalOpen,
}: {
  setIsVisible: (value: boolean) => void;
  setUploadedExcelFileList: (value: any) => void;
  modalOpen: any;
}) => {
  const { modbusTableId } = useParams();
  const [fileInfo, setFileInfo] = useState<any>(null);

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewDefinitionDeviceWithUseExcel = useMutation({
    mutationFn: createNewDefinitionDeviceModelModbusWithUseExcel,
    onSuccess: (data) => {
      toast.success(getTranslatedValue('SaveSuccess'));
      setIsVisible(false);
      setUploadedExcelFileList(data);
    },
    onError: handleError,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileInfo) {
      try {
        const base64Response = await convertExcelToBase64(fileInfo);

        mutationNewDefinitionDeviceWithUseExcel.mutate({
          formData: base64Response,
          id: Number(modbusTableId),
        });
      } catch (error) {
        toast.error(`Error converting file to Base64: ${error}`);
      }
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setIsVisible(false)}
      showCloseButton={false}
      modalSize="sm"
    >
      <form onSubmit={handleSubmit} className="new-device-model-mod-bus-modal">
        <div className="new-device-model-mod-bus-modal__header">
          <div className="">
            <div className="new-device-model-mod-bus-modal__header-icon">
              <ExportSvg stroke="var(--brand-600)" width="24" height="24" />
            </div>
            <div className="new-device-model-mod-bus-modal__header-title">
              {getTranslatedValue('ImportFromExcel')}
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <CloseSvg />
          </button>
        </div>
        <ImportExcelModalContent
          fileInfo={fileInfo}
          setFileInfo={setFileInfo}
        />
        <SubmitOrCancelButtons
          handleCancelForm={() => setIsVisible(false)}
          isPending={mutationNewDefinitionDeviceWithUseExcel.isPending}
        />
      </form>
    </Modal>
  );
};

const ImportToExcelDeviceModelModbusModal = memo(
  MemoImportToExcelDeviceModelModbusModal,
);

export default ImportToExcelDeviceModelModbusModal;
