import { getTranslatedValue } from '@/helpers/get-translated-value';
import CommonHeader from './common-header';

function CommonContainerWithHeader({
  children,
  label,
  columns = 1,
}: {
  children: any;
  label: any;
  columns?: any;
}) {
  return (
    <div className={`common-container ${columns === 2 ? 'columns-2' : ''}`}>
      <CommonHeader label={getTranslatedValue(label)} />
      <div className="common-container-body">{children}</div>
    </div>
  );
}

export default CommonContainerWithHeader;
