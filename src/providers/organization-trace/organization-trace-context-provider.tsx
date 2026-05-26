import { ReactNode, useMemo, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { OrgTraceContext } from './organization-trace-context';

export const OrgTraceProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string | number>('atolla');
  const [showRightSideBar, setShowRightSideBar] = useState<boolean>(false);
  const [showTree, setShowTree] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState(new DateObject());
  const [activeDateType, setActiveDateType] = useState<
    'monthly' | 'daily' | 'yearly'
  >('daily');

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      showRightSideBar,
      setShowRightSideBar,
      showTree,
      setShowTree,
      activeDate,
      setActiveDate,
      activeDateType,
      setActiveDateType,
    }),
    [activeSection, showRightSideBar, showTree, activeDate, activeDateType],
  );

  return (
    <OrgTraceContext.Provider value={value}>
      {children}
    </OrgTraceContext.Provider>
  );
};
