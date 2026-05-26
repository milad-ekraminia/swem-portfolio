import { formulaTypeEnum } from '@/enum-data/definitions/enum';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, X } from 'lucide-react';
import ActionButtons from '@/components/ui/action/action-buttons';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';

export const formulasColumns = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'labelGroup',
    sort: 'Active',
    cell: ({ row }: any) => {
      const info = row?.original;
      const color = info?.active ? 'success' : 'orange';

      return (
        <StatusTagCircle
          color={color}
          label={
            !info?.active ? (
              <X size={14} color="red" />
            ) : (
              <Check size={14} color="green" />
            )
          }
        />
      );
    },
  },
  {
    header: getTranslatedValue('FormulaName'),
    accessorKey: 'formulaName',
    sort: 'FormulaName',
  },
  {
    header: getTranslatedValue('FormulaType'),
    accessorKey: 'labelCode',
    sort: 'FormulaType',
    cell: ({ row }: { row: any }) => {
      const info = row?.original;
      return (
        <>
          {getTranslatedValue(
            `Enum:FormulaType.${formulaTypeEnum[info?.formulaType as 1 | 2]}`,
          )}
        </>
      );
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: 'actions',
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/formulas/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          disabledDelete={!getPermission('WebNet.Formulas.Delete')}
          disabledEdit={!getPermission('WebNet.Formulas.Edit')}
          queryKey={'formulas list'}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
