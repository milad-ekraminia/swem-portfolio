import { CloseSvg } from '@/assets/icons/close-svg';
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  contentStyle?: React.CSSProperties;
  outsideClickStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalSize = 'sm',
  showCloseButton = true,
  contentStyle = {},
  outsideClickStyle = {},
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`modal-content modal-content-${modalSize}`}
        style={contentStyle}
      >
        {showCloseButton ? (
          <button className="modal-close" onClick={onClose}>
            <CloseSvg />
          </button>
        ) : null}
        {children}
      </div>
      {isOpen && (
        <button
          onClick={onClose}
          className="modal-outside-click"
          style={outsideClickStyle}
        ></button>
      )}
    </>,
    document.body,
  );
};

export default Modal;
