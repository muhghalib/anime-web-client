'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@app/components/shared/Button';
import { Box } from '../shared/Box';

const THEME_OPTIONS = [
  {
    value: 'light',
    icon: <SunIcon className="h-[1rem] w-[1.2rem]" />,
  },
  {
    value: 'dark',
    icon: <MoonIcon className="h-[1rem] w-[1.2rem]" />,
  },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Box className="flex items-center space-x-1">
      {THEME_OPTIONS.map(({ icon, value }, idx) => (
        <Button
          key={idx}
          variant={theme == value ? 'secondary' : 'outline'}
          onClick={() => setTheme(value)}
          size="icon"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none p-2 h-fit w-fit"
        >
          {icon}
        </Button>
      ))}
    </Box>
  );
}
