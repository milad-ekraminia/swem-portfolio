import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  mimicElementGroupTypeOptions,
  mimicElementShowTypeOptions,
} from '@/enum-data/definitions/enum';
import { showTypeFieldsConfig } from '@/enum-data/system-administration/mimic-elements';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchMimicUploadedFile,
  handleMimicElementUpload,
} from '@/helpers/upload-file/upload-file-helper';
import { mimicElementFormValidation } from '@/validations/system-administration/definitions/mimic-elements';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AlertCircle } from 'lucide-react';
import { Control, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MimicElement,
  MimicElementFormData,
} from '@/types/pages/system-administration/definitions/mimic-elements';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewMimicElement,
  createNewMimicElementDetail,
  getMimicElementsDefinitions,
  updateMimicElement,
} from '@/services/system-administration/definitions/mimic-elements';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import FilePreviewCard from '@/components/ui/input/file-preview/file-preview-card';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import UploadFileInput from '@/components/ui/input/upload-file/upload-file-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { formInputs } from './form-inputs';
import RelatedElementsTable from './related-elements/element-table';

const DEFAULT_VALUES: Partial<MimicElementFormData> = {
  mimicElementShowType: 1,
  mimicElementGroup: 'common',
  fileSelectionType: 'single',
  uploadFolder: 'default',
  active: true,
};

interface Props {
  onClose: () => void;
  isOpen: boolean;
  mimicElement?: MimicElement;
}

const MimicElementsForm = ({ onClose, isOpen, mimicElement }: Props) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<MimicElementFormData>({
    resolver: yupResolver(mimicElementFormValidation) as any,
    defaultValues: DEFAULT_VALUES,
  });

  const { data: image } = useQuery({
    queryKey: [
      'fetchUploadedFile',
      mimicElement?.mimicElementFileName,
      mimicElement?.uploadFolder,
    ],
    queryFn: () =>
      fetchMimicUploadedFile(
        mimicElement?.mimicElementFileName as string,
        mimicElement?.uploadFolder as string,
      ),
    enabled: !!mimicElement,
    retry: false,
  });

  const { data: mimicElements } = useQuery({
    queryKey: ['mimicElementsLookup'],
    queryFn: getMimicElementsDefinitions,
    retry: false,
  });

  const watchedFields = useWatch({
    control,
    name: ['fileSelectionType', 'mimicElementShowType', 'active'],
  });
  const [fileSelectionType, mimicElementShowType, active] = watchedFields;

  const config = useMemo(
    () =>
      showTypeFieldsConfig[
        mimicElementShowType as keyof typeof showTypeFieldsConfig
      ],
    [mimicElementShowType],
  );
  const elements = useMemo(() => {
    return formatSelectOptionsWithoutItems(mimicElements);
  }, [mimicElements]);
  const [
    mimicElementBitZeroElementId,
    mimicElementDefaultElementId,
    mimicElementBitOneElementId,
    mimicElementBitOneZeroElementId,
    mimicElementBitZeroOneElementId,
  ] = useWatch({
    control,
    name: [
      'mimicElementBitZeroElementId',
      'mimicElementDefaultElementId',
      'mimicElementBitOneElementId',
      'mimicElementBitOneZeroElementId',
      'mimicElementBitZeroOneElementId',
    ],
  });
  const memoizedFormInputs = useMemo(
    () =>
      formInputs(
        control,
        register,
        errors,
        elements,
        !!mimicElement,
        setValue,
        {
          mimicElementBitZeroElementId,
          mimicElementDefaultElementId,
          mimicElementBitOneElementId,
          mimicElementBitOneZeroElementId,
          mimicElementBitZeroOneElementId,
        },
      ),
    [
      control,
      register,
      errors,
      mimicElements,
      elements,
      mimicElementBitZeroElementId,
      mimicElementDefaultElementId,
      mimicElementBitOneElementId,
      mimicElementBitOneZeroElementId,
      mimicElementBitZeroOneElementId,
      setValue,
    ],
  );

  const mutationNewMimicDetailElement = useMutation({
    mutationFn: createNewMimicElementDetail,
    onSuccess: ({ lastParams }) => {
      if (lastParams) {
        queryClient.invalidateQueries({ queryKey: ['mimicElements'] });
        toast.success(getTranslatedValue('SaveSuccess'));
        onClose();
        reset(DEFAULT_VALUES);
      }
    },
    onError: async (error: AxiosError) =>
      toastError((await apiErrorHandler(error))?.error),
  });

  const mutationNewMimicElement = useMutation({
    mutationFn: createNewMimicElement,
    onSuccess: handleSuccess,
    onError: async (error: AxiosError) =>
      toastError((await apiErrorHandler(error))?.error),
  });

  const updateMimicElementMutation = useMutation({
    mutationFn: updateMimicElement,
    onSuccess: handleSuccess,
    onError: async (error: AxiosError) =>
      toastError((await apiErrorHandler(error))?.error),
  });

  useEffect(() => {
    if (mimicElement) {
      reset({ ...mimicElement, fileSelectionType: 'single' });
    }
  }, [mimicElement, reset]);

  useEffect(() => {
    if (image && mimicElement) {
      setFile({
        uploadedFile: `/uploads/${mimicElement.uploadFolder}/${image.fileName}`,
        name: image.fileName,
        size: image.fileSize,
      } as unknown as File);
    }
  }, [image, mimicElement]);

  useEffect(() => {
    setFile(null);
    setValue('mimicElementDetails', []);
  }, [mimicElementShowType, setValue]);

  useEffect(() => {
    if (fileSelectionType === 'multiple') {
      setValue('mimicElementName', '');
    }
  }, [fileSelectionType, setValue]);

  const handleFileChangeEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target?.files?.[0];
      if (newFile && newFile !== file) {
        setFile(newFile);
        setValue('mimicElementFileName', 's');
      }
    },
    [file, setValue],
  );

  async function handleSuccess(result: any) {
    const details = result?.submittedFormData?.mimicElementDetails;
    if (details?.length) {
      details.forEach((element: any, index: number) => {
        mutationNewMimicDetailElement.mutate({
          formData: {
            ...element,
            mimicElementId: String(result?.response?.id),
          },
          lastParams: index === details.length - 1,
        });
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['mimicElements'] });
      toast.success(getTranslatedValue('SaveSuccess'));
      onClose();
      reset(DEFAULT_VALUES);
    }
  }

  const onSubmit = async (formData: MimicElementFormData) => {
    const formDataBody = { formData };
    let newFileName = '';

    if (file) {
      const mimicDefaultElement =
        mimicElements?.find(
          (item: any) => item.id === formData.mimicElementDefaultElementId,
        )?.displayName ?? '';
      newFileName = `${Date.now()}-file_org_name-${file?.name ?? mimicDefaultElement}`;

      if (formData.fileSelectionType === 'single') {
        formDataBody.formData = {
          ...formData,
          mimicElementFileName: newFileName,
        };
      }

      const renamedFile = new File([file], newFileName, { type: file?.type });
      await handleMimicElementUpload(renamedFile, formData.uploadFolder);
    }

    if (mimicElement) {
      updateMimicElementMutation.mutate({
        formData: formDataBody.formData,
        mimicElementId: mimicElement.id,
      });
    } else {
      mutationNewMimicElement.mutate(formDataBody);
    }
  };

  return (
    <Modal
      modalSize={[3, 24].includes(mimicElementShowType) ? 'lg' : 'md'}
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="global-modal mimic-element-form"
      >
        <ModalHeader
          isEdit={!!mimicElement}
          label={mimicElement ? 'Edit' : 'NewMimicElement'}
          setShowModal={onClose}
        />

        <div className="notification-form-content">
          {/* General Info */}
          <div className="mimic-element-form__form-group">
            <div className="mimic-element-form__form-group-header">
              {getTranslatedValue('GeneralInfo')}
            </div>
            <div className="mimic-element-form__form-group-content">
              <RegisterSelectInput
                disabled={!!mimicElement}
                name="mimicElementShowType"
                label={getTranslatedValue('MimicElementShowType')}
                options={mimicElementShowTypeOptions}
                register={register}
                placeholder={getTranslatedValue('MimicElementShowType')}
                control={control}
                error={errors?.mimicElementShowType?.message}
              />

              <div className="row">
                {fileSelectionType === 'single' &&
                  memoizedFormInputs.mimicElementName}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-md)',
                  }}
                >
                  <RegisterSelectInput
                    name="mimicElementGroup"
                    label={getTranslatedValue('MimicElementGroup')}
                    disabled={!!mimicElement}
                    options={mimicElementGroupTypeOptions}
                    register={register}
                    placeholder={getTranslatedValue('MimicElementGroup')}
                    control={control}
                    error={errors?.mimicElementGroup?.message}
                  />
                  <Checkbox
                    checked={active}
                    label={getTranslatedValue('PalletDisplayStatus')}
                    onChange={(state) => setValue('active', state)}
                  />
                </div>
              </div>

              {/* Single-line inputs */}
              {config.inputs
                ?.filter(
                  (field) => !(config.inRow || []).flat().includes(field),
                )
                .map((field) => (
                  <div key={field}>{memoizedFormInputs[field]}</div>
                ))}

              {/* Row groups */}
              {config.inRow?.map((row, idx) => (
                <div className="row" key={idx}>
                  {row.map(
                    (field) =>
                      memoizedFormInputs[
                        field as keyof typeof memoizedFormInputs
                      ],
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          {config.showUpload && (
            <div className="mimic-element-form__form-group">
              <div className="mimic-element-form__form-group-header">
                {getTranslatedValue('UploadElement')}
              </div>
              <div className="mimic-element-form__form-group-content">
                <RegisterInput
                  name="uploadFolder"
                  label={getTranslatedValue('UploadFolder')}
                  placeholder={getTranslatedValue('Enter folder name')}
                  type="text"
                  error={errors?.uploadFolder?.message}
                  register={register}
                  required={true}
                />
                {file ? (
                  <FilePreviewCard
                    file={file}
                    onRemove={() => {
                      setValue('mimicElementFileName', '');
                      setFile(null);
                    }}
                    acceptedTypes="image"
                  />
                ) : (
                  <div className="mimic-element-form__upload-area">
                    <UploadFileInput
                      isRequired={true}
                      handler={handleFileChangeEvent}
                      id="action-image-upload"
                      name="action-image-upload"
                      error={errors.mimicElementFileName?.message}
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      acceptFileType={
                        <div className="upload-text">
                          <div className="upload-title">
                            <span className="upload-drag">
                              {getTranslatedValue('Click to upload')}
                            </span>
                            <span>or drag and drop</span>
                          </div>
                          <span className="upload-desc">
                            Webp, PNG, JPG, SVG
                          </span>
                        </div>
                      }
                    />
                    <div className="mimic-element-form__upload-area-warning">
                      <AlertCircle stroke="#F79009" />
                      <span>
                        {getTranslatedValue('photo_upload_warning_note')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Elements Table */}
          {config.showRelatedTable && (
            <RelatedElementsTable
              elementId={mimicElement?.id}
              mimicElementLookup={mimicElements}
              control={control as Control<any>}
            />
          )}
        </div>

        <SubmitOrCancelButtons
          handleCancelForm={() => {
            reset(DEFAULT_VALUES);
            onClose();
          }}
          isPending={
            mimicElement
              ? updateMimicElementMutation.isPending
              : mutationNewMimicElement.isPending
          }
          confirmButtonText={getTranslatedValue('Save')}
        />
      </form>
    </Modal>
  );
};

export default MimicElementsForm;
