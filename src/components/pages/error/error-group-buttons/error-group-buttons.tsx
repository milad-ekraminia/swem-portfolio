import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoCustomErrorButtons = ({
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
}: {
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
}) => {
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="dv-submit-or-cancel-buttons custom-error-buttons">
      {children}
      <Button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        variant="secondary"
      >
        <div className="custom-error-buttons__content-box">
          {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {getTranslatedValue('GoBack')}
        </div>
      </Button>
      <Button
        disabled={isSubmitDisabled || isPending}
        type="button"
        variant="primary"
        onClick={() => {
          navigate('/');
        }}
      >
        {isPending ? (
          <ComponentLoader variant="secondary" />
        ) : (
          confirmButtonText
        )}
      </Button>
    </div>
  );
};

const CustomErrorButtons = memo(MemoCustomErrorButtons);

export default CustomErrorButtons;
