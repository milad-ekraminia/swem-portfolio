import { useRef, useState } from 'react';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const openContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let x = e.clientX;
    let y = e.clientY;
    const width = 200;
    const height = 300;
    const margin = 50;

    // Right edge
    if (x + width > window.innerWidth - margin) {
      x = window.innerWidth - width - margin;
    }
    // Left edge
    if (x < margin) {
      x = margin;
    }
    // Bottom edge
    if (y + height > window.innerHeight - margin) {
      y = window.innerHeight - height - margin;
    }
    // Top edge
    if (y < margin) {
      y = margin;
    }

    setContextMenu({ x, y });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
  };
};
