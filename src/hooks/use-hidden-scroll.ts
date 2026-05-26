import { useEffect } from 'react';

const useHiddenScroll = ({ isOpen }: { isOpen: boolean }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const modalContainer = document.querySelector(
        '.modal-container',
      ) as HTMLElement;
      if (modalContainer) {
        modalContainer.style.overflow = 'hidden'; // disable scroll inside modal
      }
    } else {
      document.body.style.overflow = '';
      const modalContainer = document.querySelector(
        '.modal-container',
      ) as HTMLElement;
      if (modalContainer) {
        modalContainer.style.overflow = ''; // restore scroll inside modal
      }
    }

    return () => {
      document.body.style.overflow = '';
      const modalContainer = document.querySelector(
        '.modal-container',
      ) as HTMLElement;
      if (modalContainer) {
        modalContainer.style.overflow = '';
      }
    };
  }, [isOpen]);
};

export default useHiddenScroll;
