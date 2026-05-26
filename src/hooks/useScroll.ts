import { useEffect } from 'react';

const useScroll = (
  listRef: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
  hasMore: boolean,
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
          callback(); // call the callback function
        }
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [listRef, hasMore, callback]);
};

export default useScroll;
