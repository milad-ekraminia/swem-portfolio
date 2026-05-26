import {
  deviceModelPeriodOptionsEnum,
  thresholdTimeUnitTypesEnum,
} from '@/enum-data/definitions/enum';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { DerivedValue } from '@/types/pages/system-administration/definitions/derived-values';
import { StatusIcon } from '@/components/ui/status-icon';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (derivedValue: DerivedValue | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('Active'),
      accessorKey: 'active',
      sort: 'Active',

      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('Description'),
      accessorKey: 'dvDescription',
      sort: 'DvDescription',
      size: 300,
    },
    {
      header: getTranslatedValue('em_derived_value_threshold_time'),
      accessorKey: '1',
      sort: 'DvRecordValue',

      size: 300,
      cell: ({ row }: any) => {
        return getTranslatedValue(
          deviceModelPeriodOptionsEnum[
            row.original
              ?.dvRecordValue as keyof typeof deviceModelPeriodOptionsEnum
          ],
        );
      },
    },
    {
      header: getTranslatedValue('em_derived_value_record'),
      accessorKey: '2',
      sort: 'DvThresholdTimeUnit',

      size: 300,
      cell: ({ row }: any) => {
        return row.original?.dvThresholdTime >= 0
          ? row.original?.dvThresholdTime +
              ' ' +
              getTranslatedValue(
                thresholdTimeUnitTypesEnum[
                  row.original
                    ?.dvThresholdTimeUnit as keyof typeof thresholdTimeUnitTypesEnum
                ],
              )
          : '- - -';
      },
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.DerivedValues.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.DerivedValues.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => setShowDeleteModal(row?.original.id)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
