import Footer from '@/components/layouts/footer/footer';
import Sidebar from '@/components/layouts/sidebar/sidebar';
import { DetailDrawer } from '@/components/pages/organization-trace/layout/detail-drawer/detail-drawer';
import { TreeDrawer } from '@/components/pages/organization-trace/layout/tree-drawer/tree-drawer';
import { getClassNames } from '@/helpers/get-class-names';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { MainLayoutProps } from '@/types/layout';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MainLayout = ({ children, className, resources }: MainLayoutProps) => {
  const context = useOrgTraceContext();
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebarExpanded');
    return stored ? JSON.parse(stored) : false;
  });

  return (
    <div className="layout">
      <Sidebar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        resources={resources}
      />
      {context ? <TreeDrawer /> : null}
      <div
        className={getClassNames('layout__content', [
          [isExpanded || !!context?.showTree, 'expanded'],
        ])}
      >
        <main className={`layout__main ${className}`}>{children}</main>
        <Footer />
      </div>
      {context && treeData?.type === 3 ? <DetailDrawer /> : null}
    </div>
  );
};

export default MainLayout;
