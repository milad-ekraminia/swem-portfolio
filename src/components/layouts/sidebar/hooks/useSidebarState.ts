import { useEffect, useState } from 'react';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';

interface UseSidebarStateProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSidebarState = ({
  isExpanded,
  setIsExpanded,
}: UseSidebarStateProps) => {
  const [showSubItems, setShowSubItems] = useState(-1);
  const [showSubItem, setShowSubItem] = useState<any>();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTogglingButton, setIsTogglingButton] = useState(false);

  const context = useOrgTraceContext();

  // Persist sidebar expanded state
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
    // When sidebar is permanently expanded, clear hover state
    if (isExpanded) {
      setShowSidebar(false);
    }
  }, [isExpanded]);

  // Handle context sidebar interactions
  useEffect(() => {
    if ((context && context?.showRightSideBar) || context?.showTree) {
      setIsExpanded(false);
      setShowSubItems(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.showRightSideBar, context?.showTree]);

  useEffect(() => {
    if ((context && isExpanded) || showSubItems !== -1) {
      context?.setShowRightSideBar?.(false);
      context?.setShowTree?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, showSubItems]);

  const show = isExpanded || showSidebar;

  return {
    showSubItems,
    setShowSubItems,
    showSubItem,
    setShowSubItem,
    showSidebar,
    setShowSidebar,
    isTogglingButton,
    setIsTogglingButton,
    show,
  };
};

