import { useEffect } from 'react';

export const useWindowBottomScroll = (call: () => any) => {
  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.innerHeight + window.pageYOffset;

      if (Math.ceil(scrolledTo) >= document.body.scrollHeight) call();
    };

    window.addEventListener('scroll', onscroll);

    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, []);
};
