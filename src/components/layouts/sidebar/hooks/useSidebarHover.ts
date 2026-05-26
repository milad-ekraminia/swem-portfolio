import { useEffect, useRef } from 'react';
import { SIDEBAR_CONSTANTS } from '../constants';

// interface UseSidebarHoverProps {
//   isExpanded: boolean;
//   showSidebar: boolean;
//   setShowSidebar: (show: boolean) => void;
//   isTogglingButton: boolean;
//   isRTL: boolean;
//   sidebarRef: React.RefObject<HTMLDivElement>;
// }

export const useSidebarHover = ({
  isExpanded,
  showSidebar,
  setShowSidebar,
  isTogglingButton,
  isRTL,
  sidebarRef,
}: any) => {
  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to check if mouse is outside sidebar bounds
  const isMouseOutsideSidebar = (
    clientX: number,
    clientY: number,
    rect: DOMRect,
  ): boolean => {
    const buffer = SIDEBAR_CONSTANTS.TOGGLE_BUTTON_BUFFER;
    const extendedLeft = isRTL ? rect.left - buffer : rect.left;
    const extendedRight = isRTL ? rect.right : rect.right + buffer;

    return (
      clientX < extendedLeft ||
      clientX > extendedRight ||
      clientY < rect.top ||
      clientY > rect.bottom
    );
  };

  // Global mouse move listener to detect when mouse is outside sidebar
  useEffect(() => {
    if (!showSidebar || isExpanded) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isExpanded || isTogglingButton) return;

      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const rect = sidebar.getBoundingClientRect();
      const { clientX, clientY } = e;

      if (isMouseOutsideSidebar(clientX, clientY, rect)) {
        // Clear any existing timeout
        if (mouseLeaveTimeoutRef.current) {
          clearTimeout(mouseLeaveTimeoutRef.current);
        }

        // Hide sidebar after a small delay
        mouseLeaveTimeoutRef.current = setTimeout(() => {
          if (!isExpanded && !isTogglingButton) {
            setShowSidebar(false);
          }
        }, SIDEBAR_CONSTANTS.GLOBAL_MOUSE_MOVE_DELAY);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [
    showSidebar,
    isExpanded,
    isRTL,
    isTogglingButton,
    sidebarRef,
    setShowSidebar,
  ]);

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    if (!isExpanded) {
      setShowSidebar(true);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isExpanded) return;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const rect = sidebar.getBoundingClientRect();
    const { clientX, clientY } = e;

    if (isMouseOutsideSidebar(clientX, clientY, rect)) {
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        if (!isExpanded && !isTogglingButton) {
          setShowSidebar(false);
        }
      }, SIDEBAR_CONSTANTS.MOUSE_LEAVE_DELAY);
    }
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
