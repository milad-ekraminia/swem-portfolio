import { CloseSvg } from '@/assets/icons/close-svg';
import { Button } from '@/components/ui/button/button';
import { getClassNames } from '@/helpers/get-class-names';
import React from 'react';
import ReactDOM from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hasFooter?: boolean;
  hasHeader?: boolean;
  size?: 'full' | 'lg' | 'md';
  onSubmit?: () => void;
  closeBtnText?: string;
  submitBtnText?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  hasFooter = true,
  size = 'md',
  closeBtnText = 'İptal Et',
  submitBtnText = 'Kaydet',
  hasHeader = true,
  onSubmit = () => { },
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={getClassNames('sideBar-modal-overlay', [
          [isOpen, 'expanded'],
          [isOpen && size == 'full', 'expanded-full'],
          [isOpen && size == 'lg', 'expanded-lg'],
        ])}
      >
        <div
          className={getClassNames('sideBar-modal-content', [
            [!hasHeader, 'headerless'],
          ])}
        >
          {!hasHeader ? (
            <button
              className="sideBar-modal-content__close-btn"
              onClick={onClose}
            >
              <CloseSvg />
            </button>
          ) : null}
          {title ? (
            <div className="sideBar-modal-content__header">
              <span className="sideBar-modal-content-header__title">
                {title}
              </span>
              <button
                className="sideBar-modal-content__header-close-btn"
                onClick={onClose}
              >
                <CloseSvg />
              </button>
            </div>
          ) : null}
          <div className="sideBar-modal-content__body">{children}</div>
          {hasFooter ? (
            <div className="sideBar-modal-content__footer">
              <Button variant="secondary" onClick={onClose}>
                {closeBtnText}
              </Button>
              <Button variant="primary" onClick={onSubmit}>
                {submitBtnText}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {isOpen && (
        <button onClick={onClose} className="drawer-outside-click"></button>
      )}
    </>,
    document.body,
  );
};

export default Drawer;
