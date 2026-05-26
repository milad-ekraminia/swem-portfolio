import Image from '@/components/ui/image/image';
import { memo } from 'react';

const MemoLoginImageSection = () => {
  return (
    <div className="dv-login__image-section">
      <Image
        src="/images/content.webp"
        alt="Atolla"
        className="dv-login__image-section__image"
      />

      <Image
        src="/images/logo-with-text.webp"
        alt="Atolla logo"
        className="dv-login__image-section__image-logo"
      />
    </div>
  );
};

const LoginImageSection = memo(MemoLoginImageSection);

export default LoginImageSection;
