import {
  alphabetItemEnumOptions,
  operatorsOptions,
} from '@/enum-data/definitions/enum';
import {
  fetchDevicesListLookup,
  getLablesListBasedDeviceIdLookup,
} from '@/services/system-administration/definitions/derived-values';
import { Parameter } from '@/types/pages/system-administration/definitions/derived-values';
import { useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  parameter: Parameter;
  handleRemove: () => void;
}

export default function DerivedValuesParameter({
  parameter,
  handleRemove,
}: Props) {
  const { dvDeviceId, dvLabelId, dvItemNr, dvMathOperator, dvConstantValue } =
    parameter;

  const { data: devices } = useQuery({
    queryKey: ['derived values device list'],
    queryFn: fetchDevicesListLookup,
    retry: false,
  });

  const { data: labels } = useQuery({
    queryKey: ['derived valued label list', dvDeviceId],
    queryFn: () => getLablesListBasedDeviceIdLookup(dvDeviceId),
    retry: false,
  });

  const device = useMemo(
    () => devices?.find((d: any) => d.id === dvDeviceId),
    [devices, dvDeviceId],
  );

  const label = useMemo(
    () => labels?.find((l: any) => l.id === dvLabelId),
    [labels, dvLabelId],
  );

  const itemNr = useMemo(
    () => alphabetItemEnumOptions?.find((item: any) => item.value === dvItemNr),
    [dvItemNr],
  );

  const operator = useMemo(
    () => operatorsOptions?.find((item: any) => item.value === dvMathOperator),
    [dvMathOperator],
  );

  return (
    <div className="derived-values-form-table__body-row">
      <div
        className="derived-values-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1' }}
      >
        {itemNr?.title ?? '-'}
      </div>
      <div className="derived-values-form-table__body-row-column">
        {device?.displayName ?? '-'}
      </div>
      <div className="derived-values-form-table__body-row-column">
        {label?.displayName ?? '-'}
      </div>
      <div className="derived-values-form-table__body-row-column">
        {operator?.title ?? '-'}
      </div>
      <div className="derived-values-form-table__body-row-column">
        {dvConstantValue ?? '-'}
      </div>
      <div
        onClick={handleRemove}
        className="derived-values-form-table__body-row-column"
        style={{ gridColumn: 'span 1 / span 1', cursor: 'pointer' }}
        aria-label="Remove parameter"
        role="button"
        tabIndex={0}
      >
        <Trash2 size={20} stroke="#F04438" />
      </div>
    </div>
  );
}
