import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import { getClassNames } from '@/helpers/get-class-names';
import { getPermission } from '@/helpers/get-permission-helper';
import { Link } from 'react-router-dom';
import { ICON_COLORS } from '../constants';
import ItemAccordion from '../sidebar-dropdown/item-accordion';
// import type { NavItem } from '../types';

// interface SidebarMenuItemProps {
//   item: NavItem;
//   index: number;
//   pathname: string;
//   show: boolean;
//   isExpanded: boolean;
//   showSubItem: any;
//   setShowSubItem: (id: any) => void;
//   spanRefs: React.MutableRefObject<any[]>;
// }

const SidebarMenuItem = ({
  item,
  index,
  pathname,
  show,
  isExpanded,
  showSubItem,
  setShowSubItem,
  spanRefs,
}: any) => {
  const {
    Icon,
    id,
    route,
    title,
    children,
    permission,
    target = '_self',
  } = item;

  // Check permission
  if (permission && !getPermission(permission)) {
    return null;
  }

  // Determine if item is active
  const isActive =
    pathname === route ||
    (children?.length > 0 &&
      children.some((child: any) => child?.route === pathname));

  const hasChildren = children && children.length > 0;

  // Render icon with appropriate styling
  const renderIcon = () => (
    <Icon
      stroke={isActive ? ICON_COLORS.ACTIVE : ICON_COLORS.INACTIVE}
    />
  );

  // Render simple menu item without children
  if (route && !children) {
    return (
      <li
        className={getClassNames('sidebar__menu__item', [
          [isActive, 'active'],
          [show, 'expanded'],
        ])}
        key={id}
      >
        <Link to={route} target={target} className={show ? 'nav-link' : ''}>
          <span
            ref={(el) => {
              spanRefs.current[index] = el;
            }}
          >
            {renderIcon()}
          </span>
          {show && (
            <h2 className={getClassNames('title', [[isActive, 'active']])}>
              {title}
            </h2>
          )}
        </Link>
      </li>
    );
  }

  // Render menu item with children
  return (
    <li
      className={getClassNames('sidebar__menu__item', [
        [isActive && !hasChildren, 'active'],
        [isActive && !isExpanded, 'active'],
        [show, 'expanded'],
      ])}
      key={id}
    >
      <div className={show ? 'nav-parent' : 'nav-wrapper-icon'}>
        <span
          className="icon-parent"
          onClick={() => setShowSubItem(id)}
        >
          {show ? (
            <ItemAccordion
              item={{ title, route, children, id }}
              icon={renderIcon()}
              pathname={pathname}
              isSelected={showSubItem == id}
              isActive={isActive}
            />
          ) : (
            <PortalDropdownWrapper
              toggleBtn={
                <span
                  ref={(el) => {
                    spanRefs.current[index] = el;
                  }}
                >
                  {renderIcon()}
                </span>
              }
              closeButton={false}
              className="sideBarDropDownStyles"
            >
              <ul className="pages-sidebar__list">
                {children?.map((child: any) => {
                  // Check permission for child items
                  if (child?.permission && !getPermission(child.permission)) {
                    return null;
                  }

                  return child?.isMain ? (
                    <ItemAccordion
                      key={child.id}
                      item={{ title, route, children, id }}
                      icon={renderIcon()}
                      pathname={pathname}
                      isSelected={showSubItem == id}
                      isActive={isActive}
                    />
                  ) : (
                    <Link
                      key={child?.id}
                      to={child?.route}
                      target={child?.target ?? '_self'}
                      className={getClassNames('pages-sidebar__list-item', [
                        [child?.route == pathname, 'isActive'],
                      ])}
                    >
                      <h2 className="title-active">{child?.title}</h2>
                    </Link>
                  );
                })}
              </ul>
            </PortalDropdownWrapper>
          )}
        </span>
      </div>
    </li>
  );
};

export default SidebarMenuItem;

