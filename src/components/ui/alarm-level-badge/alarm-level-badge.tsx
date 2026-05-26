import { CloseSvg } from '@/assets/icons/close-svg';
import { getClassNames } from '@/helpers/get-class-names';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'white'; // extend as needed
  onClick?: () => void;
  onRemove?: () => void;
}

const AlarmLevelBadge: React.FC<BadgeProps> = ({
  children,
  color = 'gray',
  onClick,
  onRemove,
}) => {
  return (
    <span
      className={getClassNames('badge alarm-level-badge', [
        [!!color, color],
        [!!onClick, 'clickable'],
      ])}
      onClick={onClick}
    >
      {children}
      {onRemove && (
        <button
          className="badge__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <CloseSvg width="12" height="12" stroke="#98A2B3" />
        </button>
      )}
    </span>
  );
};

export default AlarmLevelBadge;
