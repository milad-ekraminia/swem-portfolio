import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';

export default function TreeContentBox({
  label,
  status = -1,
  active = true,
  amount,
  id,
  showReverse = false,
  handleIsCreating,
  handleIsCreatingWorkOrder,
  icon,
  onClick,
}: Readonly<{
  label: string;
  id: number;
  status?: number;
  amount?: number;
  active?: boolean;
  showReverse?: boolean;
  icon?: React.ReactNode;
  onClick?: VoidFunction;
  handleIsCreating: (id: number | null) => void;
  handleIsCreatingWorkOrder: (id: number | null) => void;
}>) {
  const getIconColor = () => {
    if (status === 2) return '#EF6820';
    if (status === 3) return '#D92D20';
    if (status === 1) return '#FDB022';
    return '';
  };

  return (
    <div className="tree-content-box" onClick={onClick}>
      {!showReverse && status > 0 && (
        <div
          className="tree-content-box__dot"
          style={{ backgroundColor: getIconColor() }}
        ></div>
      )}
      <label
        htmlFor={label}
        className={getClassNames('tree-content-box__label', [
          [!status, 'off-status'],
          [!active, 'not-active'],
        ])}
        style={{ color: !showReverse ? getIconColor() : undefined }}
      >
        {icon}
        {label}
        {amount && (
          <div className="tree-content-box__label-amount">{amount}</div>
        )}
      </label>
      {showReverse && status > 0 && (
        <div
          className="tree-content-box__dot"
          style={{ backgroundColor: getIconColor() }}
        ></div>
      )}
      <div className="tree-content-box__buttons">
        <Button
          onClick={() => {
            handleIsCreatingWorkOrder(id);
          }}
          variant="secondary-blue"
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            {' '}
            {getTranslatedValue('CreateWorkOrder')}
          </span>
        </Button>
        <Button variant="secondary-blue">
          <Link to={`/bys/work-orders/${id}`} style={{ whiteSpace: 'nowrap' }}>
            {' '}
            {getTranslatedValue('ShowWorkOrder')}
          </Link>
        </Button>
        <Button
          onClick={() => {
            handleIsCreating(id);
          }}
          variant="secondary-blue"
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            {' '}
            {getTranslatedValue('CreateWorkNotification')}
          </span>
        </Button>
        <Button variant="secondary-blue">
          <Link
            to={`/bys/work-notifications/${id}`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {' '}
            {getTranslatedValue('ShowWorkNotification')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
