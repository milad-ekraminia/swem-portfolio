import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
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
  createNewPlantVideo,
  updatePlantVideo,
} from '@/services/system-administration/definitions/plant-videos';
import {
  PlantVideo,
  PlantVideoFormData,
} from '@/types/pages/system-administration/definitions/plant-videos';
import { plantVideoFormValidation } from '@/validations/system-administration/definitions/plant-videos';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  onSuccess: () => void;
  plantVideo?: PlantVideo;
  organizations: any[];
}

// Helper functions
const getFileName = (file: File | null) =>
  file
    ? file.name.includes('-file_org_name-')
      ? file.name
      : `${Date.now()}-file_org_name-${file.name}`
    : '';

const uploadFileIfNeeded = async (file: File | null, fileName: string) => {
  if (file && !file.name.includes('-file_org_name-')) {
    const renamedFile = new File([file], fileName, { type: file.type });
    await handleUpload(renamedFile, 'plant-videos');
  }
};

const PlantVideoForm = ({ onSuccess, plantVideo, organizations }: Props) => {
  const queryClient = useQueryClient();
  const [poster, setPoster] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<PlantVideoFormData>({
    resolver: yupResolver(plantVideoFormValidation as any),
  });

  const uri = useWatch({ control, name: 'uri' });
  const posters = useWatch({ control, name: 'poster' });

  // Set Plant video data that's being edited
  useEffect(() => {
    if (plantVideo) {
      reset({
        name: plantVideo.name,
        uri: plantVideo.uri,
        organizationId: plantVideo.organizationId,
        poster: plantVideo.poster,
      });
    }
  }, [plantVideo, reset]);

  // Fetch the video and poster from uploads folder
  const { data: videoData } = useQuery({
    queryKey: ['fetch uploaded video', uri, !!plantVideo],
    queryFn: () => fetchUploadedFile(uri, 'plant-videos'),
    enabled: !!uri && !!plantVideo,
    retry: false,
  });

  const { data: posterData } = useQuery({
    queryKey: ['fetch uploaded poster', posters, !!plantVideo],
    queryFn: () => fetchUploadedFile(posters, 'plant-videos'),
    enabled: !!posters && !!plantVideo,
    retry: false,
  });

  useEffect(() => {
    if (videoData) {
      setFile({
        uploadedFile: `/uploads/plant-videos/${videoData.fileName}`,
        name: videoData.fileName,
        size: videoData.fileSize,
      } as unknown as File);
      setValue('uri', videoData.fileName);
    }
  }, [videoData, setValue]);

  useEffect(() => {
    if (posterData) {
      setPoster({
        uploadedFile: `/uploads/plant-videos/${posterData.fileName}`,
        name: posterData.fileName,
        size: posterData.fileSize,
      } as unknown as File);
      setValue('poster', posterData.fileName);
    }
  }, [posterData, setValue]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    await queryClient.invalidateQueries({ queryKey: ['plantVideos'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updatePlantVideo,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewPlantVideo,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const isEditMode = Boolean(plantVideo);
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  const onSubmit = async (formData: PlantVideoFormData) => {
    const fileName = getFileName(file);
    const posterFileName = getFileName(poster);

    if (isEditMode) {
      await uploadFileIfNeeded(file, fileName);
      await uploadFileIfNeeded(poster, posterFileName);
      editMutation.mutate({
        formData: {
          ...formData,
          uri: fileName,
          poster: posterFileName,
        },
        id: plantVideo!.id,
      });
    } else {
      if (file && poster) {
        await uploadFileIfNeeded(file, fileName);
        await uploadFileIfNeeded(poster, posterFileName);
        createMutation.mutate({
          formData: {
            ...formData,
            uri: fileName,
            poster: posterFileName,
          },
        });
      }
    }
  };

  const handleCancelForm = (e: FormEvent) => {
    e.preventDefault();
    reset();
    onSuccess();
  };

  const handleChangeVideoEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setValue('uri', ' ');
    }
  };

  const handleChangePosterEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPoster(e.target.files[0]);
      setValue('poster', ' ');
    }
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewPlantVideo'}
        setShowModal={onSuccess}
      />
      <div className="notification-form-content">
        <RegisterInput
          name="name"
          label={getTranslatedValue('Name')}
          placeholder={getTranslatedValue('Name')}
          type="text"
          error={errors?.name?.message}
          register={register}
          required
        />
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
        {file ? (
          <FilePreviewCard
            file={file}
            onRemove={() => {
              setFile(null);
              setValue('uri', '');
            }}
            acceptedTypes="video"
          />
        ) : (
          <UploadFileInput
            isRequired
            error={errors.uri?.message}
            id="action-video-upload"
            label={getTranslatedValue('UploadVideo')}
            name="action-video-upload"
            accept="video/webp, video/mp4"
            handler={handleChangeVideoEvent}
            acceptFileType={
              <div className="upload-text">
                <div className="upload-title">
                  <span className="upload-drag">
                    {getTranslatedValue('Click to upload')}
                  </span>
                  <span>or drag and drop</span>
                </div>
                <span className="upload-desc">MP4, Webm</span>
              </div>
            }
          />
        )}
        {poster ? (
          <FilePreviewCard
            file={poster}
            onRemove={() => {
              setPoster(null);
              setValue('poster', '');
            }}
            acceptedTypes="image"
          />
        ) : (
          <UploadFileInput
            isRequired
            id="action-poster-upload"
            label={getTranslatedValue('UploadPoster')}
            accept="image/png, image/jpeg, image/webp"
            name="action-poster-upload"
            handler={handleChangePosterEvent}
            error={errors.poster?.message}
            acceptFileType={
              <div className="upload-text">
                <div className="upload-title">
                  <span className="upload-drag">
                    {getTranslatedValue('Click to upload')}
                  </span>
                  <span>or drag and drop</span>
                </div>
                <span className="upload-desc">Webp, PNG, JPG</span>
              </div>
            }
          />
        )}
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default PlantVideoForm;
