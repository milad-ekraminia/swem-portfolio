import { memo, useState } from 'react';
import { convertExcelToBase64 } from '@/helpers/convert-to-base64';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewInventoriesWithUseExcel } from '@/services/inventory-management/inventories/create-new-inventory';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import FilePreviewCard from '@/components/ui/input/file-preview/file-preview-card';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const MemoInventoryImportModal = ({
  fileType,
  setShowModal,
}: {
  setShowModal: (value: any) => void;
  fileType?: 'Excel' | 'Csv';
}) => {
  const queryClient = useQueryClient();
  const { plantId, warehouseId } = useParams();
  const [fileInfo, setFileInfo] = useState<any>(null);

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewInventoriesWithUseExcel = useMutation({
    mutationFn: createNewInventoriesWithUseExcel,
    onSuccess: () => {
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
      queryClient.invalidateQueries({
        queryKey: ['inventories general'],
      });
      queryClient.invalidateQueries({
        queryKey: ['inventories detailed'],
      });
    },
    onError: handleError,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileInfo) {
      try {
        const base64Response = await convertExcelToBase64(fileInfo);

        mutationNewInventoriesWithUseExcel.mutate({
          formData: base64Response,
          id: plantId ? Number(plantId) : Number(warehouseId),
        });
      } catch (error) {
        toast.error(`Error converting file to Base64: ${error}`);
      }
    }
  };

  const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(null);
  };

  // useEffect(() => {
  //   if (fileInfo && typeof fileInfo === "object") {
  //     if (fileInfo?.uploadedFile) {
  //       setPreviewImage(fileInfo.uploadedFile);
  //     } else {
  //       const reader = new FileReader();
  //       reader.onloadend = () => setPreviewImage(reader.result as string);
  //       reader.readAsDataURL(fileInfo);
  //     }
  //   }
  // }, [fileInfo]);

  return (
    <form onSubmit={handleSubmit} className="global-modal">
      <ModalHeader
        isUpload
        label="ImportFromExcel"
        setShowModal={setShowModal}
      />

      <div className="inventory-form-content">
        <UploadFileInput
          accept={
            fileType === 'Csv'
              ? 'text/csv'
              : 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
          id="file"
          name="file"
          handler={(e: any) => {
            setFileInfo(e.target.files[0]);
          }}
          // isFile={true}
          acceptFileType={
            fileType === 'Csv'
              ? getTranslatedValue('FromCSV', 'AbpIdentity.texts')
              : getTranslatedValue('FromExcel', 'AbpIdentity.texts')
          }
        />

        {fileInfo && (
          <FilePreviewCard
            file={fileInfo}
            onRemove={() => {
              setFileInfo(null);
            }}
          />
        )}
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={mutationNewInventoriesWithUseExcel?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const InventoryImportModal = memo(MemoInventoryImportModal);
export default InventoryImportModal;
