import Image from '@/components/ui/image/image';
import { memo } from 'react';
import LoginCopyright from './copyright';
import LoginForm from './form';

const MemoLoginContentSection = () => {
  return (
    <div className="dv-login__content-section">
      <div className="dv-login__content-section__content">
        <Image
          src="/images/logo.webp"
          className="dv-login__content-section__content__image-logo"
          alt="Atolla logo"
        />
        <LoginForm />
      </div>
      <LoginCopyright />
    </div>
  );
};

const LoginContentSection = memo(MemoLoginContentSection);

export default LoginContentSection;
