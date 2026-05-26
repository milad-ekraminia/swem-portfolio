import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { getClassNames } from '@/helpers/get-class-names';
import { ICON_COLORS, ICON_SIZES } from '../constants';

interface SidebarToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  onMouseDown: () => void;
}

const SidebarToggleButton = ({
  isExpanded,
  onClick,
  onMouseDown,
}: SidebarToggleButtonProps) => {
  return (
    <button
      type="button"
      className={getClassNames('sidebar-toggle-button', [
        [isExpanded, 'show'],
      ])}
      onClick={onClick}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown();
      }}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      {isExpanded ? (
        <PanelRightOpen
          size={ICON_SIZES.TOGGLE_BUTTON}
          color={ICON_COLORS.EXPANDED}
        />
      ) : (
        <PanelRightClose
          size={ICON_SIZES.TOGGLE_BUTTON}
          color={ICON_COLORS.INACTIVE}
        />
      )}
    </button>
  );
};

export default SidebarToggleButton;

