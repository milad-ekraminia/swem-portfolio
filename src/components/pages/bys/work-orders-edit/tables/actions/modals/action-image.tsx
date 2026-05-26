import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFileUploader } from '@/hooks/useFileUploader';
import FiledFilePreviewCard from '@/components/ui/input/file-preview/field-file-preview';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';

const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const MemoActionImages = ({ control }: { control: any }) => {
  const { fields, append, remove } = useFieldArray<{
    inventoryImages: {
      image: string;
      workOrderId: number;
      fileName: string;
      fileType: string;
      fileSize: number;
    }[];
  }>({
    control,
    name: 'inventoryImages',
  });

  const params = useParams();

  const workOrderId = params?.workOrderId ? parseInt(params.workOrderId) : 0;

  const uploadCallback = (fileData: any) => {
    append({
      image: fileData.base64,
      workOrderId,
      fileName: fileData.fileName,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
    });
  };

  const { handleFileUpload } = useFileUploader(uploadCallback, ALLOWED_TYPES);

  return (
    <>
      <UploadFileInput
        id="action-image-upload"
        name="action-image-upload"
        handler={handleFileUpload}
        acceptFileType={
          <div className="upload-text">
            <span className="upload-drag">
              {getTranslatedValue('Click to upload')}
            </span>
            <br />
            <span className="upload-desc">
              SVG, PNG, JPG or GIF (max size : 4MB)
            </span>
          </div>
        }
      />

      <div className="images">
        {fields?.length > 0 &&
          fields.map((field, index) => {
            return (
              <FiledFilePreviewCard
                key={field.id}
                file={field}
                onRemove={() => remove(index)}
                acceptedTypes={ALLOWED_TYPES.join(', ')}
              />
            );
          })}
      </div>
    </>
  );
};

const ActionImages = memo(MemoActionImages);
export default ActionImages;
