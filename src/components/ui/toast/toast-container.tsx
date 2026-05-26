import Toast from './toast';

interface ToastItem {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: number) => void;
}

const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
