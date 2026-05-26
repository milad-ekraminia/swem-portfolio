import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';

interface AccordionProps {
  id: number;
  title: string;
  isSelected: number | null;
  clickHandler: (id: number) => void;
  children: React.ReactNode;
  titleBadge?: React.ReactNode
}

const Accordion = ({
  id,
  title,
  isSelected,
  clickHandler,
  titleBadge,
  children,
}: AccordionProps) => {
  const isExpanded = isSelected === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    clickHandler(id);
  };

  return (
    <div className={getClassNames('accordion', [[isExpanded, 'active']])}>
      <button type="button" className="accordion__header" onClick={handleClick}>
        <div className="label">
          <h3 className={getClassNames('title', [[isExpanded, 'active']])}>
            {title}
          </h3>
          {titleBadge ? titleBadge : null}
        </div>
        <button
          type="button"
          className={getClassNames('icon', [[isExpanded, 'expanded']])}
          onClick={handleClick}
        >
          <ChevronDownSvg
            stroke={isExpanded ? 'var(--brand-600)' : undefined}
          />
        </button>
      </button>
      <div
        className={getClassNames('accordion__details', [
          [isExpanded, 'expanded'],
        ])}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
