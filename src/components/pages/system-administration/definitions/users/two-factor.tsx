import { memo, useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { handleError } from '@/helpers/handle-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserInfo } from '@/types/pages/system-administration/definitions/permissions';
import { setTwoFactorApi } from '@/services/system-administration/definitions/users';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  userInfo: UserInfo;
  setShowModal: (value: any) => void;
  users?: UserInfo[];
}

const MemoTwoFactor = ({ userInfo, setShowModal }: Props) => {
  const queryClient = useQueryClient();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    userInfo?.twoFactorEnabled ?? false,
  );

  const mutationSetUserPassword = useMutation({
    mutationFn: setTwoFactorApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Get Users List'],
      });
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
    },
    onError: (e: Error) => handleError(e),
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationSetUserPassword.mutate({
      userId: userInfo?.id,
      status: twoFactorEnabled ?? false,
    });
  };

  return (
    <form className="global-modal" onSubmit={submitHandler}>
      <ModalHeader
        isKey
        label={`${getTranslatedValue('TwoFactor', 'AbpIdentity.texts')} - ${userInfo?.userName}`}
        setShowModal={setShowModal}
      />

      <div className="two-factor-modal">
        <Checkbox
          checked={twoFactorEnabled}
          onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          label={getTranslatedValue(
            'DisplayName:TwoFactorEnabled',
            'AbpIdentity.texts',
          )}
        />
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationSetUserPassword.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const TwoFactor = memo(MemoTwoFactor);

export default TwoFactor;
