import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Typography } from '@app/components/shared/Typography';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box className="relative w-full h-screen grid place-items-center overflow-clip">
      <Box className="absolute aspect-video w-[48rem] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Image src="/svg/shopaholics-dots-and-stars.svg" alt="shopaholics-dots-and-stars" fill />
      </Box>
      <Box className="flex flex-col items-center py-9 h-full w-full max-w-lg">
        <Box className="flex flex-col items-center space-y-1.5">
          <Typography weight="semibold" size="4xl">
            Oops!
          </Typography>
          <Typography className="italic" color="muted" weight="light" size="sm">
            It seems like you are lost
          </Typography>
        </Box>
        <Box className="relative w-full my-auto aspect-video">
          <Image src="/svg/peeps.svg" alt="peeps" fill />
        </Box>
        <Box>
          <Button asChild variant="ghost">
            <Link href="/">
              Go back to home <ArrowRight width={18} height={18} className="ml-1" />
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
