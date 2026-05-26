import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const createReportColumns = (
  baseCols: any[],
  selectedColumns: string[],
) => {
  const dynamicCols = selectedColumns.map((field) => ({
    title: 'ExcelHeader:' + field.charAt(0).toUpperCase() + field.slice(1),
    sort: field.charAt(0).toUpperCase() + field.slice(1),
    accessorKey: field.charAt(0).toLocaleLowerCase() + field.slice(1),
    size: 260,
    cell: ({ row }: any) =>
      formatNumberWithCommas(
        row.original[field.charAt(0).toLocaleLowerCase() + field.slice(1)],
        3,
      ),
  }));
  // Merge base columns + dynamic columns
  const allCols = [...baseCols, ...dynamicCols];

  // Convert to table format
  return allCols.map((col) => ({
    header: getTranslatedValue(col.title),
    accessorKey: col.accessorKey || col.sort,
    sort: col.sort,
    ...(col.size ? { size: col.size } : {}),
    ...(col.cell && { cell: col.cell }),
  }));
};
