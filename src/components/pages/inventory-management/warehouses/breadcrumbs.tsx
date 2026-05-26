import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { organizationsBreadcrumbProps } from '@/types/pages/definitions/organizations.type';

const MemoWareHousesBreadcrumb = ({
  items,
  handleClick,
}: organizationsBreadcrumbProps) => {
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="breadcrumb">
      {items?.map((item, index) => (
        <span key={index} className="breadcrumb__item">
          <button
            type="button"
            className={
              items?.length - 1 !== index
                ? 'breadcrumb__item-link breadcrumb__item-link__gray'
                : 'breadcrumb__item-link'
            }
            onClick={() => handleClick(item)}
          >
            {getTranslatedValue(item.label)}
          </button>
          {index < items.length - 1 && (
            <span className="breadcrumb__item-separator">
              {isRTL ? (
                <ChevronLeft size={18} color="#667085" />
              ) : (
                <ChevronRight size={18} color="#667085" />
              )}
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

const OrganizationsBreadcrumb = memo(MemoWareHousesBreadcrumb);

export default OrganizationsBreadcrumb;
