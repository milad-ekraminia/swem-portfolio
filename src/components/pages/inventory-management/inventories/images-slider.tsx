import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { fetchInventoryImages } from '@/services/inventory-management/inventories/inventory-images-api';
import { Button } from '@/components/ui/button/button';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { ImageSliderCodeBased } from '@/components/ui/img-slider/img-slider-code-based';

const InventoryImagesSlider = ({
  inventoryId,
  setShowModal,
}: {
  inventoryId: string;
  setShowModal: any;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['inventories Images', inventoryId],
    queryFn: () =>
      fetchInventoryImages({
        InventoryId: inventoryId,
      }),
    retry: false,
    enabled: !!inventoryId,
  });

  const imagesData = data?.items.map((item: any) => item.inventoryImage?.image);

  const images =
    imagesData?.length > 0 ? (
      <ImageSliderCodeBased images={imagesData} />
    ) : (
      <div className="empty-text">Henüz hiçbir fotoğraf kaydı yapılmamış</div>
    );

  return (
    <div className="inventories-modal">
      <ModalHeader label="Images" isImage setShowModal={setShowModal} />

      <div className="body" style={{ maxHeight: 400 }}>
        {isLoading ? <Loader /> : images}
      </div>

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

export default InventoryImagesSlider;
