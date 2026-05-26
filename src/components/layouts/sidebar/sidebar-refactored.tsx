import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookie } from '@/helpers/cookies';
import { getClassNames } from '@/helpers/get-class-names';
import { getNavItems } from '@/enum-data/nav-items';
import { useSidebarState } from './hooks/useSidebarState';
import { useSidebarHover } from './hooks/useSidebarHover';
import { usePageTitle } from './hooks/usePageTitle';
import SidebarLogo from './components/SidebarLogo';
import SidebarToggleButton from './components/SidebarToggleButton';
import SidebarMenuItem from './components/SidebarMenuItem';
import { SideBarDropdown } from './sidebar-dropdown/sidebar-dropdown';
import { SIDEBAR_CONSTANTS } from './constants';
import type { SidebarProps, NavItem } from './types';

const Sidebar = ({ resources, isExpanded, setIsExpanded }: SidebarProps) => {
  const { pathname } = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<any[]>([]);

  // Get culture and RTL direction
  const cultureName =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const isRTL = cultureName === 'fa';

  // Sidebar state management
  const {
    showSubItem,
    setShowSubItem,
    showSidebar,
    setShowSidebar,
    isTogglingButton,
    setIsTogglingButton,
    show,
  } = useSidebarState({ isExpanded, setIsExpanded });

  // Sidebar hover behavior
  const { handleMouseEnter, handleMouseLeave } = useSidebarHover({
    isExpanded,
    showSidebar,
    setShowSidebar,
    isTogglingButton,
    isRTL,
    sidebarRef ,
  });

  // Get navigation items
  const navItems = useMemo(
    () => getNavItems(resources),
    [resources, cultureName],
  );

  // Find active page
  const found = useMemo(() => {
    return (
      navItems?.find((group: NavItem) => group?.route === pathname) ||
      navItems
        ?.flatMap((group: NavItem) => group?.children || [])
        .find((item: NavItem) => item?.route === pathname)
    );
  }, [pathname, navItems]);

  // Set page title
  usePageTitle(found, resources);

  // Handle toggle button click
  const handleToggleClick = () => {
    setIsTogglingButton(true);
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);

    // If closing the sidebar, also hide the hover state
    if (!newExpandedState) {
      setShowSidebar(false);
    }

    // Reset the toggling flag after a short delay
    setTimeout(() => {
      setIsTogglingButton(false);
    }, SIDEBAR_CONSTANTS.TOGGLE_BUTTON_RESET_DELAY);
  };

  return (
    <nav
      ref={sidebarRef}
      className={getClassNames('sidebar', [
        [isExpanded, 'expanded'],
        [showSidebar, 'show'],
      ])}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar__navigation">
        <SidebarLogo show={show} />

        <SidebarToggleButton
          isExpanded={isExpanded}
          onClick={handleToggleClick}
          onMouseDown={() => setIsTogglingButton(true)}
        />

        <ul className={getClassNames('sidebar__menu', [[show, 'expanded']])}>
          {navItems.map((item: NavItem, index: number) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              index={index}
              pathname={pathname}
              show={show}
              isExpanded={isExpanded}
              showSubItem={showSubItem}
              setShowSubItem={setShowSubItem}
              spanRefs={spanRefs}
            />
          ))}
        </ul>
      </div>

      <div
        className={getClassNames('profile-info', [[show === true, 'expanded']])}
      >
        <SideBarDropdown isExpanded={show} />
      </div>
    </nav>
  );
};

export default Sidebar;

