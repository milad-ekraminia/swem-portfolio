import { ChevronRighDoubletSvg } from '@/assets/icons/chevron-right-double-svg';
import Breadcrumb from '@/components/ui/bread-crumb/bread-crumb';
import { getClassNames } from '@/helpers/get-class-names';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { PagesHeaderProps } from '@/types/layout/header';
import { useSelector } from 'react-redux';

const OrgTraceHeader = ({ title, breadcrumbs, icon }: PagesHeaderProps) => {
  const context = useOrgTraceContext();
  const treeData = useSelector((state: any) => state?.tree?.info);

  return (
    <div className={'pages-header'}>
      <div className="bread-crumb-container">
        <Breadcrumb items={breadcrumbs} title={title} icon={icon} />
      </div>
      {treeData?.type === 3 ? (
        <button
          className={getClassNames('bread-crumb-container__detail-toggler', [
            [!!context?.showRightSideBar, 'expanded'],
          ])}
          onClick={() => {
            context?.setShowRightSideBar(!context?.showRightSideBar);
            context?.setShowTree(false);
          }}
        >
          <ChevronRighDoubletSvg stroke="#98A2B3" />
        </button>
      ) : null}
    </div>
  );
};

export default OrgTraceHeader;
