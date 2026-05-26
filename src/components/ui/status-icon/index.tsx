import { CheckIconSvg } from '@/assets/icons/check-svg';
import { CloseSvg } from '@/assets/icons/close-svg';
import { getClassNames } from '@/helpers/get-class-names';

export const StatusIcon = ({ status }: { status: boolean }) => {
  return (
    <div className={getClassNames('status-icon', [[status, 'active']])}>
      {status ? (
        <CheckIconSvg stroke="#17B26A" width="12" height="12" />
      ) : (
        <CloseSvg stroke="#F04438" width="12" height="12" />
      )}
    </div>
  );
};
