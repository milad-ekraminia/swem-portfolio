import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import StatusTag from '@/components/ui/status-tag/status-tag';
import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const InventoriesDetailedTableColumns = ({
  setEditItem,
  setTransferItem,
  setConsumableItem,
  setImagesItem,
  setLogItem,
  setDeleteItem,
}: {
  setEditItem: (row: any) => void;
  setTransferItem: (row: any) => void;
  setConsumableItem: (row: any) => void;
  setImagesItem: (row: any) => void;
  setLogItem: (row: any) => void;
  setDeleteItem: (row: any) => void;
}) => [
    {
      header: getTranslatedValue('Product'),
      accessorKey: 'productW.product.productName',
      sort: 'ProductW.Product.ProductName',
    },
    {
      header: getTranslatedValue('step_type'),
      accessorKey: 'productW.productType.name',
      sort: 'ProductW.ProductType.Name',
      cell: ({ row }: any) => {
        return (
          <>
            <StatusTag
              color="blue"
              label={row?.original?.productW?.productType?.name}
            />
          </>
        );
      },
    },
    {
      header: getTranslatedValue('Stock'),
      accessorKey: 'inventory.amount',
      sort: 'Inventory.Amount',
    },
    {
      header: getTranslatedValue('ProductUnit'),
      accessorKey: 'productW.productUnit.name',
      sort: 'ProductW.ProductUnit.Name',
      cell: ({ row }: any) => {
        return <>{row?.original?.productW?.productUnit?.name ?? '-'}</>;
      },
    },
    {
      header: getTranslatedValue('GuaranteeStart'),
      accessorKey: 'inventory.guaranteeStart',
      sort: 'Inventory.GuaranteeStart',
      cell: ({ row }: any) => {
        return (
          <>
            {row?.original?.inventory?.guaranteeStart
              ? dateFormatter(row?.original?.inventory?.guaranteeStart)
              : '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('GuaranteeEnd'),
      accessorKey: 'inventory.guaranteeEnd',
      sort: 'Inventory.GuaranteeEnd',
      cell: ({ row }: any) => {
        return (
          <>
            {row?.original?.inventory?.guaranteeEnd
              ? dateFormatter(row?.original?.inventory?.guaranteeEnd)
              : '-'}
          </>
        );
      },
    },
    // {
    //   header: getTranslatedValue("Amount"),
    //   accessorKey: "inventory.amount1",
    //   sort: "Inventory.Amount",
    //   cell: ({ row }: any) => {
    //     return <>
    //       {row?.original?.inventory?.amount?.toFixed(2) ?? "-"}</>
    //   }
    // },
    {
      header: getTranslatedValue('SerialNumber'),
      accessorKey: 'inventory.serialNumber',
      sort: 'Inventory.SerialNumber',
    },
    {
      header: getTranslatedValue('Brand'),
      accessorKey: 'productW.productBrand.brandName',
      sort: 'ProductW.ProductBrand.BrandName',
    },
    {
      header: getTranslatedValue('Model'),
      accessorKey: 'productW.productBrandModel.modelName',
      sort: 'ProductW.ProductBrandModel.ModelName',
    },
    {
      header: getTranslatedValue('Manufacturer'),
      accessorKey: 'productW.productManufacturer.manufacturerTitle',
      sort: 'ProductW.ProductManufacturer.ManufacturerTitle',
    },
    {
      header: getTranslatedValue('Warehouse'),
      accessorKey: 'warehouse.name',
      sort: 'Warehouse.Name',
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 120,
      cell: ({ row }: any) => {
        return (
          <div className="actions">
            <PortalDropdownWrapper
              toggleBtn={
                <div className="detail">{getTranslatedValue('Actions')}</div>
              }
              className="detailed-inventories-actions"
              closeButton={false}
              closeOnClick
            >
              {getPermission('WebNet.Inventories.Transfer') && (
                <div className="li" onClick={() => setTransferItem(row)}>
                  {getTranslatedValue('Transfer')}
                </div>
              )}
              {getPermission('WebNet.Inventories.Edit') && (
                <div className="li" onClick={() => setEditItem(row)}>
                  {getTranslatedValue('Edit')}
                </div>
              )}
              {getPermission('WebNet.Inventories.Delete') && (
                <div className="li" onClick={() => setDeleteItem(row)}>
                  {getTranslatedValue('Delete')}
                </div>
              )}
              <div className="li" onClick={() => setConsumableItem(row)}>
                {getTranslatedValue('Consumables')}
              </div>
              <div className="li" onClick={() => setLogItem(row)}>
                {getTranslatedValue('InventoryLogs')}
              </div>
              <div className="li" onClick={() => setImagesItem(row)}>
                {getTranslatedValue('Images')}
              </div>
            </PortalDropdownWrapper>
          </div>
        );
      },
    },
  ];
