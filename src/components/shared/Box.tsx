import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  as?: 'div' | 'header' | 'main' | 'nav' | 'footer' | 'aside' | 'span';
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, asChild, as = 'div', ...props }, ref) => {
    const Div = asChild ? Slot : as;

    return (
      <Div ref={ref} {...props}>
        {children}
      </Div>
    );
  },
);

Box.displayName = 'Box';
