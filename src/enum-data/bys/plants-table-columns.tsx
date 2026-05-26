import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import StatusTag from '@/components/ui/status-tag/status-tag';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const PlantsTableColumns = ({
  setEditItem,
  setInventoriesItem,
}: {
  setEditItem: (row: any) => void;
  setInventoriesItem: (row: any) => void;
}) => [
    {
      header: getTranslatedValue('Name'),
      accessorKey: 'warehouse.name',
      sort: 'Warehouse.Name',
    },
    {
      header: getTranslatedValue('Status'),
      accessorKey: 'warehouse.status',
      sort: 'Warehouse.Status',
      size: 75,
      cell: ({ row }: any) => {
        const active = row?.original?.warehouse.status;
        return (
          <>
            {
              <StatusTag
                label={
                  active
                    ? getTranslatedValue('Active')
                    : getTranslatedValue('Passive')
                }
                color={active ? 'success' : 'danger'}
              />
            }
          </>
        );
      },
    },
    {
      header: getTranslatedValue('Coordinate'),
      accessorKey: 'warehouse.coordinate',
      sort: 'Warehouse.Coordinate',
    },
    {
      header: getTranslatedValue('Address'),
      accessorKey: 'warehouse.address',
      sort: 'Warehouse.Address',
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
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
              <div className="li" onClick={() => setEditItem(row)}>
                {getTranslatedValue('Edit')}
              </div>
              <div className="li" onClick={() => setInventoriesItem(row)}>
                {getTranslatedValue('Inventories')}
              </div>
            </PortalDropdownWrapper>
          </div>
        );
      },
    },
  ];
