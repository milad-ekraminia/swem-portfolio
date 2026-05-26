import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import Image from '@/components/ui/image/image';
import { getNavItems } from '@/enum-data/nav-items';
import { getCookie } from '@/helpers/cookies';
import { getClassNames } from '@/helpers/get-class-names';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ItemAccordion from './sidebar-dropdown/item-accordion';
import { SideBarDropdown } from './sidebar-dropdown/sidebar-dropdown';

interface Props {
  resources: any;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ resources, isExpanded, setIsExpanded }: Props) => {
  const [showSubItems, setShowSubItems] = useState(-1);
  const [showSubItem, setShowSubItem] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTogglingButton, setIsTogglingButton] = useState(false);

  const cultureName =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const isRTL = cultureName === 'fa';

  const spanRefs = useRef<any>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const context = useOrgTraceContext();

  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
    // When sidebar is permanently expanded, clear hover state
    if (isExpanded) {
      setShowSidebar(false);
    }
  }, [isExpanded]);

  const navItems = useMemo(
    () => getNavItems(resources),
    [resources, cultureName],
  );

  const found = useMemo(() => {
    return (
      navItems?.find((group) => group?.route === pathname) ||
      navItems
        ?.flatMap((group) => group?.children || [])
        .find((item: any) => item?.route === pathname)
    );
  }, [pathname, cultureName, navItems]);

  if (found) {
    document.title = getTranslatedValue(found?.title, undefined, resources);
  } else {
    document.title = 'Swem';
  }

  useEffect(() => {
    if ((context && context?.showRightSideBar) || context?.showTree) {
      setIsExpanded(false);
      setShowSubItems(-1);
      setShowSidebar(false);
    }
  }, [context?.showRightSideBar, context?.showTree]);

  useEffect(() => {
    if ((context && isExpanded) || showSubItems !== -1) {
      context?.setShowRightSideBar?.(false);
      context?.setShowTree?.(false);
    }
  }, [isExpanded, showSubItems]);

  const show = isExpanded || showSidebar;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
      }
    };
  }, []);

  // Add global mouse move listener to detect when mouse is outside sidebar
  useEffect(() => {
    if (!showSidebar || isExpanded || context?.showTree) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isExpanded || isTogglingButton || context?.showTree) return;

      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const rect = sidebar.getBoundingClientRect();
      const { clientX, clientY } = e;

      // Extend bounds to include toggle button area
      const buffer = 60;
      const extendedLeft = isRTL ? rect.left - buffer : rect.left;
      const extendedRight = isRTL ? rect.right : rect.right + buffer;

      // Check if mouse is outside the extended area
      const isOutside =
        clientX < extendedLeft ||
        clientX > extendedRight ||
        clientY < rect.top ||
        clientY > rect.bottom;

      if (isOutside) {
        // Clear any existing timeout
        if (mouseLeaveTimeoutRef.current) {
          clearTimeout(mouseLeaveTimeoutRef.current);
        }

        // Hide sidebar after a small delay
        mouseLeaveTimeoutRef.current = setTimeout(() => {
          if (!isExpanded && !isTogglingButton) {
            setShowSidebar(false);
          }
        }, 150);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [showSidebar, isExpanded, isRTL, isTogglingButton, context?.showTree]);

  // Handle mouse enter/leave for hover effect
  const handleMouseEnter = () => {
    // Don't open sidebar if tree is open
    if (context?.showTree) {
      return;
    }

    // Clear any pending mouse leave timeout
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    if (!isExpanded) {
      setShowSidebar(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isExpanded || context?.showTree) return;

    // Clear any existing timeout
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    // Get the sidebar bounds including the toggle button
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const rect = sidebar.getBoundingClientRect();
    const { clientX, clientY } = e;

    // Extend bounds to include toggle button area
    // In LTR: button is at right: -10px, so extend right boundary
    // In RTL: button is at left: -10px, so extend left boundary
    const buffer = 60; // pixels to extend for toggle button area
    const extendedLeft = isRTL ? rect.left - buffer : rect.left;
    const extendedRight = isRTL ? rect.right : rect.right + buffer;

    // Only hide if mouse is truly outside the extended area
    const isOutside =
      clientX < extendedLeft ||
      clientX > extendedRight ||
      clientY < rect.top ||
      clientY > rect.bottom;

    if (isOutside) {
      // Add a delay to prevent accidental close
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        if (!isExpanded && !isTogglingButton) {
          setShowSidebar(false);
        }
      }, 100);
    }
  };

  const handleToggleClick = () => {
    // Don't allow opening sidebar if tree is open
    if (context?.showTree && !isExpanded) {
      return;
    }

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
    }, 300);
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
        <Link to="/" className="sidebar__logo-link">
          <div className="sidebar__logo">
            <Image className="pic" src="/images/logo.webp" alt="logo" />
            <span className={getClassNames('title', [[show, 'show']])}>
              {import.meta.env.VITE_SITE_NAME}
            </span>
          </div>
        </Link>
        <button
          type="button"
          className={getClassNames('sidebar-toggle-button', [
            [isExpanded, 'show'],
          ])}
          onClick={handleToggleClick}
          onMouseDown={(e) => {
            // Prevent mouse leave from interfering
            e.stopPropagation();
            setIsTogglingButton(true);
          }}
        >
          {isExpanded ? (
            <PanelRightOpen size={16} color="#1570ef" />
          ) : (
            <PanelRightClose size={16} color="#98A2B3" />
          )}
        </button>
        <ul className={getClassNames('sidebar__menu', [[show, 'expanded']])}>
          {navItems.map(
            (
              {
                Icon,
                id,
                route,
                title,
                children,
                permission,
                target = '_self',
              }: any,
              index,
            ) => {
              let isActive = false;
              if (permission && !getPermission(permission)) {
                return null;
              }
              if (pathname === route) {
                isActive = true;
              } else {
                if (children?.length > 0) {
                  isActive = children?.find((item: any) => {
                    return item?.route == pathname;
                  });
                }
              }
              const hasChildren = children?.length > 0;
              return (
                <li
                  className={getClassNames('sidebar__menu__item', [
                    [isActive && !hasChildren, 'active'],
                    [isActive && !isExpanded, 'active'],
                    [show, 'expanded'],
                  ])}
                  key={id}
                >
                  {!!route && !children ? (
                    <Link
                      to={route}
                      target={target}
                      className={show ? 'nav-link' : ''}
                    >
                      <span
                        ref={(el) => {
                          spanRefs.current[index] = el;
                        }}
                      >
                        <Icon
                          {...(isActive
                            ? { stroke: 'var(--brand-600)' }
                            : { stroke: '' })}
                        />
                      </span>
                      {show && (
                        <h2
                          className={getClassNames('title', [
                            [isActive, 'active'],
                          ])}
                        >
                          {title}
                        </h2>
                      )}
                    </Link>
                  ) : (
                    <div className={show ? 'nav-parent' : 'nav-wrapper-icon'}>
                      <span
                        className="icon-parent"
                        onClick={() => {
                          setShowSubItem(id);
                        }}
                      >
                        {show ? (
                          <ItemAccordion
                            item={{ title, route, children, id }}
                            icon={
                              <Icon
                                {...(isActive
                                  ? { stroke: 'var(--brand-600)' }
                                  : { stroke: '#98A2B3' })}
                              />
                            }
                            pathname={pathname}
                            isSelected={showSubItem == id}
                            isActive={isActive}
                            disabled={!!context?.showTree}
                          />
                        ) : (
                          <PortalDropdownWrapper
                            toggleBtn={
                              <span
                                ref={(el) => {
                                  spanRefs.current[index] = el;
                                }}
                              >
                                <Icon
                                  {...(isActive
                                    ? { stroke: 'var(--brand-600)' }
                                    : { stroke: '#98A2B3' })}
                                />
                              </span>
                            }
                            closeButton={false}
                            className={'sideBarDropDownStyles'}
                            disabled={!!context?.showTree}
                          >
                            <ul className="pages-sidebar__list">
                              {children?.length > 0
                                ? children.map((item: any) => {
                                  // Check permission for child items
                                  if (
                                    item?.permission &&
                                    !getPermission(item.permission)
                                  ) {
                                    return null;
                                  }
                                  return item?.isMain ? (
                                    <ItemAccordion
                                      item={{ title, route, children, id }}
                                      icon={
                                        <Icon
                                          {...(isActive
                                            ? { stroke: 'var(--brand-600)' }
                                            : { stroke: '#98A2B3' })}
                                        />
                                      }
                                      pathname={pathname}
                                      isSelected={showSubItem == id}
                                      isActive={isActive}
                                      disabled={!!context?.showTree}
                                    />
                                  ) : (
                                    <Link
                                      key={item?.id}
                                      to={item?.route}
                                      target={item?.target ?? '_self'}
                                      className={getClassNames(
                                        'pages-sidebar__list-item',
                                        [
                                          [
                                            item?.route == pathname,
                                            'isActive',
                                          ],
                                        ],
                                      )}
                                    >
                                      <h2 className="title-active">
                                        {item?.title}
                                      </h2>
                                    </Link>
                                  );
                                })
                                : null}
                            </ul>
                          </PortalDropdownWrapper>
                        )}
                      </span>
                    </div>
                  )}
                </li>
              );
            },
          )}
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
