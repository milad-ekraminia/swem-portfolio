import { memo } from 'react';
import { getCookie } from '@/helpers/cookies';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MemoWareHouseEditHeader = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="global-modal__header">
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          {isRTL ? <ArrowRight /> : <ArrowLeft />}
        </button>

        <div className="global-modal__header-title">{`"${label}" Düzenle`}</div>
      </div>
    </div>
  );
};

const WareHouseEditHeader = memo(MemoWareHouseEditHeader);

export default WareHouseEditHeader;
