import { getTranslatedValue } from '@/helpers/get-translated-value';
import StatusTag from '@/components/ui/status-tag/status-tag';

export const InventoriesGeneralTableColumns = ({
  onClick,
}: {
  onClick: (row: any) => void;
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
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 120,
    cell: ({ row }: any) => {
      return (
        <div className="actions">
          <div className="detail" onClick={() => onClick(row)}>
            {getTranslatedValue('DetailButton')}
          </div>
          {/* <ActionDeleteButtons
              deleteUrl={`app/inventories/${row?.original?.product?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
              queryKey={queryKey}
            /> */}
        </div>
      );
    },
  },
];
