import { Button } from '@/components/ui/button/button';
import { deleteCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { LogOut } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MemoLogoutModal = ({
  setShowLogout,
}: {
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('auth_token');
    toast.success(getTranslatedValue('LogoutSuccessfully', 'AbpUi.texts'));
    deleteCookie('auth_token');

    navigate('/login');
  };

  return (
    <div className="dv-logout-modal">
      <div className="dv-logout-modal__header">
        <div className="dv-logout-modal__header-icon">
          <LogOut color="#F04438" size="20" />
        </div>
        <h2 className="dv-logout-modal__header-title">
          {getTranslatedValue('exit')}
        </h2>
      </div>

      <div className="dv-logout-modal__body">
        <p className="dv-logout-modal__body-text">
          {getTranslatedValue('SignOutConfirmationMessage')}
        </p>

        <div className="dv-logout-modal__body-buttons">
          <Button onClick={() => setShowLogout(false)} variant="secondary">
            {getTranslatedValue('No')}
          </Button>
          <Button onClick={logoutHandler} variant="danger">
            {getTranslatedValue('Yes')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const LogoutModal = memo(MemoLogoutModal);

export default LogoutModal;
