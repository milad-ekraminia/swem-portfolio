import { Upload } from 'lucide-react';

interface UploadFileInputProps {
  id: string;
  name: string;
  handler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultipleFiles?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  accept?: string;
  acceptFileType?: React.ReactNode;
  error?: string;
  label?: string;
  isRequired?: boolean;
}

const UploadFileInput = ({
  id,
  multiple = false,
  handleMultipleFiles,
  handler,
  name,
  accept,
  acceptFileType,
  error,
  label,
  isRequired,
}: UploadFileInputProps) => {
  return (
    <div className="dv-upload-file-input">
      {label && (
        <label className="dv-label-text" htmlFor={name}>
          {label}
          {isRequired && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}

      <label
        htmlFor={id}
        className={`dv-upload-file-input__label ${error ? 'dv-upload-file-input__label-error' : ''}`}
      >
        <div className="dv-upload-file-input__label__box">
          <div className="dv-upload-file-input__label__box-content">
            <Upload size={20} stroke={'#344154'} />
          </div>
          <span className="dv-label-text">{acceptFileType}</span>
        </div>

        <input
          name={name}
          multiple={multiple}
          id={id}
          type="file"
          accept={accept}
          onChange={multiple ? handleMultipleFiles : handler}
          className="hidden"
        />
      </label>
      {error && <p className="select-input__error">{error}</p>}
    </div>
  );
};

export default UploadFileInput;
