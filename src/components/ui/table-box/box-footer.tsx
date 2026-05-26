import { useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ArrowLeft, ArrowRight, PenIcon, Trash2Icon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SureDeleteModal from '../action/sure-delete-modal';
import Modal from '../modal-wrapper/modal-wrapper';

function BoxFooter({
  id,
  isDiscard,
  haveDeletePermission,
  haveEditPermmission,
  havePermissionSetup,
  haveInventoriesPermission,
}: Readonly<{
  id: any;
  isDiscard?: boolean;
  haveDeletePermission?: boolean;
  haveEditPermmission?: boolean;
  havePermissionSetup?: boolean;
  haveInventoriesPermission?: boolean;
}>) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const canDelete =
    !havePermissionSetup || (havePermissionSetup && haveDeletePermission);
  const canEdit =
    !havePermissionSetup || (havePermissionSetup && haveEditPermmission);

  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="box-footer">
      <div className="box-footer-actions">
        {!isDiscard && canDelete && (
          <button onClick={() => setShowModal(true)}>
            <Trash2Icon size={20} stroke="#D92D20" />
          </button>
        )}
        {canEdit && (
          <Link
            to={`/inventory-management/warehouses/edit/${id}`}
            type="button"
            className="dv-alt-organization-link"
          >
            <PenIcon size={20} stroke="#175CD3" />
          </Link>
        )}
      </div>
      <div>
        {' '}
        {haveInventoriesPermission && havePermissionSetup && (
          <Link
            to={`/inventory-management/warehouses/${id}/inventories`}
            type="button"
            className="dv-alt-organization-link"
          >
            <span>{getTranslatedValue('Inventories')}</span>
            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </Link>
        )}
      </div>

      {showModal && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <SureDeleteModal
            queryKey={'warehouses list'}
            deleteItemUrl={`app/warehouses/${id}?api-version=${
              import.meta.env.VITE_API_VERSION
            }`}
            setShowModal={(value: any) => {
              setShowModal(value);
              navigate('/inventory-management/warehouses');
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default BoxFooter;
