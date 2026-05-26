import { AlertSvg } from '@/assets/icons/alert-svg';
import { CloseSvg } from '@/assets/icons/close-svg';
import { Button } from '@/components/ui/button/button';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getClassNames } from '@/helpers/get-class-names';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  modalSize?: 'sm' | 'md' | 'lg' | 'full';
  footerType?:
  | 'confirmationNotif'
  | 'confirmationError'
  | 'fullNotif'
  | 'addNotif'
  | 'noFooter';
  icon?: React.ReactNode;
}

export const NotificationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  submitButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  footerType = 'confirmationNotif',
  icon = <AlertSvg fill="#FEF0C7" />,
  modalSize = 'sm',
}) => {
  if (!isOpen) return null;
  const footerSection = () => {
    return footerType != 'noFooter' ? (
      <div
        className={getClassNames('notification-modal__footer-buttons', [
          [footerType != 'confirmationNotif', 'full-width'],
        ])}
      >
        {(footerType == 'confirmationNotif' || footerType == 'addNotif') && (
          <>
            <Button variant="secondary" onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              {submitButtonText}
            </Button>
          </>
        )}
        {footerType == 'confirmationError' && (
          <>
            <Button variant="secondary" onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              {submitButtonText}
            </Button>
          </>
        )}
        {footerType == 'fullNotif' && (
          <Button variant="secondary" onClick={onClose}>
            {cancelButtonText}
          </Button>
        )}
      </div>
    ) : (
      <></>
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalSize={modalSize}>
      <div className="notification-modal">
        <div className="notification-modal__header">
          <div
            className={getClassNames('notification-modal__header-icon', [
              [
                footerType != 'confirmationNotif' && footerType != 'addNotif',
                'danger',
              ],
              [footerType == 'addNotif' || footerType == 'noFooter', 'add'],
            ])}
          >
            {icon}
          </div>
          <div className="notification-modal__header-content">
            <h2
              id="modal-title"
              className="notification-modal__header-content-title"
            >
              {title}
            </h2>
            <span
              id="modal-description"
              className="notification-modal__header-content-description"
            >
              {description}
            </span>
          </div>
          <button
            className="notification-modal__header-close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseSvg width="24px" height="24px" stroke="#98A2B3" />
          </button>
        </div>
        <div className="notification-modal__body">{children}</div>
        {footerType !== 'noFooter' ? (
          <div
            className={getClassNames('notification-modal__footer', [
              [footerType != 'confirmationNotif', 'full'],
            ])}
          >
            {footerSection()}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};
