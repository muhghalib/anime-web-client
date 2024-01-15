import { Box } from './Box';
import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';
import { cn } from '@app/lib/cn';

export const AppLogo = ({ className }: { className?: string }) => {
  const { theme } = useTheme();

  return (
    <Box className={cn('relative aspect-video w-28', className)} asChild>
      <Link href="/">
        <Image
          src={theme == 'light' ? '/svg/logo-dark.svg' : '/svg/logo-light.svg'}
          alt="Ghanime | logo"
          fill
        />
      </Link>
    </Box>
  );
};
