import { CloseSvg } from '@/assets/icons/close-svg';
import { useContextMenu } from "@/hooks/use-context-menu";
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalDropdownProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  closeButton?: boolean;
  bottomButtons?: React.ReactNode;
  toggleBtn?: React.ReactNode;
  closeOnClick?: boolean;
  className?: any;
  disabled?: boolean;
}

export const PortalDropdownWrapper: React.FC<PortalDropdownProps> = ({
  title,
  children,
  closeButton = true,
  bottomButtons,
  toggleBtn,
  closeOnClick = false,
  className = '',
  disabled = false,
}) => {
  const { contextMenu, contextMenuRef, openContextMenu, closeContextMenu } = useContextMenu();

  // Close dropdown when disabled
  useEffect(() => {
    if (disabled && contextMenu) {
      closeContextMenu();
    }
  }, [disabled, contextMenu, closeContextMenu]);

  useEffect(() => {
    if (contextMenu) {
      const handleClickOutside = (e: MouseEvent) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
          closeContextMenu();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [contextMenu, closeContextMenu, contextMenuRef]);

  const clickHandler = () => {
    if (closeOnClick) {
      closeContextMenu();
    }
  };

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-trigger-button"
        onClick={disabled ? undefined : openContextMenu}
        disabled={disabled}
      >
        {toggleBtn}
      </button>
      {contextMenu && ReactDOM.createPortal(
        <div
          className={`portal-dropdown-content ${className}`}
          onClick={clickHandler}
          ref={contextMenuRef}
          style={{
            position: 'absolute',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            zIndex: 9999,
            background: 'white',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            maxHeight: '480px',
            overflowY: 'auto',
            minWidth: '200px',
          }}
        >
          {(title || closeButton) && (
            <div className="portal-dropdown-content-header">
              {title && <div className="dropdown-title">{title}</div>}
              {closeButton && (
                <button className="dropdown-close" onClick={closeContextMenu}>
                  <CloseSvg />
                </button>
              )}
            </div>
          )}
          <div className="dropdown-body">{children}</div>
          {bottomButtons && (
            <div className="dropdown-bottom-buttons">{bottomButtons}</div>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
};

export default PortalDropdownWrapper;
