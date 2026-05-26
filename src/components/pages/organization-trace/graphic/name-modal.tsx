import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useCreateNewFilterProfileTrendAnalyse } from '@/hooks/useCreateNewFilterProfileTrenAnalysis';
import { useQueryClient } from '@tanstack/react-query';

const GraphicNameModal = ({
  setShowModal,
  filterName,
  register,
  handleSubmit,
  setValue,
  isWeatherReport,
}: {
  setShowModal: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  filterName: string;
  isWeatherReport: boolean;
}) => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreate, isPending: isCreatePending } =
    useCreateNewFilterProfileTrendAnalyse({
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
    const updatedData = {
      profileName: modifiedData?.profileName,
      startDateTime: modifiedData?.StartDateTime,
      endDateTime: modifiedData?.EndDateTime,
      Period: modifiedData?.Period,
      filterProfileFields: modifiedData?.filterProfileFields,
      measurementDataFields: modifiedData?.measurementDataFields,
      consInformationFields: modifiedData?.consInformationFields,
      deviceArchiveFields: modifiedData?.deviceArchiveFields,
      weatherInfoFields: modifiedData?.deviceArchiveFields,
    };

    mutateCreate(updatedData);
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
        label={getTranslatedValue('ProfileName')}
        setShowModal={setShowModal}
      />

      <div className="report-name-form">
        <RegisterInput
          name={'profileName'}
          label={getTranslatedValue('ProfileName')}
          type={'text'}
          required={true}
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

export default GraphicNameModal;
