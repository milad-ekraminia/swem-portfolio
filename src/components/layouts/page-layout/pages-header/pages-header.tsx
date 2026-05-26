import Breadcrumb from '@/components/ui/bread-crumb/bread-crumb';
import { PagesHeaderProps } from '@/types/layout/header';

const PagesHeader = ({ title, breadcrumbs, icon }: PagesHeaderProps) => {
  return (
    <div className={'pages-header'}>
      <Breadcrumb items={breadcrumbs} title={title} icon={icon} />
    </div>
  );
};

export default PagesHeader;
