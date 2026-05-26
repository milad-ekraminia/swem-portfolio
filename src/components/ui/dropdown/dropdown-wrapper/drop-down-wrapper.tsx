import { CloseSvg } from '@/assets/icons/close-svg';
import { getCookie } from '@/helpers/cookies';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  closeButton?: boolean;
  bottomButtons?: React.ReactNode;
  toggleBtn?: React.ReactNode;
  leftOffset?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  size?: 'small' | 'semi-medium' | 'medium' | 'large';
}

export const DropdownWrapper: React.FC<DropdownProps> = ({
  title,
  children,
  closeButton = true,
  bottomButtons,
  toggleBtn,
  leftOffset = '0px',
  direction = 'down',
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isRTL = getCookie('CultureName') === 'fa';

  const dropdownStyle: React.CSSProperties = {};

  // Apply RTL-specific positioning
  if (isRTL) {
    if (direction === 'left') {
      dropdownStyle.left = '100%';
      dropdownStyle.right = 'auto';
    } else if (direction === 'right') {
      dropdownStyle.right = '100%';
      dropdownStyle.left = 'auto';
    } else if (direction === 'up') {
      dropdownStyle.bottom = '100%';
      dropdownStyle.top = 'auto';
      dropdownStyle.right = '0';
      dropdownStyle.left = 'auto';
    } else if (direction === 'down') {
      dropdownStyle.top = '100%';
      dropdownStyle.right = '0';
      dropdownStyle.left = 'auto';
    }
  } else {
    // LTR positioning
    dropdownStyle.left = leftOffset;

    if (direction === 'left') {
      dropdownStyle.right = '100%';
      dropdownStyle.left = 'auto';
    } else if (direction === 'right') {
      dropdownStyle.left = '100%';
    } else if (direction === 'up') {
      dropdownStyle.bottom = '100%';
      dropdownStyle.top = 'auto';
    } else if (direction === 'down') {
      dropdownStyle.top = '100%';
    }
  }

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button onClick={toggleDropdown}>{toggleBtn}</button>
      {isOpen && (
        <div
          className={`dropdown-content dropdown-${direction} dropdown-content-${size} ${isRTL ? 'rtl' : ''}`}
          style={dropdownStyle}
        >
          {(title || closeButton) && (
            <div className="dropdown-content-header">
              {title && <div className="dropdown-title">{title}</div>}
              {closeButton && (
                <button className="dropdown-close" onClick={closeDropdown}>
                  <CloseSvg />
                </button>
              )}
            </div>
          )}

          <div className="dropdown-body" style={{ position: 'relative' }}>
            {children}
          </div>
          {bottomButtons && (
            <div className="dropdown-bottom-buttons">{bottomButtons}</div>
          )}
        </div>
      )}
    </div>
  );
};
