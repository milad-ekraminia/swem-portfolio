// components/Tooltip.tsx
import ReactDOM from 'react-dom';

export const Tooltip = ({
  content,
  left,
  top,
  visible,
}: {
  content: string;
  left: number;
  top: number;
  visible: boolean;
}) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className="tooltip-portal"
      style={{
        position: 'fixed',
        top,
        left,
        width: 200,
        zIndex: 9999999,
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      {content}
    </div>,
    document.body,
  );
};
