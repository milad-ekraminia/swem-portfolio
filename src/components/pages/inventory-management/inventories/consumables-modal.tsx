import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { fetchInventoryConsumables } from '@/services/inventory-management/inventories/inventory-consumable-api';
import { Button } from '@/components/ui/button/button';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const ConsumablesModal = ({
  inventoryId,
  setShowModal,
}: {
  inventoryId: string;
  setShowModal: any;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['inventories consumable', inventoryId],
    queryFn: () =>
      fetchInventoryConsumables({
        InventoryId: inventoryId,
      }),
    retry: false,
    enabled: !!inventoryId,
  });

  const consumableData =
    data?.items?.length > 0 ? (
      <div className="consumable-list">
        {data?.items.map((item: any) => (
          <div key={item.inventory.creationTime} className="item">
            {item?.product?.productName ?? '-'}
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-text">Henüz hiçbir sarf kaydı yapılmamış</div>
    );

  return (
    <div className="inventories-modal">
      <ModalHeader
        label="Consumables"
        isConsumable
        setShowModal={setShowModal}
      />

      <div className="body">{isLoading ? <Loader /> : consumableData}</div>

      <div className="inventories-modal__footer">
        <div className="dv-submit-or-cancel-buttons">
          <Button
            type="button"
            onClick={() => setShowModal(false)}
            variant="secondary"
          >
            {getTranslatedValue('close')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsumablesModal;
