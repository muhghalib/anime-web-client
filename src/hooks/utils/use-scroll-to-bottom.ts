import { useEffect } from 'react';

export const useScrollToBottom = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
        // eslint-disable-next-line callback-return
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
};
