import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, Edit, Trash2, X } from 'lucide-react';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (derivedValue: any | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('Active'),
      accessorKey: '1',
      sort: 'Active',
      size: 100,
      cell: ({ row }: any) => {
        return (
          <StatusTagCircle
            label={
              row?.original?.active ? (
                <Check size={14} color="green" />
              ) : (
                <X size={14} color="red" />
              )
            }
            color={row?.original?.active ? 'success' : 'danger'}
          />
        );
      },
    },
    {
      header: getTranslatedValue('Description'),
      accessorKey: 'description',
      sort: 'Description',
      size: 1300,
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 100,
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          <button
            type="button"
            onClick={() => setShowEditModal(row?.original)}
            className="dv-edit-delete-buttons__delete-button"
          >
            <Edit color="var(--brand-600)" size={20} />
          </button>
          <button
            type="button"
            className="dv-edit-delete-buttons__delete-button"
            onClick={() => setShowDeleteModal(row?.original.id)}
          >
            <Trash2 color="#F04438" size={20} />
          </button>
        </div>
      ),
    },
  ];
};

export const SAMPLE_DEVICE_INITIAL_DATA = [
  {
    active: false,
    description: 'G.A Ansa Ambalaj Sayaç',
    startDate: '2025-08-18 11:15:30',
    endDate: '2025-08-18 11:15:30',
    device: 'Test',
    imp: 1.4,
    timeInformation: 1,
    exp: 2.5,
    id: 1,
  },
  {
    active: true,
    description: 'G.A Ansa Ambalaj Sayaç',
    startDate: '2025-08-18 11:15:30',
    endDate: '2025-08-18 11:15:30',
    timeInformation: 1,
    device: 'Test',
    imp: 1.4,
    exp: 2.5,
    id: 2,
  },
  {
    active: false,
    description: 'G.A Ansa Ambalaj Sayaç',
    timeInformation: 1,
    startDate: '2025-08-18 11:15:30',
    endDate: '2025-08-18 11:15:30',
    device: 'Test',
    imp: 1.4,
    id: 3,
    exp: 2.5,
  },
];
