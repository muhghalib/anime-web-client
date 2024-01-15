import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@app/lib/cn';

import { Inter } from 'next/font/google';
import { Slot } from '@radix-ui/react-slot';

const inter = Inter({ subsets: ['latin'] });

export const typographyVariants = cva(inter.className, {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    color: {
      black: 'text-foreground',
      white: 'text-white',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
    align: {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'black',
    weight: 'medium',
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  truncate?: false;
  asChild?: boolean;
}

export const Typography = React.forwardRef<HTMLSpanElement, TypographyProps>(
  (
    {
      color,
      size,
      weight,
      align,
      className,
      children,
      truncate = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Span = asChild ? Slot : 'span';

    return (
      <Span
        ref={ref}
        className={cn(typographyVariants({ color, size, weight, align }), { truncate }, className)}
        {...props}
      >
        {children}
      </Span>
    );
  },
);

Typography.displayName = 'Typography';
