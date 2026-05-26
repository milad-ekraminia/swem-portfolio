import Image from '@/components/ui/image/image';
import { memo } from 'react';

const MemoErrorPageImagee = () => {
  return (
    <div className="dv-error__image-section">
      <Image
        src="/images/content.webp"
        alt="Atolla"
        className="dv-error__image-section__image"
      />
    </div>
  );
};

const ErrorPageImage = memo(MemoErrorPageImagee);

export default ErrorPageImage;
