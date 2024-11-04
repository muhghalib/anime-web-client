import { cn } from '@app/lib/cn';
import { icons } from 'lucide-react';
import { forwardRef } from 'react';

import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: {
    variant: keyof typeof icons;
    className?: string;
    size?: number;
    onClick?: () => void;
  };
  rightIcon?: {
    variant: keyof typeof icons;
    className?: string;
    size?: number;
    onClick?: () => void;
  };
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div
        id="__input_wrapper"
        className={cn(
          'inline-flex group overflow-hidden space-x-2.5 items-center relative rounded-md w-full isolate text-foreground border-2 border-muted has-[:focus]:border-secondary text-sm',
          className,
        )}
      >
        {leftIcon &&
          (() => {
            const LeftIcon = icons[leftIcon.variant];

            return (
              <div
                className={cn(
                  'flex-none flex items-center justify-center ml-2.5',
                  {
                    'cursor-pointer': Boolean(leftIcon?.onClick),
                  },
                  leftIcon.className,
                )}
                onClick={leftIcon?.onClick}
              >
                <LeftIcon
                  style={{
                    //@ts-ignore
                    '--icon-size': `${leftIcon.size || 16}px`,
                  }}
                  className="text-[inherit] size-[--icon-size]"
                />
              </div>
            );
          })()}
        <input
          ref={ref}
          className="focus-visible:outline-none bg-transparent py-2.5 text-inherit flex-1"
          {...props}
        />
        {rightIcon &&
          (() => {
            const RightIcon = icons[rightIcon.variant];

            return (
              <div
                className={cn(
                  'flex-none flex items-center justify-center mr-2.5',
                  {
                    'cursor-pointer': Boolean(rightIcon?.onClick),
                  },
                  rightIcon.className,
                )}
                onClick={rightIcon?.onClick}
              >
                <RightIcon
                  style={{
                    //@ts-ignore
                    '--icon-size': `${rightIcon.size || 16}px`,
                  }}
                  className="text-[inherit] size-[--icon-size]"
                />
              </div>
            );
          })()}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, type InputProps };
