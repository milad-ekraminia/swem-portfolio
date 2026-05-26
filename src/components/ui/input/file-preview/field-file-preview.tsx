import { Trash2 } from 'lucide-react';
import Image from '../../image/image';

const FiledFilePreviewCard = ({
  file,
  poster,
  onRemove,
  acceptedTypes,
}: {
  file: any;
  poster?: any;
  onRemove: () => void;
  acceptedTypes?: string;
}) => {
  const fileName = file?.fileName || '';
  const fileSizeKB = file?.fileSize
    ? Number((file?.fileSize / 1024).toFixed(0))
    : null;

  return (
    <div className="dv-file-preview-card">
      <div className="dv-file-preview-card__file-container">
        {file?.fileType !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
          file?.type !== 'text/csv' &&
          (acceptedTypes?.includes('image') ? (
            <Image
              src={`data:image/png;base64,${file.image}`}
              alt="Preview"
              className="dv-file-preview-card__file"
            />
          ) : (
            <video
              src={`data:image/png;base64,${file.image}`}
              poster={poster}
              controls
              className="dv-file-preview-card__file"
            />
          ))}

        <div className="dv-file-preview-card__file-info">
          {fileName && (
            <p className="dv-label-text">
              {fileName?.split('-file_org_name-')?.[1]
                ? fileName?.split('-file_org_name-')?.[1]
                : fileName}
            </p>
          )}
          {fileSizeKB && (
            <p className="dv-label-text">
              {fileSizeKB < 1024
                ? `${fileSizeKB} KB`
                : `${(fileSizeKB / 1024).toFixed(2)} MB`}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="dv-file-preview-card__remove-button"
      >
        <Trash2 />
      </button>
    </div>
  );
};

export default FiledFilePreviewCard;
