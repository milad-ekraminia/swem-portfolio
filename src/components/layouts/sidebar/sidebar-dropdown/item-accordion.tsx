import { useState, useEffect } from 'react';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Link } from 'react-router-dom';

interface AccordionProps {
  isSelected: boolean;
  item?: any;
  icon?: any;
  pathname?: any;
  isActive?: any;
  disabled?: boolean;
}

const ItemAccordion = ({
  item,
  isSelected,
  icon,
  pathname,
  isActive,
  disabled = false,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showAllChildren, setShowAllChildren] = useState<boolean>(false);

  // Close accordion when disabled
  useEffect(() => {
    if (disabled) {
      setIsExpanded(false);
      setShowAllChildren(false);
    }
  }, [disabled]);

  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={getClassNames('sidebar-accordion', [[isSelected, 'active']])}
    >
      {item?.children?.length > 0 ? (
        <div
          className={getClassNames('accordion__header', [[isActive, 'active']])}
          onClick={toggleAccordion}
          style={{ pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.5 : 1 }}
        >
          <div className="label">
            <h3 className={getClassNames('title', [[isActive, 'active']])}>
              {icon}
              {item?.title}
            </h3>
          </div>
          <span
            role="button"
            className={getClassNames('icon', [[isExpanded, 'expanded']])}
          >
            <ChevronDownSvg />
          </span>
        </div>
      ) : (
        <Link
          className={getClassNames('accordion__header', [[isActive, 'active']])}
          to={item?.route}
        >
          <div className="label">
            <h3 className={getClassNames('title', [[isActive, 'active']])}>
              {icon}
              {item?.title}
            </h3>
          </div>
        </Link>
      )}

      {isExpanded &&
        item?.children?.map((item: any) => {
          // Check permission for isMain children
          if (item?.permission && !getPermission(item.permission)) {
            return null;
          }
          return item?.isMain ? (
            <div className="sub-item" key={item?.title}>
              <SubAccordion pathname={pathname} item={item} />
            </div>
          ) : null;
        })}
      <ul
        className={getClassNames('accordion__details', [
          [isExpanded, 'expanded'],
        ])}
      >
        {(() => {
          const nonMainChildren = (item?.children || []).filter(
            (c: any) =>
              !c?.isMain && (!c?.permission || getPermission(c.permission)),
          );
          const visibleChildren = showAllChildren
            ? nonMainChildren
            : nonMainChildren.slice(0, 4);
          return visibleChildren.map((child: any) => (
            <li className="accordion__details-item" key={child?.id}>
              <Link
                to={child?.route}
                target={child?.target || '_self'}
                className={getClassNames('accordion__details-item-item', [
                  [child?.route == pathname, 'isActive'],
                ])}
              >
                <span>{child?.title}</span>
              </Link>
            </li>
          ));
        })()}

        {(() => {
          const nonMainCount = (item?.children || []).filter(
            (c: any) =>
              !c?.isMain && (!c?.permission || getPermission(c.permission)),
          ).length;
          return nonMainCount > 4 ? (
            <li className="accordion__details-item">
              <button
                type="button"
                className="accordion__details-item show-more-btn"
                onClick={() => setShowAllChildren((prev) => !prev)}
              >
                {showAllChildren
                  ? getTranslatedValue('ShowLess')
                  : `${getTranslatedValue('ShowMore')} ${nonMainCount - 4}`}
              </button>
            </li>
          ) : null;
        })()}
      </ul>
    </div>
  );
};

export default ItemAccordion;

const SubAccordion = ({ item, pathname }: { item: any; pathname: any }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showAllChildren, setShowAllChildren] = useState<boolean>(false);
  const isActive = false;
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };
  return (
    <>
      <div
        className={getClassNames('accordion__header', [
          // [isActive, 'active'],
        ])}
        onClick={toggleAccordion}
      >
        <div className="label">
          <h3 className={getClassNames('title', [[isActive, 'active']])}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            {item?.title}
          </h3>
        </div>
        <span
          role="button"
          className={getClassNames('icon', [[isExpanded, 'expanded']])}
        >
          <ChevronDownSvg />
        </span>
      </div>
      <ul
        className={getClassNames('accordion__details', [
          [isExpanded, 'expanded'],
        ])}
      >
        {(() => {
          const nonMainChildren = (item?.children || []).filter(
            (c: any) =>
              !c?.isMain && (!c?.permission || getPermission(c.permission)),
          );
          const visibleChildren = showAllChildren
            ? nonMainChildren
            : nonMainChildren.slice(0, 4);
          return visibleChildren.map((child: any) => (
            <li className="accordion__details-item" key={child?.id}>
              <Link
                to={child?.route}
                target={child?.target || '_self'}
                className={getClassNames('accordion__details-item-item', [
                  [child?.route == pathname, 'isActive'],
                ])}
              >
                <span>{child?.title}</span>
              </Link>
            </li>
          ));
        })()}

        {(() => {
          const nonMainCount = (item?.children || []).filter(
            (c: any) =>
              !c?.isMain && (!c?.permission || getPermission(c.permission)),
          ).length;
          return nonMainCount > 4 ? (
            <li className="accordion__details-item">
              <button
                type="button"
                className="accordion__details-item show-more-btn"
                onClick={() => setShowAllChildren((prev) => !prev)}
              >
                {showAllChildren
                  ? getTranslatedValue('ShowLess')
                  : `${getTranslatedValue('ShowMore')} ${nonMainCount - 4}`}
              </button>
            </li>
          ) : null;
        })()}
      </ul>
    </>
  );
};
