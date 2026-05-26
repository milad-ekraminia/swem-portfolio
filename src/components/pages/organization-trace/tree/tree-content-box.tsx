import { getClassNames } from '@/helpers/get-class-names';

export default function TreeContentBox({
  label,
  status = -1,
  active = true,
  amount,
  showReverse = false,
  icon,
  onClick,
}: Readonly<{
  label: string;
  status?: number;
  amount?: number;
  active?: boolean;
  showReverse?: boolean;
  icon?: React.ReactNode;
  onClick?: VoidFunction;
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
        <div className="tree-content-box-label-amount">{amount}</div>
      </label>
      {showReverse && status > 0 && (
        <div
          className="tree-content-box__dot"
          style={{ backgroundColor: getIconColor() }}
        ></div>
      )}
    </div>
  );
}
