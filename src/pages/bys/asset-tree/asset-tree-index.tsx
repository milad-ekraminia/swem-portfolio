import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import SolarPanels from '@/components/pages/bys/asset-tree/solar-panels';
import Tabs from '@/components/ui/tabs/tabs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { useState } from 'react';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Menu:MaintenanceAndRepair' },
  { label: 'WorkOrderAssetTree', href: '/bys/asset-tree' },
];

const title = {
  label: 'WorkOrderAssetTree',
  href: '/bys/asset-tree',
};

const tabs = [
  {
    id: 0,
    title: getTranslatedValue('SolarEnergy'),
    value: 'SolarPanels',
  },
  { id: 1, title: getTranslatedValue('WindEnergy'), value: 'WindEnergy' },
];

export default function AssetTreeIndex() {
  const [activeTab, setActiveTab] = useState<string>('SolarPanels');

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="page-wrapper asset-tree-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<KeyRepairCircleSvg stroke="#344054" />}
      />
      <div className="page-wrapper__body">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabChange} />
        {activeTab === 'SolarPanels' && <SolarPanels />}
        {/* Future: Add WindEnergy component here */}
      </div>
    </div>
  );
}
