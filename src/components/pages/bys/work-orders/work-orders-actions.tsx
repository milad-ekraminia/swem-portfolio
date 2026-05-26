import { getPermission } from '@/helpers/get-permission-helper';
import { EyeIcon, PenIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WorkOrdersActions({
  info,
  setShowPreviewModal,
  currentUser,
  setEditItem,
}: Readonly<{
  info: any;
  setShowPreviewModal: any;
  currentUser: any;
  setEditItem: any;
}>) {
  const navigate = useNavigate();

  return (
    <div className="table-actions-box">
      <button
        onClick={() => {
          setShowPreviewModal(info);
        }}
      >
        <EyeIcon size={20} stroke="#344054" />
      </button>
      <>
        {getPermission('WebNet.WorkOrders.Edit') && (
          <>
            {currentUser?.id === info?.workOrderAssignedUserId ? (
              !info?.lastAction && info?.workOrderType === 3 ? (
                <PenIcon
                  onClick={() => {
                    setEditItem(info);
                  }}
                  size={20}
                  stroke="#175CD3"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/bys/work-orders/${info?.id}/edit`)}
                >
                  <PenIcon size={20} stroke="#175CD3" />
                </button>
              )
            ) : (
              <PenIcon size={20} stroke="#175cd32f" />
            )}
          </>
        )}
      </>
    </div>
  );
}

export default WorkOrdersActions;
