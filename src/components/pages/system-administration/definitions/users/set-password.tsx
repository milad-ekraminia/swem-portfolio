import { memo, useState } from 'react';
import { generatePassword } from '@/helpers/generate-password';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { handleError } from '@/helpers/handle-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Shuffle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserInfo } from '@/types/pages/system-administration/definitions/permissions';
import { setUserPasswordApi } from '@/services/system-administration/definitions/users';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  userInfo: UserInfo;
  setShowModal: (value: any) => void;
  users?: UserInfo[];
}

const MemoSetPassword = ({ userInfo, setShowModal }: Props) => {
  const queryClient = useQueryClient();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const { register } = useForm<any>({
    defaultValues: {
      password: '',
    },
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(8, {
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
    setPassword(newPassword);
  };

  const mutationSetUserPassword = useMutation({
    mutationFn: setUserPasswordApi,
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
      password,
    });
  };

  return (
    <form className="global-modal" onSubmit={submitHandler}>
      <ModalHeader
        isKey
        label={getTranslatedValue('SetPassword', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />

      <div className="password-modal">
        <RegisterInput
          label={getTranslatedValue(
            'DisplayName:NewPassword',
            'AbpIdentity.texts',
          )}
          name="password"
          register={register}
          type={showPassword ? 'text' : 'password'}
          value={password}
          checkShowPasswordHandler={() => setShowPassword(!showPassword)}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="password-modal__shuffle" onClick={handleGenerate}>
          <Shuffle stroke="#98A2B3" size={18} />
        </div>
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationSetUserPassword.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const SetPassword = memo(MemoSetPassword);

export default SetPassword;
