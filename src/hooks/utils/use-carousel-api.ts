import type { CarouselApi } from '@app/components/shared/Carousel';
import { useEffect, useState } from 'react';

export const useCarouselApi = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    api,
    setApi,
    current,
    count,
  };
};
