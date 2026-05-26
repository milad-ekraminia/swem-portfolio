import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import FilePreviewCard from '../input/file-preview/file-preview-card';

const MemoImportExcelModalContent = ({
  fileInfo,
  setFileInfo,
  fileType,
}: {
  fileInfo: any;
  setFileInfo: any;
  fileType?: 'Excel' | 'Csv';
}) => {
  return (
    <div className="dv-import-excel-modal-content">
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
        label="Yeni Dosya Ekle"
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
  );
};

const ImportExcelModalContent = memo(MemoImportExcelModalContent);

export default ImportExcelModalContent;
