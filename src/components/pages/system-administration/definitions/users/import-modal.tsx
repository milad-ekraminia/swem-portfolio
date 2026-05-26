import { PaperDownloadSvg } from '@/assets/icons/paper-download-svg';
import { Button } from '@/components/ui/button/button';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import FilePreviewCard from '@/components/ui/input/file-preview/file-preview-card';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { importUsersFile } from '@/services/system-administration/definitions/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  fileType?: 'Excel' | 'Csv';
  setShowModal: (value: any) => void;
}

const MemoUserImportModal = ({ fileType, setShowModal }: Props) => {
  const queryClient = useQueryClient();
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [errorsMessage, setErrorsMessage] = useState<any>(null);

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUploadExcel = useMutation({
    mutationFn: importUsersFile,
    onSuccess: (data) => {
      if (data?.failedCount > 0) {
        setErrorsMessage(
          getTranslatedValue('SuccessfulUserImportCount')
            .replace('{0}', String(data?.successCount ?? 0))
            .replace('{1}', String(data?.failedCount ?? 0))
        );
      } else {
        toast.success(getTranslatedValue('SaveSuccess'));
        setShowModal(false);
        queryClient.invalidateQueries({
          queryKey: ['Get Users List'],
        });
      }
    },
    onError: handleError,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileInfo) {
      try {
        mutationUploadExcel.mutate({
          File: fileInfo,
          fileType: 'Excel',
        });
      } catch (error) {
        toast.error(`Error converting file to Base64: ${error}`);
      }
    }
  };

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const handleDownloadTemplate = () => {
    downloadHandler({
      excelUrl: 'identity/users/import-users-sample-file',
      fileName: getTranslatedValue("Users", "AbpIdentity.texts"),
      searchInputValue: "",
      getTokenUrl: 'identity/users/download-token',
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit}>
      <ModalHeader
        isUpload
        label={getTranslatedValue('Import', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />

      <div className="import-modal">
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

        <Button
          variant="secondary-blue"
          disabled={isExcelDownloading}
          onClick={handleDownloadTemplate}
          leftIcon={!isExcelDownloading && <PaperDownloadSvg width="20" stroke="var(--brand-600)" />}
          style={{ whiteSpace: 'nowrap' }}
        >
          {
            isExcelDownloading ?
              <ComponentLoader variant="secondary" /> :
              getTranslatedValue('ExportTemplate')}
        </Button>

        {
          errorsMessage && (
            <div className="error-message">{errorsMessage}</div>
          )
        }
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationUploadExcel.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UserImportModal = memo(MemoUserImportModal);

export default UserImportModal;
