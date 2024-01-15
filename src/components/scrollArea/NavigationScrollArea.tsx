import type { UIEventHandler } from 'react';

import { ScrollArea, ScrollBar, ScrollAreaViewport } from '../shared/ScrollArea';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '../shared/Box';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@app/lib/cn';

export interface NavigationScrollAreaProps extends React.ComponentProps<typeof ScrollArea> {}

export const NavigationScrollArea = ({
  className,
  children,
  ...props
}: NavigationScrollAreaProps) => {
  const scrollViewportRef = useRef<React.ElementRef<typeof ScrollAreaViewport> | null>(null);
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea> | null>(null);

  const [navigationLeft, setNavigationLeft] = useState<'active' | 'inactive'>('inactive');
  const [navigationRight, setNavigationRight] = useState<'active' | 'inactive'>('active');

  const handleOnScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    const scrollWidth = e.currentTarget.scrollWidth - clientWidth;

    if (scrollLeft > 0 && Math.ceil(scrollLeft) < scrollWidth) {
      return (() => {
        setNavigationLeft('active');
        setNavigationRight('active');
      })();
    }

    if (scrollLeft === 0) {
      return setNavigationLeft('inactive');
    }

    if (Math.ceil(scrollLeft) >= scrollWidth) {
      return setNavigationRight('inactive');
    }
  };

  const handleOnClickLeft = useCallback(() => {
    if (scrollViewportRef.current) {
      const { scrollLeft } = scrollViewportRef.current;

      scrollViewportRef.current.scrollTo({ left: scrollLeft - 150, behavior: 'smooth' });
    }
  }, [scrollViewportRef.current]);

  const handleOnClickRight = useCallback(() => {
    if (scrollViewportRef.current) {
      const { scrollLeft } = scrollViewportRef.current;

      scrollViewportRef.current.scrollTo({ left: scrollLeft + 150, behavior: 'smooth' });
    }
  }, [scrollViewportRef.current]);

  useEffect(() => {
    if (scrollAreaRef.current && scrollViewportRef.current) {
      const [scrollArea, scrollViewport] = [scrollAreaRef.current, scrollViewportRef.current];
      const [scrollAreaCw, scrollViewportCw] = [
        scrollArea.clientWidth,
        scrollViewport.children.item(0)?.children?.item(0)?.clientWidth || 0,
      ];

      if (scrollViewportCw < scrollAreaCw) setNavigationRight('inactive');
    }
  }, [scrollAreaRef.current, scrollViewportRef.current]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      data-navigation-left={navigationLeft}
      data-navigation-right={navigationRight}
      className={cn(
        'relative w-full isolate whitespace-nowrap before:content-["_"] before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:h-full before:w-16 before:md:w-40 before:z-10 before:bg-[linear-gradient(270deg,_#fff0_0,_theme("colors.background")_90%,_theme("colors.background"))] data-[navigation-left=inactive]:before:hidden after:content-["_"] after:absolute after:top-0 after:bottom-0 after:right-0 after:block after:h-full after:w-16 after:md:w-40 after:z-10 after:bg-[linear-gradient(90deg,_#fff0_0,_theme("colors.background")_90%,_theme("colors.background"))] data-[navigation-right=inactive]:after:hidden',
        className,
      )}
      {...props}
    >
      <Box
        data-state={navigationLeft}
        className="cursor-pointer grid place-items-center absolute z-20 left-0 top-0 bottom-0 data-[state=inactive]:hidden"
        onClick={handleOnClickLeft}
      >
        <ChevronLeft width={20} height={20} className="text-muted-foreground max-md:hidden" />
      </Box>
      <ScrollAreaViewport ref={scrollViewportRef} onScroll={handleOnScroll}>
        {children}
      </ScrollAreaViewport>
      <Box
        data-state={navigationRight}
        className="cursor-pointer text-foreground grid place-items-center absolute z-20 right-0 top-0 bottom-0 data-[state=inactive]:hidden"
        onClick={handleOnClickRight}
      >
        <ChevronRight width={20} height={20} className="text-muted-foreground max-md:hidden" />
      </Box>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
};
