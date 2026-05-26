import { Button } from '@/components/ui/button/button';
import CommonContainerWithHeader from '@/components/ui/common-container-with-header/common-container-with-header';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import FilePreviewCard from '@/components/ui/input/file-preview/file-preview-card';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import { useState } from 'react';
import { getTranslatedValue } from '../../../../helpers/get-translated-value';

interface FormContainerProps {
  register: any;
  handleSubmit: any;
  errors: any;
  control: any;
  setValue: any;
  onSubmit: any;
  isPending?: boolean;
}

function FirmConfigurationFormContainerReporting({
  handleSubmit,
  setValue,
  onSubmit,
  isPending = false,
}: FormContainerProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length) {
      setFile(e.target.files[0]);
      setValue('uri', 's');
    }
  };

  const handleClearImage = () => {
    setFile(null);
    setValue('uri', null as any);
  };
  return (
    <CommonContainerWithHeader label={getTranslatedValue('report_logo_upload')}>
      <form className="inner-form upload-box" onSubmit={handleSubmit(onSubmit)}>
        {file ? (
          <FilePreviewCard
            file={file}
            onRemove={handleClearImage}
            acceptedTypes="image"
          />
        ) : (
          <UploadFileInput
            isRequired={true}
            id="action-image-upload"
            name="action-image-upload"
            // error={errors.uri?.message}
            handler={handleFileChangeEvent}
            accept="image/png, image/jpeg"
            acceptFileType={
              <div className="upload-text">
                <div className="upload-title">
                  <span className="upload-drag">
                    {getTranslatedValue('Click to upload')}
                  </span>
                  <span>or drag and drop</span>
                </div>
                <span className="upload-desc">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </span>
              </div>
            }
          />
        )}

        <Button
          className="tab-submit-button"
          type="submit"
          variant="primary"
          disabled={isPending}
        >
          {isPending ? (
            <ComponentLoader variant="secondary" />
          ) : (
            getTranslatedValue('Save')
          )}
        </Button>
      </form>
    </CommonContainerWithHeader>
  );
}

export default FirmConfigurationFormContainerReporting;
