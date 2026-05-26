import { CheckIconSvg } from '@/assets/icons/check-svg';
import { CloseSvg } from '@/assets/icons/close-svg';
import { WardInfoSvg } from '@/assets/icons/warn-info-svg';
import React from 'react';

interface ToastProps {
  id: number;
  type: 'success' | 'error';
  message: string;
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
  return (
    <div className={`toast ${type}`}>
      {type === 'success' && (
        <span className="toast-icon success">
          <CheckIconSvg stroke="#FFFFFF" />
        </span>
      )}
      {type === 'error' && (
        <span className="toast-icon error">
          <WardInfoSvg stroke="#FFFFFF" />
        </span>
      )}

      <span className="toast-message">{message}</span>

      <button className="toast-close" onClick={() => onClose(id)}>
        <CloseSvg />
      </button>
    </div>
  );
};

export default Toast;
