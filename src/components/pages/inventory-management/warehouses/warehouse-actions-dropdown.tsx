import { useEffect, useRef, useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';

const ActionsDropdown = ({
  id,
  havePermissionSetup,
  editPermission,
  deletePermission,
  haveInventoriesPermission,
}: {
  id: any;
  havePermissionSetup?: boolean;
  deletePermission?: boolean;
  editPermission?: boolean;
  haveInventoriesPermission?: boolean;
}) => {
  const canEdit =
    !havePermissionSetup || (havePermissionSetup && editPermission);
  const canDelete =
    !havePermissionSetup || (havePermissionSetup && deletePermission);

  const isRTL = getCookie('CultureName') === 'fa';
  const [showModal, setShowModal] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Initial click position
    const clickX = e.clientX;
    const clickY = e.clientY;

    setDropdownPos({ x: clickX, y: clickY });
  };

  const closeDropdown = () => setDropdownPos(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (dropdownPos) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownPos]);

  useEffect(() => {
    if (dropdownPos && dropdownRef.current) {
      const { innerWidth, innerHeight } = window;
      const dropdownEl = dropdownRef.current;
      const rect = dropdownEl.getBoundingClientRect();

      let newX = dropdownPos.x;
      let newY = dropdownPos.y;

      // Adjust horizontally if overflowing
      if (rect.width + dropdownPos.x > innerWidth) {
        newX = innerWidth - rect.width - 10; // add margin
      }

      // Adjust vertically if overflowing
      if (rect.height + dropdownPos.y > innerHeight) {
        newY = innerHeight - rect.height - 10; // add margin
      }

      if (newX !== dropdownPos.x || newY !== dropdownPos.y) {
        setDropdownPos({ x: newX, y: newY });
      }
    }
  }, [dropdownPos]);

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="dv-alt-organization-link actions-link-column"
      >
        <span>{getTranslatedValue('Actions')}</span>
        {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {dropdownPos &&
        createPortal(
          <div
            className="actions-dropdown"
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: dropdownPos.y,
              left: dropdownPos.x,
              backgroundColor: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              borderRadius: '6px',
              zIndex: 9999,
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {canEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/inventory-management/warehouses/edit/${id}`);
                  closeDropdown();
                }}
              >
                {getTranslatedValue('Edit')}
              </button>
            )}
            {canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                  closeDropdown();
                }}
              >
                {getTranslatedValue('Delete')}
              </button>
            )}
            {haveInventoriesPermission && havePermissionSetup && (
              <button
                onClick={(e) => {
                  closeDropdown();
                  e.stopPropagation();
                  navigate(
                    `/inventory-management/warehouses/${id}/inventories`,
                  );
                }}
              >
                {getTranslatedValue('Inventories')}
              </button>
            )}
          </div>,
          document.body,
        )}

      {showModal && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <SureDeleteModal
            queryKey={'warehouses list'}
            deleteItemUrl={`app/warehouses/${id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            setShowModal={(value: any) => {
              setShowModal(value);
              navigate('/inventory-management/warehouses');
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ActionsDropdown;
