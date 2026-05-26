import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from '../../image/image';

const FilePreviewCard = ({
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (file && typeof file === 'object') {
      if (file?.uploadedFile) {
        setPreviewImage(file.uploadedFile);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  }, [file]);

  const fileName = file?.name || '';
  const fileSizeKB = file?.size ? Number((file?.size / 1024).toFixed(0)) : null;

  return (
    <div className="dv-file-preview-card">
      {previewImage &&
        file?.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file?.type !== 'text/csv' &&
        (acceptedTypes?.includes('image') ? (
          <Image
            src={previewImage}
            alt="Preview"
            className="dv-file-preview-card__file"
          />
        ) : (
          <video
            src={previewImage}
            poster={poster}
            controls
            className="dv-file-preview-card__file"
          />
        ))}
      <div className="dv-file-preview-card__file-info">
        {fileName && (
          <p className="dv-label-text">
            <b>{getTranslatedValue('filename')}:</b>{' '}
            <span className="file-name">
              {' '}
              {fileName?.split('-file_org_name-')?.[1]
                ? fileName?.split('-file_org_name-')?.[1]
                : fileName}
            </span>
          </p>
        )}
        {fileSizeKB && (
          <p className="dv-label-text">
            <span>
              <b>{getTranslatedValue('Size')}:</b>{' '}
              {fileSizeKB < 1024
                ? `${fileSizeKB} KB`
                : `${(fileSizeKB / 1024).toFixed(2)} MB`}
            </span>
          </p>
        )}
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

export default FilePreviewCard;
