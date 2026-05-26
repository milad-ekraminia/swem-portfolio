import { memo } from 'react';
import { getCookie } from '@/helpers/cookies';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MemoCommonHeader = ({
  label,
  haveBack,
}: {
  label: string;
  haveBack?: any;
}) => {
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';
  
  return (
    <div className="global-modal__header">
      <div>
        {haveBack && (
          <button type="button" onClick={() => navigate(-1)}>
            {isRTL ? <ArrowRight /> : <ArrowLeft />}
          </button>
        )}

        <div className="global-modal__header-title">{label}</div>
      </div>
    </div>
  );
};

const CommonHeader = memo(MemoCommonHeader);

export default CommonHeader;
