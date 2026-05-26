import { componentConditionEnum } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  MimicElementLookupItem,
  RelatedElement,
} from '@/types/pages/system-administration/definitions/mimic-elements';
import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  element: RelatedElement;
  handleRemove: () => void;
  mimicElementLookup: MimicElementLookupItem[];
}

export default function Element({
  element,
  mimicElementLookup,
  handleRemove,
}: Props) {
  const {
    componentCondition,
    componentConditionEqual,
    componentConditionMaximum,
    componentConditionMinimum,
    conditionElementId,
  } = element;

  const conditionElement = useMemo(
    () =>
      mimicElementLookup?.find((item: any) => item.id == conditionElementId)
        ?.displayName,
    [mimicElementLookup, conditionElementId],
  );
  return (
    <div className="related-elements-form-table__body-row">
      <div className="related-elements-form-table__body-row-column">
        {componentCondition
          ? getTranslatedValue(
            componentConditionEnum[
            componentCondition as keyof typeof componentConditionEnum
            ],
          )
          : ''}
      </div>
      <div
        style={{ gridColumn: 'span 1 / span 1' }}
        className="related-elements-form-table__body-row-column"
      >
        {componentConditionEqual}
      </div>
      <div className="related-elements-form-table__body-row-column">
        {componentConditionMinimum}
      </div>
      <div className="related-elements-form-table__body-row-column">
        {componentConditionMaximum}
      </div>
      <div className="related-elements-form-table__body-row-column">
        {getTranslatedValue(conditionElement ?? '')}
      </div>
      <div
        onClick={handleRemove}
        className="related-elements-form-table__body-row-column"
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
