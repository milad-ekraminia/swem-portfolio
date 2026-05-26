import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserInfo } from '@/types/pages/system-administration/definitions/permissions';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  getAllRolesList,
  moveAllUsersIntoAnotherRole,
} from '@/services/system-administration/definitions/roles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  roleInfo: UserInfo;
  setShowModal: (value: any) => void;
}

const MemoMoveAllUsers = ({ roleInfo, setShowModal }: Props) => {
  const queryClient = useQueryClient();

  const roleResolver = yup.object().shape({
    selectedRoleId: yup.string(),
  });

  const { register, handleSubmit, control } = useForm<any>({
    resolver: yupResolver(roleResolver),
    defaultValues: {
      selectedRoleId: '',
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['Get All Roles List'],
    queryFn: () => getAllRolesList(),
    retry: false,
  });

  const handleSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ['Get Roles List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationMoveRole = useMutation({
    mutationFn: moveAllUsersIntoAnotherRole,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (data: any) => {
    mutationMoveRole.mutate({
      currentRoleId: roleInfo?.id,
      roleId: data.selectedRoleId,
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isUserMove
        label={getTranslatedValue('MoveAllUsers', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />

      <div className="move-all-modal">
        <RegisterSelectInput
          label={getTranslatedValue(
            'MoveAllUsersWithRoleTo',
            'AbpIdentity.texts',
          )
            ?.replace('{0}', roleInfo?.name)
            ?.replace('<b>', '')
            ?.replace('</b>', '')}
          options={data?.items?.map((item: any) => ({
            title: item.name,
            value: item.id,
          }))}
          control={control}
          register={register}
          name="selectedRoleId"
          isLoading={isLoading}
        />
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationMoveRole.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const MoveAllUsers = memo(MemoMoveAllUsers);

export default MoveAllUsers;
