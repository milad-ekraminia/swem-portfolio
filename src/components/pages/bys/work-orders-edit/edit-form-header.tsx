import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MemoWorkOrderEditHeader = () => {
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="global-modal__header">
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          {isRTL ? <ArrowRight /> : <ArrowLeft />}
        </button>

        <div className="global-modal__header-title">
          {getTranslatedValue('Update')}
        </div>
      </div>
    </div>
  );
};

const WorkOrderEditHeader = memo(MemoWorkOrderEditHeader);

export default WorkOrderEditHeader;
