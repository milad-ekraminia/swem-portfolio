import { CloseSvg } from '@/assets/icons/close-svg';
import { FilterSvg } from '@/assets/icons/filter-svg';
import Tree from '@/components/pages/organization-trace/tree/tree';
import { Button } from '@/components/ui/button/button';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Tabs from '@/components/ui/tabs/tabs';
import { orgTreeTabList } from '@/enum-data/organization-trace/tree-drawer';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { useState } from 'react';
import { FilterModal } from './filter-modal';

export const TreeDrawer = () => {
  // const [activeTab, setActiveTab] = useState<string>("solar");
  const context = useOrgTraceContext();
  const [showFilterModal, setShowFilterModal] = useState(false);
  return (
    <>
      <div
        className={getClassNames('org-trace-tree-drawer', [
          [!!context?.showTree, 'expanded'],
        ])}
      >
        <div className="org-trace-tree-drawer__header">
          <h1 className="org-trace-tree-drawer__header-title">
            {getTranslatedValue('organization tree view')}
          </h1>
          <div className="org-trace-tree-drawer__header-actions">
            <Button
              variant="secondary"
              onClick={() => setShowFilterModal(true)}
            >
              <FilterSvg stroke="#344054" />
            </Button>
            <Button
              variant="destructive-secondary"
              onClick={() => {
                context?.setShowTree(false);
              }}
            >
              <CloseSvg stroke="#B42318" />
            </Button>
          </div>
        </div>
        <div className="org-trace-tree-drawer__body">
          <div className="tabs-container">
            <Tabs
              tabs={orgTreeTabList('solar')}
              activeTab={'solar'}
              // onTabClick={setActiveTab}
              onTabClick={() => { }}
            />
          </div>
          <Tree />
        </div>
      </div>
      <Modal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)}>
        <FilterModal setShowFilterModal={setShowFilterModal} />
      </Modal>
    </>
  );
};
