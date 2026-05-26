import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useCreateNewFilterProfile } from '@/hooks/useCreateNewFilterProfile';
import { useQueryClient } from '@tanstack/react-query';

const ReportNameModal = ({
  setShowModal,
  filterName,
  register,
  handleSubmit,
  setValue,
  isWeatherReport = false,
}: {
  setShowModal: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  filterName: string;
  isWeatherReport?: boolean;
}) => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreate, isPending: isCreatePending } =
    useCreateNewFilterProfile({
      invalidateQueries: () => {
        queryClient.invalidateQueries({ queryKey: ['profiles', filterName] });
      },
      resetAddState: (data) => {
        setShowModal(false);
        setValue('profileId', data?.id);
        setValue('profileName', '');
      },
    });

  const onSubmitCreate = (data: any) => {
    const modifiedData = {
      ...data,
      filterProfileFields: isWeatherReport
        ? data.filterProfileFields?.map((elem: any) => ({
          ...elem,
          fieldValue: String(elem?.fieldValue),
        }))
        : data.filterProfileFields
          .slice(0, -1) // Exclude the last element
          ?.map((elem: any) => ({
            ...elem,
            fieldValue: String(elem?.fieldValue),
          })),
    };
    mutateCreate(modifiedData);
  };

  return (
    <form
      className="global-modal"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmitCreate)();
      }}
    >
      <ModalHeader
        isSave
        label={getTranslatedValue('CreateNewProfile')}
        setShowModal={setShowModal}
      />

      <div className="report-name-form">
        <RegisterInput
          name={'profileName'}
          label={getTranslatedValue('ProfileName')}
          type={'text'}
          required={true}
          placeholder={getTranslatedValue('EnterProfileName')}
          // error={errors?.profileName?.message}
          register={register}
        />
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(false);
        }}
        isPending={isCreatePending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default ReportNameModal;
