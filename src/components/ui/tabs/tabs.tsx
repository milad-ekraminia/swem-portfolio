import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';

interface TabsType {
  title: string;
  value?: string;
  id?: number;
  icon?: ReactNode;
  permission?: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs?: TabsType[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs = ({ activeTab, onTabClick, tabs }: TabsProps) => {
  return tabs?.length ? (
    <ul className="tabs">
      {tabs.map((tab: TabsType) => {
        return (
          <li key={tab.title} className="tabs__item">
            <button
              type="button"
              className={`tab-button ${
                activeTab === tab.value || activeTab === tab.title
                  ? 'active-tab'
                  : ''
              } ${tab.disabled ? 'disabled-tab' : ''}`}
              onClick={() =>
                !tab.disabled && onTabClick(tab.value ?? tab.title)
              }
              disabled={tab.disabled}
              style={
                tab.disabled ? { opacity: 0.4, cursor: 'not-allowed' } : {}
              }
            >
              {tab.icon}
              {getTranslatedValue(tab.title)}
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default memo(Tabs);
