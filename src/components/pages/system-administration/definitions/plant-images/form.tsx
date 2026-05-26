import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import FilePreviewCard from '@/components/ui/input/file-preview/file-preview-card';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchUploadedFile,
  handleUpload,
} from '@/helpers/upload-file/upload-file-helper';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewPlantImage,
  updatePlantImage,
} from '@/services/system-administration/definitions/plant-images';
import {
  PlantImage,
  PlantImageFormData,
} from '@/types/pages/system-administration/definitions/plant-images';
import { plantImageFormValidation } from '@/validations/system-administration/definitions/plant-images';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultValues = {
  isBackground: true,
};

interface Props {
  onSuccess: () => void;
  plantImage?: PlantImage;
  organizations: any[];
}

const PlantImageForm = ({ onSuccess, plantImage, organizations }: Props) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<PlantImageFormData>({
    resolver: yupResolver(plantImageFormValidation as any),
    defaultValues,
  });

  const uri = useWatch({
    control,
    name: 'uri',
  });
  const isBackground = useWatch({
    control,
    name: 'isBackground',
  });

  // Set Plant image data thats being edited
  useEffect(() => {
    if (plantImage) {
      reset({
        name: plantImage?.name,
        uri: plantImage?.uri,
        organizationId: plantImage?.organizationId,
        isBackground: plantImage?.isBackground,
      });
    }
  }, [plantImage, reset]);

  // Fetch the image from uploads folder
  const { data } = useQuery({
    queryKey: ['fetch uploaded file with use name', uri, !!plantImage],
    queryFn: () => fetchUploadedFile(uri, 'plant-images'),
    enabled: !!uri && !!plantImage,
    retry: false,
  });
  // Set Fetched image to the file state
  useEffect(() => {
    if (data) {
      setFile({
        uploadedFile: `/uploads/plant-images/${data?.fileName}`,
        name: data?.fileName,
        size: data?.fileSize,
      } as any);
      setValue('uri', data?.fileName);
    }
  }, [data, setValue]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['plantImages'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };
  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updatePlantImage,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });
  const createMutation = useMutation({
    mutationFn: createNewPlantImage,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const isEditMode = !!plantImage;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  const getFileName = (file: File | null) => {
    if (!file) return '';
    return file.name.includes('-file_org_name-')
      ? file.name
      : `${Date.now()}-file_org_name-${file.name}`;
  };

  const uploadFileIfNeeded = (file: File | null, fileName: string) => {
    if (file && !file.name.includes('-file_org_name-')) {
      const renamedFile = new File([file], fileName, { type: file.type });
      handleUpload(renamedFile, 'plant-images');
      setFile(null);
    }
  };

  const onSubmit = (formData: PlantImageFormData) => {
    if (!file && !formData.uri?.length) return;

    const fileName = getFileName(file);

    if (plantImage) {
      uploadFileIfNeeded(file, fileName);
      editMutation.mutate({
        formData: {
          ...formData,
          uri: fileName,
        },
        id: plantImage.id as any,
      });
    } else {
      if (file) {
        uploadFileIfNeeded(file, fileName);
        createMutation.mutate({
          formData: {
            ...formData,
            uri: fileName,
          },
        });
      }
    }
  };
  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    onSuccess();
  };

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
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewPlantImage'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="name"
          label={getTranslatedValue('Name')}
          placeholder={getTranslatedValue('Name')}
          type="text"
          error={errors?.name?.message}
          register={register}
          required={true}
        />
        <Checkbox
          checked={isBackground}
          onChange={(value: any) => setValue('isBackground', value)}
          label={getTranslatedValue('IsBackground')}
          name="isBackground"
        />

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
            label={getTranslatedValue('ImageUpload')}
            name="action-image-upload"
            error={errors.uri?.message}
            handler={handleFileChangeEvent}
            accept="image/png, image/jpeg"
            acceptFileType={
              <div className="upload-text">
                <div className="upload-title">
                  <span className="upload-drag">
                    {getTranslatedValue('ClickUploadAction')}
                  </span>
                  <span>{getTranslatedValue('DragAndDropAction')}</span>
                </div>
                <span className="upload-desc">SVG, PNG, JPG (max: 4MB)</span>
              </div>
            }
          />
        )}
        <RegisterSelectInput
          name="organizationId"
          label={getTranslatedValue('Organization')}
          required
          options={formatSelectOptionsWithoutItems(organizations)}
          isLoading={false}
          register={register}
          placeholder={getTranslatedValue('Organization')}
          control={control}
          error={errors?.organizationId?.message}
        />
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default PlantImageForm;
