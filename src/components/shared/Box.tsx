import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, asChild, ...props }, ref) => {
    const Div = asChild ? Slot : 'div';

    return (
      <Div ref={ref} {...props}>
        {children}
      </Div>
    );
  },
);

Box.displayName = 'Box';
