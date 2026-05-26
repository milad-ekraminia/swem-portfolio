import { HomeIcon } from '@/assets/icons/home-icon';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useOrgTraceContext } from '@/providers/organization-trace/organization-trace-context';
import { handleChangeTree } from '@/store/features/tree-slice';
import { BreadcrumbProps } from '@/types/components/ui/bread-crumb';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, title, icon }) => {
  const dispatch = useDispatch();
  const context = useOrgTraceContext();

  const handleClick = (item: any) => {
    if (item.dispatchData) {
      dispatch(handleChangeTree(item.dispatchData));
    }
  };

  if (title) {
    document.title = getTranslatedValue(title.label);
  }

  return (
    <div className="breadcrumb-wrapper">
      <div
        className="breadcrumb-wrapper__icon"
        onClick={() => {
          if (context) {
            context?.setShowTree(!context?.showTree);
            context?.setShowRightSideBar(false);
          }
        }}
        style={{ cursor: context ? 'pointer' : 'default' }}
      >
        {icon}
      </div>
      <div className="breadcrumb-wrapper__content">
        {title && (
          <h2 className="breadcrumb-wrapper__content-title">
            {title.href ? (
              <Link to={title.href} className="title__item-link">
                {getTranslatedValue(title.label)}
              </Link>
            ) : (
              <span className="title__item-text">
                {getTranslatedValue(title.label)}
              </span>
            )}
          </h2>
        )}
        <nav className="breadcrumb">
          <span className="breadcrumb__item">
            <Link to="/" className="breadcrumb__item-link">
              <HomeIcon />
            </Link>
            <span className="breadcrumb__item-separator">/</span>
          </span>

          {items.map((item, index) => (
            <span key={index} className="breadcrumb__item">
              {item.href ? (
                <Link
                  to={item.href}
                  className="breadcrumb__item-link"
                  onClick={() => handleClick(item)}
                >
                  {getTranslatedValue(item.label)}
                </Link>
              ) : item.dispatchData ? (
                <span
                  className="breadcrumb__item-text breadcrumb__item-action"
                  onClick={() => handleClick(item)}
                  style={{ cursor: 'pointer', color: '#2E90FA' }}
                >
                  {getTranslatedValue(item.label)}
                </span>
              ) : (
                <span className="breadcrumb__item-text">
                  {getTranslatedValue(item.label)}
                </span>
              )}
              {index < items.length - 1 && (
                <span className="breadcrumb__item-separator">/</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
