import { mimicElementShowType } from '@/enum-data/definitions/enum';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { MimicElement } from '@/types/pages/system-administration/definitions/mimic-elements';
import Image from '@/components/ui/image/image';
import { StatusIcon } from '@/components/ui/status-icon';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: MimicElement | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('MimicElementShowType'),
      accessorKey: 'mimicElementShowType',
      sort: 'MimicElementShowType',
      size: 300,
      cell: ({ row }: { row: any }) => {
        return getTranslatedValue(
          'Enum:MimicElementShowType.' +
            mimicElementShowType[
              row.original
                ?.mimicElementShowType as keyof typeof mimicElementShowType
            ],
        );
      },
    },
    {
      header: getTranslatedValue('MimicElementName'),
      accessorKey: 'mimicElementName',
      sort: 'MimicElementName',
      cell: ({ row }: { row: any }) => {
        return row.original?.mimicElementName
          ? getTranslatedValue(row.original?.mimicElementName)
          : '-';
      },
    },

    {
      header: getTranslatedValue('MimicElementGroup'),
      accessorKey: 'mimicElementGroup',
      sort: 'MimicElementGroup',
      cell: ({ row }: { row: any }) => {
        return row.original?.mimicElementGroup
          ? getTranslatedValue(row.original?.mimicElementGroup)
          : '-';
      },
    },
    {
      header: getTranslatedValue('Active'),
      accessorKey: 'active',
      sort: 'Active',
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('em_element'),
      accessorKey: 'mimicElementFileName',
      sort: 'MimicElementFileName',
      cell: ({ row }: { row: any }) => {
        return row.original?.mimicElementFileName ? (
          <Image
            // src={
            //   row.original?.uploadFolder
            //     ? `/uploads/${row.original?.uploadFolder}/${row.original?.mimicElementFileName}`
            //     : `/uploads/${row.original?.mimicElementFileName}`
            // }
            src={
              row.original?.uploadFolder
                ? `/public/uploads/mimic-elements/${row.original?.uploadFolder}/${row.original?.mimicElementFileName}`
                : `/public/uploads/mimic-elements/${row.original?.mimicElementFileName}`
            }
            // src={`/uploads/${row.original?.uploadFolder}/${row.original?.mimicElementFileName}`}
            alt={row.original?.mimicElementFileName}
            style={{ width: '28px', objectFit: 'contain' }}
          />
        ) : (
          '-'
        );
      },
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.MimicElements.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.MimicElements.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => setShowDeleteModal(row?.original?.id)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};

export const showTypeFieldsConfig: Record<
  number,
  {
    inputs?: Array<
      | 'mimicElementName'
      | 'fileSelectionType'
      | 'mimicElementDefaultElementId'
      | 'mimicElementBitZeroElementId'
      | 'mimicElementBitOneElementId'
      | 'mimicElementBitOneZeroElementId'
      | 'mimicElementBitZeroOneElementId'
    >;
    inRow?: Array<string[]>; // fields grouped into .row
    showUpload?: boolean;
    showRelatedTable?: boolean;
  }
> = {
  1: {
    inputs: ['fileSelectionType'],
    showUpload: true,
  },
  2: {
    inputs: [
      'mimicElementDefaultElementId',
      'mimicElementBitZeroElementId',
      'mimicElementBitOneElementId',
    ],
    inRow: [['mimicElementBitZeroElementId', 'mimicElementBitOneElementId']],
  },
  21: {
    inputs: [
      'mimicElementDefaultElementId',
      'mimicElementBitZeroElementId',
      'mimicElementBitOneElementId',
      'mimicElementBitOneZeroElementId',
      'mimicElementBitZeroOneElementId',
    ],
    inRow: [
      ['mimicElementBitZeroElementId', 'mimicElementBitOneElementId'],
      ['mimicElementBitOneZeroElementId', 'mimicElementBitZeroOneElementId'],
    ],
  },
  3: {
    inputs: ['mimicElementDefaultElementId'],
    showRelatedTable: true,
  },
  4: {
    inputs: ['mimicElementDefaultElementId', 'mimicElementBitOneElementId'],
    inRow: [['mimicElementBitOneElementId']],
  },
  5: {
    inputs: ['mimicElementDefaultElementId', 'mimicElementBitOneElementId'],
    inRow: [['mimicElementBitOneElementId']],
  },
  23: {
    inputs: [
      'mimicElementDefaultElementId',
      'mimicElementBitZeroElementId',
      'mimicElementBitOneElementId',
    ],
    inRow: [['mimicElementBitZeroElementId', 'mimicElementBitOneElementId']],
  },
  24: {
    inputs: ['mimicElementDefaultElementId'],
    showRelatedTable: true,
  },
  25: {
    showUpload: true,
  },
  26: {
    showUpload: true,
  },
};
