import { BuildingSvg } from '@/assets/icons/building-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewProductModal from '@/components/pages/inventory-management/product/new-modal';
import ProductsTable from '@/components/pages/inventory-management/product/table';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getPermission } from '@/helpers/get-permission-helper';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

export const Products = () => {
  const [newItem, setNewItem] = useState(false);

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:InventoryManagement',
      href: '',
    },
    { label: 'Menu:Products', href: '' },
  ];
  const title = {
    label: 'Menu:Products',
    href: ``,
  };

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<BuildingSvg />}
        />
        <div className="page-wrapper__body">
          <ProductsTable setNewItem={getPermission("WebNet.Products.Create") ? setNewItem : undefined} />
        </div>
      </div>
      {getPermission("WebNet.Products.Create") && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="lg"
          showCloseButton={false}
        >
          <NewProductModal setShowModal={setNewItem} />
        </Modal>
      )}
    </>
  );
};
