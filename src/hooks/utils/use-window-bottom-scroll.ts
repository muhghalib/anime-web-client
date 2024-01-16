import { useEffect } from 'react';

export const useWindowBottomScroll = (call: () => any) => {
  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.innerHeight + window.pageYOffset;

      if (Math.ceil(scrolledTo + 1) >= document.body.scrollHeight) call();
    };

    window.addEventListener('scroll', onscroll);

    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, []);
};
