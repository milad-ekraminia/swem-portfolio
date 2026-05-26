import { useEffect } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { filterProfileValidation } from '@/validations/organization-trace/device-trend-analysis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ProfileFormData } from '@/types/pages/organization-trace';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  onClose: () => void;
  selectedChartTypes: any[];
  selectedDevices: any[];
  plantId: number;
}
export default function ProfileCreationForm({
  onClose,
  plantId,
  selectedChartTypes,
  selectedDevices,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(filterProfileValidation) as any,
  });
  const onSubmit = (data: ProfileFormData) => {
    //   TODO -> Create a Mutation for this action and add the api logic
    console.log(data);
  };
  useEffect(() => {
    reset({
      selectedChartTypes,
      selectedDevices,
      plantId,
    });
  }, [selectedChartTypes, selectedDevices, plantId]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="global-modal">
      <ModalHeader
        isSave={true}
        label={getTranslatedValue('Profili kaydedin')}
        setShowModal={onClose}
      />
      <div className="derived-values-form-content">
        <RegisterInput
          name="name"
          label={getTranslatedValue('ProfileName')}
          placeholder={getTranslatedValue('ProfileName')}
          type="text"
          error={errors?.name?.message}
          register={register}
          required
        />
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
          reset();
        }}
        isPending={false}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
}
