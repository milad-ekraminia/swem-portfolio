import { createContext, useContext } from 'react';

type OrgTraceContextType = {
  activeSection: string | number;
  setActiveSection: (tab: string | number) => void;
  showRightSideBar: boolean;
  setShowRightSideBar: (stat: boolean) => void;
  showTree: boolean;
  setShowTree: (stat: boolean) => void;
  activeDate: any;
  setActiveDate: (date: any) => void;
  activeDateType: 'monthly' | 'daily' | 'yearly';
  setActiveDateType: (type: 'monthly' | 'daily' | 'yearly') => void;
};

export const OrgTraceContext = createContext<OrgTraceContextType | undefined>(
  undefined,
);
export const useOrgTraceContext = () => {
  return useContext(OrgTraceContext);
};
