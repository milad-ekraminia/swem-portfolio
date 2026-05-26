import { memo } from 'react';
import { MailSvg } from '@/assets/icons/mail-svg';
import { Link } from 'react-router-dom';

const MemoLoginCopyright = () => {
  return (
    <div className="dv-login__content-section__copyright">
      <span>© Atolla 2025</span>
      <div className="dv-login__content-section__copyright__contact">
        <MailSvg stroke="#667085" />
        <Link to="mailto:help@atolla.com">help@atolla.com</Link>
      </div>
    </div>
  );
};

const LoginCopyright = memo(MemoLoginCopyright);

export default LoginCopyright;
