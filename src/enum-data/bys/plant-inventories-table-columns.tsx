import { getTranslatedValue } from '@/helpers/get-translated-value';

export const plantInventoriesTableColumns = () => [
  {
    header: getTranslatedValue('Name'),
    accessorKey: 'product.productName',
    sort: 'product.productName',
    size: 800,
    cell: ({ row }: any) => {
      return (
        <div className="transfer-description">
          <span>{row?.original?.product?.productName}</span>
        </div>
      );
    },
  },
  {
    header: getTranslatedValue('Stok'),
    accessorKey: 'inventory.amount',
    sort: 'inventory.amount',
    size: 900,
    cell: ({ row }: any) => {
      return <>{row?.original?.inventory?.amount}</>;
    },
  },
];
