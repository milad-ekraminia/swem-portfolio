import { WarehouseWithParentSvg } from '@/assets/icons/warehouse-with-parent';
import { WarehouseWithoutParentSvg } from '@/assets/icons/warehouse-without-parent';

function BoxHeader({
  name,
  isDiscard,
  isMainWareHouse,
}: {
  name?: string;
  isDiscard?: boolean;
  isMainWareHouse: boolean;
}) {
  return (
    <div className={`box-header-wrapper ${isDiscard ? 'discard' : ''}`}>
      <div className={`box-header-wrapper-icon`}>
        {isMainWareHouse ? (
          <WarehouseWithoutParentSvg />
        ) : (
          <WarehouseWithParentSvg />
        )}
      </div>
      <div className={`box-header-wrapper-text`}>{name}</div>
    </div>
  );
}

export default BoxHeader;
